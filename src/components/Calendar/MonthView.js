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
import { guid } from "../../utils";
import { dates, getFirstDay, getDiffDay } from "../../utils/dateUtils";
import { tmpdir } from "os";

class Cell extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        value: PropTypes.any,
        date: PropTypes.object,
        data: PropTypes.object
    };
    static defaultProps = {};
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

const Progress = props => {
    const { style, data, progressStyle } = props;
    return (
        <div key={event} className="event-container" style={style}>
            <div className="event-progress" style={progressStyle}>
                {data.title}
            </div>
        </div>
    );
};

class MonthView extends Component {
    constructor(props) {
        super(props);
        this.nextEvents = [];
        this.state = {
            mapData: null
        };
    }
    static propTypes = {
        date: PropTypes.object,
        data: PropTypes.array,
        lang: PropTypes.string,
        prefixCls: PropTypes.string
    };
    static defaultProps = {
        date: new Date(),
        lang: "zh-cn",
        prefixCls: "k-calendar"
    };
    componentWillMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }
    init(props) {
        const { data, date } = props || this.props;
        let firstDate = getFirstDay(date),
            dayOfWeek = firstDate.getDay(),
            startDate,
            endDate;

        if (dayOfWeek == 0) {
            startDate = addDays(firstDate, -7);
        } else {
            startDate = addDays(firstDate, -dayOfWeek);
        }
        endDate = addDays(startDate, 41);
        if (data && data.length > 0) {
            let tmpData = [...data];
            let mapData = {},
                key,
                days;
            tmpData.sort((a, b) => {
                let diff =
                    a.start.replace(/-/g, "") - b.start.replace(/-/g, "");
                if (diff == 0) {
                    return b.end.replace(/-/g, "") - a.end.replace(/-/g, "");
                }
                return diff;
            });

            tmpData.forEach(item => {
                item.startDate = new Date(item.start + " 00:00:00");
                item.endDate = new Date(item.end + " 00:00:00");
                days = getDiffDay(item.startDate, item.endDate);
                item.dates = [item.startDate];
                if (days > 0) {
                    for (let i = 1; i <= days; i++) {
                        item.dates.push(addDays(item.startDate, i));
                    }
                }

                if (
                    item.startDate.getTime() < startDate.getTime() &&
                    item.endDate.getTime() >= startDate.getTime()
                ) {
                    item.startDate = startDate;
                    if (item.endDate.getTime() > endDate.getTime()) {
                        item.endDate = endDate;
                    }
                }
                key = formatter(item.startDate, "YYYYMMDD");
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
        this.nextEvents = [];
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
            hidden
        } = params;
        if (events) {
            let formatStr = "YYYYMMDD",
                style;
            events.forEach((event, index) => {
                style = {
                    width: this.getWidth(event.startDate, event.endDate),
                    top: index * 20
                };
                if (rows.length == 0) {
                    rows.push(event.dates);
                } else {
                    let rIndex = -1;
                    for (let i = 0; i < rows.length; i++) {
                        let row = rows[i];
                        rIndex = row.findIndex(item => {
                            return (
                                formatter(event.startDate, formatStr) ==
                                formatter(item, formatStr)
                            );
                        });
                        if (rIndex == -1) {
                            row.push(...event.dates);
                            style.top = i * 20;
                            break;
                        }
                    }
                    if (rIndex >= 0) {
                        rows.push(event.dates);
                        style.top = (rows.length - 1) * 20;
                    }
                }

                if (
                    formatter(event.endDate, formatStr) >
                    formatter(endDate, formatStr)
                ) {
                    let newEvent = {
                        ...event,
                        endDate
                    };
                    style.width = this.getWidth(
                        newEvent.startDate,
                        newEvent.endDate
                    );
                    progressItems.push(
                        <Progress
                            key={guid()}
                            style={style}
                            progressStyle={event.style}
                            data={newEvent}
                        />
                    );
                    nextEvents.push({
                        ...event,
                        startDate: addDays(endDate, 1)
                    });
                } else {
                    progressItems.push(
                        <Progress
                            key={guid()}
                            style={style}
                            progressStyle={event.style}
                            data={event}
                        />
                    );
                }
            });
        }
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
        const { date, data } = this.props;
        const { startDate, mapData } = this.state;
        let tmpDate = startDate,
            tmpStart = startDate,
            cells = [],
            rows = [],
            arrDate = [],
            key;

        let eventRows = [];

        for (let i = 1, className; i <= 42; i++) {
            key = formatter(tmpDate, "YYYYMMDD");

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

            let events = mapData[key];
            if (events) {
                events.forEach((event, index) => {
                    let style = {
                        width: this.getWidth(event.startDate, event.endDate),
                        top: index * 20
                    };
                    //event.style=style;
                    if (eventRows.length == 0) {
                        eventRows.push([event]);
                    } else {
                        let rIndex = -1;
                        for (let i = 0; i < eventRows.length; i++) {
                            let row = eventRows[i];
                            rIndex = row.findIndex(item => {
                                let eventStartDate = formatter(
                                        event.startDate,
                                        "YYYYMMDD"
                                    ),
                                    itemStartDate = formatter(
                                        item.startDate,
                                        "YYYYMMDD"
                                    ),
                                    itemEndDate = formatter(
                                        item.endDate,
                                        "YYYYMMDD"
                                    );
                                console.log(
                                    eventStartDate,
                                    itemStartDate,
                                    itemEndDate,
                                    eventStartDate >= itemStartDate &&
                                    eventStartDate <= itemEndDate
                                );
                                return (
                                    eventStartDate >= itemStartDate &&
                                    eventStartDate <= itemEndDate
                                );
                            });
                            console.log(rIndex)
                            if (rIndex == -1) {
                                console.log(i);
                                //style.top = i * 20;
                                //event.style=style;
                                row.push(event);
                                break;
                            }
                        }
                        if (rIndex >= 0) {
                            //style.top = (eventRows.length - 1) * 20;
                            //event.style=style;
                            eventRows.push([event]);
                        }
                    }
                });
            }

            console.log(eventRows);

            // let aa = {
            //     1: [
            //         { start: "1", end: "2", top: 0 },
            //         { start: "1", end: "2", top: 20 },
            //         { start: "1", end: "2", top: 40 }
            //     ],
            //     2: [{ start: "2", end: "4" ,top:60}]
            // };

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
        const { mapData } = this.state;
        let formatStr = "YYYYMMDD",
            startDate = arrDate[0],
            endDate = arrDate[arrDate.length - 1],
            gridCells = [],
            progressItems = [],
            nextEvents = [],
            rows = [],
            hidden = [],
            flag = false,
            events,
            key,
            style;

        arrDate.forEach(date => {
            progressItems = [];
            if (this.nextEvents && this.nextEvents.length > 0 && !flag) {
                this.setProgress({
                    endDate,
                    progressItems,
                    rows,
                    events: this.nextEvents,
                    nextEvents,
                    hidden
                });
                flag = true;
            }
            events = mapData[formatter(date, formatStr)];
            this.setProgress({
                endDate,
                progressItems,
                rows,
                events,
                nextEvents,
                hidden
            });
            gridCells.push(
                <div key={guid()} className="grid-cell">
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
            <div className={prefixCls}>
                {this.renderHeader(prefixCls)}
                {this.renderBody(prefixCls)}
            </div>
        );
    }
}

export default MonthView;
