import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
    getDaysInMonth,
    addDays,
    lastDayOfMonth,
    addMonths,
    format as formatter
} from "date-fns";
import { dates, getFirstDay, getDiffDay } from "../../utils/dateUtils";
import { getPosition, guid, deepClone } from "../../utils";
import domUtils from "../../utils/domUtils";
import Popover from "./Popover";
import PopPanel from "../PopPanel";

class Cell extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        value: PropTypes.any,
        date: PropTypes.object,
        data: PropTypes.object
    };
    render() {
        const { prefixCls, value, className, date } = this.props;
        let formatStr = "YYYYMMDD",
            now = formatter(new Date(), formatStr),
            cur = formatter(date, formatStr),
            active = now == cur;
        return (
            <div
                className={classnames(className, {
                    [`${prefixCls}-row-cell`]: true
                })}
            >
                <span className={active ? "active" : null}>{value}</span>
            </div>
        );
    }
}

const Event = props => {
    const { style, data, progressStyle, prefixCls, onClick } = props;
    return (
        <div
            key={event}
            className={`${prefixCls}-event`}
            style={style}
            onClick={onClick}
        >
            <div
                className={`${prefixCls}-event-progress`}
                style={progressStyle}
            >
                {data.title}
            </div>
        </div>
    );
};

class MonthView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapData: null,
            maxTop: 0,
            position: { top: 0, left: 0 },
            active: null
        };
        this.eventHeight = 20;
        this.nextEvents = [];
    }
    static propTypes = {
        date: PropTypes.object,
        data: PropTypes.array,
        lang: PropTypes.string,
        prefixCls: PropTypes.string,
        onEventClick: PropTypes.func
    };
    static defaultProps = {
        date: new Date(),
        lang: "zh-cn",
        prefixCls: "k-calendar"
    };
    handleMoreClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const { target } = e;
        this.setState({
            active: target.getAttribute("data-key")
        });
    };
    handleClose = () => {
        if (this.state.active) {
            this.setState({
                active: null
            });
        }
    };
    handleEventClick = event => {
        const { onEventClick } = this.props;
        if (onEventClick) {
            onEventClick(event);
        }
    };
    init(props) {
        const { data, date } = props || this.props;
        let firstDate = getFirstDay(date),
            dayOfWeek = firstDate.getDay(),
            formatStr = "YYYYMMDD",
            startDate,
            endDate;
        this.nextEvents = [];
        if (dayOfWeek == 0) {
            startDate = addDays(firstDate, -7);
        } else {
            startDate = addDays(firstDate, -dayOfWeek);
        }
        endDate = addDays(startDate, 41);
        if (data && data.length > 0) {
            let tmpData = deepClone(data);
            let mapData = {},
                key;

            tmpData.forEach(item => {
                if (
                    item.tmpStartDate.getTime() < startDate.getTime() &&
                    item.tmpEndDate.getTime() >= startDate.getTime()
                ) {
                    item.tmpStartDate = startDate;
                    if (item.tmpEndDate.getTime() > endDate.getTime()) {
                        item.tmpEndDate = endDate;
                    }
                }
                key = formatter(item.tmpStartDate, formatStr);
                if (!mapData[key]) {
                    mapData[key] = [item];
                } else {
                    mapData[key].push(item);
                }
            });
            this.setState({
                mapData
            });
        }
        this.setState({
            startDate
        });
    }
    getWidth(startDate, endDate) {
        let days = getDiffDay(startDate, endDate);
        return ((days + 1) / 7) * 100 + "%";
    }
    setProgress(params) {
        const {
            endDate,
            progressItems,
            rows,
            events,
            nextEvents,
            tmpEvents,
            mapHidden
        } = params;
        const { prefixCls } = this.props;
        const { maxTop } = this.state;
        if (events) {
            let formatStr = "YYYYMMDD",
                height = this.eventHeight,
                key,
                style;
            events.forEach((event, index) => {
                key = `${event.id}-${index}`;
                style = {
                    width: this.getWidth(event.tmpStartDate, event.tmpEndDate),
                    top: index * height
                };
                if (rows.length == 0) {
                    rows.push([...event.dates]);
                } else {
                    let rIndex = -1;
                    for (let i = 0; i < rows.length; i++) {
                        let row = rows[i];
                        rIndex = row.findIndex(item => {
                            return (
                                event.tmpStartDate.getFullYear() +
                                    event.tmpStartDate.getMonth() +
                                    event.tmpStartDate.getDate() ==
                                item.getFullYear() +
                                    item.getMonth() +
                                    item.getDate()
                            );
                        });
                        if (rIndex == -1) {
                            row.push(...event.dates);
                            style.top = i * height;
                            break;
                        }
                    }
                    if (rIndex >= 0) {
                        rows.push([...event.dates]);
                        style.top = (rows.length - 1) * height;
                    }
                }

                if (
                    formatter(event.tmpEndDate, formatStr) >
                    formatter(endDate, formatStr)
                ) {
                    let newEvent = {
                        ...event,
                        tmpEndDate: endDate
                    };
                    nextEvents.push({
                        ...event,
                        tmpStartDate: addDays(endDate, 1)
                    });
                    style.width = this.getWidth(
                        newEvent.tmpStartDate,
                        newEvent.tmpEndDate
                    );
                    if (style.top >= maxTop) {
                        newEvent.position = style;
                        this.setHidden(newEvent, tmpEvents, mapHidden);
                        tmpEvents.push(newEvent);
                    } else {
                        progressItems.push(
                            <Event
                                key={key}
                                prefixCls={prefixCls}
                                style={style}
                                progressStyle={event.style}
                                data={newEvent}
                                onClick={this.handleEventClick.bind(
                                    this,
                                    event
                                )}
                            />
                        );
                    }
                } else {
                    if (style.top >= maxTop) {
                        event.position = style;
                        this.setHidden(event, tmpEvents, mapHidden);
                        tmpEvents.push(event);
                    } else {
                        progressItems.push(
                            <Event
                                key={key}
                                prefixCls={prefixCls}
                                style={style}
                                progressStyle={event.style}
                                data={event}
                                onClick={this.handleEventClick.bind(
                                    this,
                                    event
                                )}
                            />
                        );
                    }
                }
            });
        }
    }
    setHidden(event, events, mapHidden) {
        const { maxTop } = this.state;
        if (event.position.top >= maxTop) {
            let formatStr = "YYYYMMDD",
                key;
            event.hidden = true;

            events.forEach(item => {
                if (
                    item.position.top >= maxTop - this.eventHeight &&
                    !item.hidden &&
                    event.tmpStartDate.getTime() >=
                        item.tmpStartDate.getTime() &&
                    event.tmpStartDate.getTime() <= item.tmpEndDate.getTime()
                ) {
                    item.hidden = true;
                    item.dates.forEach(date => {
                        key = formatter(date, formatStr);
                        if (!mapHidden[key]) {
                            mapHidden[key] = [item];
                        } else {
                            mapHidden[key].push(item);
                        }
                    });
                }
            });
            event.dates.forEach(date => {
                key = formatter(date, formatStr);
                if (!mapHidden[key]) {
                    mapHidden[key] = [event];
                } else {
                    mapHidden[key].push(event);
                }
            });
        }
    }
    setPosition = () => {
        if (!this.refs.month) return;
        let elmCell = this.refs.month.querySelector(".grid-cell"),
            height = domUtils.height(elmCell),
            count = Math.floor(height / this.eventHeight + 0.25),
            maxTop = (count - 1) * this.eventHeight;

        this.setState({
            maxTop
        });
    };
    componentDidMount() {
        this.init();
        this.setPosition();
        window.addEventListener("resize", this.setPosition);
        document.addEventListener("click", this.handleClose);
    }
    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.setPosition);
        document.removeEventListener("click", this.handleClose);
    }
    renderHeader(prefixCls) {
        const { lang } = this.props;
        return (
            <div
                className={classnames({
                    [`${prefixCls}-header`]: true
                })}
            >
                <div
                    className={`${prefixCls}-row`}
                    style={{ borderBottom: 0, borderTop: 0 }}
                >
                    {dates[lang].daysShort.map(item => {
                        return (
                            <div
                                key={item}
                                className={classnames({
                                    [`${prefixCls}-row-cell`]: true,
                                    "head-cell": true
                                })}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    renderBody(prefixCls) {
        const { date } = this.props;
        const { startDate, mapData, tmpData } = this.state;
        let tmpDate = startDate,
            cells = [],
            rows = [],
            arrDate = [];
        this.nextEvents = [];
        for (let i = 1, className; i <= 42; i++) {
            className = classnames({
                "body-cell": true,
                gray: !(
                    tmpDate.getFullYear() == date.getFullYear() &&
                    tmpDate.getMonth() == date.getMonth()
                )
            });
            cells.push(
                <Cell
                    key={`cell_${i}`}
                    className={className}
                    value={tmpDate.getDate()}
                    date={tmpDate}
                    prefixCls={prefixCls}
                />
            );

            arrDate.push(tmpDate);
            tmpDate = addDays(startDate, i);
        }
        for (let i = 0; i < 6; i++) {
            rows.push(
                <div key={`row-${i}`} className={`${prefixCls}-row`}>
                    <div className={`${prefixCls}-row-cell-container`}>
                        {cells.splice(0, 7)}
                    </div>
                    <div className={`${prefixCls}-row-event-container`}>
                        {this.renderGridCells(arrDate.splice(0, 7), i)}
                    </div>
                </div>
            );
        }
        return <div className={`${prefixCls}-body`}>{rows}</div>;
    }
    renderGridCells(arrDate, index) {
        const { mapData, active } = this.state;
        const { prefixCls } = this.props;
        let formatStr = "YYYYMMDD",
            startDate = arrDate[0],
            endDate = arrDate[arrDate.length - 1],
            gridCells = [],
            progressItems = [],
            nextEvents = [],
            rows = [],
            tmpEvents = [],
            flag = false,
            mapHidden = {},
            events,
            key,
            style;

        arrDate.forEach(date => {
            key = formatter(date, formatStr);
            progressItems = [];
            if (mapData) {
                if (this.nextEvents && this.nextEvents.length > 0 && !flag) {
                    this.setProgress({
                        endDate,
                        progressItems,
                        rows,
                        events: this.nextEvents,
                        nextEvents,
                        tmpEvents,
                        mapHidden
                    });
                    flag = true;
                }
                events = mapData[key];
                this.setProgress({
                    endDate,
                    progressItems,
                    rows,
                    events,
                    nextEvents,
                    tmpEvents,
                    mapHidden
                });
            }
            if (mapHidden[key]) {
                let popTitle = formatter(date, "YYYY-MM-DD");
                progressItems.push(
                    <PopPanel
                        transitionName="scale"
                        open={active == key}
                        input={
                            <div
                                data-key={key}
                                className="grid-cell-more"
                                onClick={this.handleMoreClick}
                            >
                                还有
                                {mapHidden[key].length}项
                            </div>
                        }
                        key={`popPanel_${key}`}
                    >
                        <Popover
                            title={popTitle}
                            prefixCls={prefixCls}
                            onClose={this.handleClose}
                        >
                            {mapHidden[key].map((hidden, index) => {
                                return (
                                    <Event
                                        key={`hiddenEvent_${
                                            hidden.id
                                        }_${index}`}
                                        data={hidden}
                                        prefixCls={prefixCls}
                                        style={{
                                            padding: 0,
                                            position: "static",
                                            width: "100%"
                                        }}
                                        progressStyle={hidden.style}
                                        onClick={this.handleEventClick.bind(
                                            this,
                                            hidden
                                        )}
                                    />
                                );
                            })}
                        </Popover>
                    </PopPanel>
                );
            }

            gridCells.push(
                <div key={`gridCell_${key}`} className="grid-cell">
                    {progressItems}
                </div>
            );
        });

        this.nextEvents = nextEvents;
        return gridCells;
    }
    render() {
        const { date, lang } = this.props;
        let prefixCls = `${this.props.prefixCls}-month`;
        return (
            <div className={prefixCls} ref="month">
                {this.renderHeader(prefixCls)}
                {this.renderBody(prefixCls)}
            </div>
        );
    }
}

export default MonthView;
