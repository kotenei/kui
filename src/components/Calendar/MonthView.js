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
import { dates, getFirstDay } from "../../utils/dateUtils";

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
    const { style, data } = props;
    return (
        <div key={event} className="event-container" style={style}>
            <div className="event-progress">{data.title}</div>
        </div>
    );
};

class MonthView extends Component {
    constructor(props) {
        super(props);
        this.rows = [];
    }
    static propTypes = {
        date: PropTypes.object,
        data: PropTypes.object,
        lang: PropTypes.string,
        prefixCls: PropTypes.string
    };
    static defaultProps = {
        date: new Date(),
        lang: "zh-cn",
        prefixCls: "k-calendar"
    };

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
        let days = getDaysInMonth(date),
            firstDate = getFirstDay(date),
            dayOfWeek = firstDate.getDay(), //当月第一天是星期几
            lastDayOfPrevMonth = lastDayOfMonth(addMonths(date, -1)).getDate(),
            rows = [],
            cells = [],
            tmpDate = [],
            index = 0,
            startDate,
            start,
            end;

        if (dayOfWeek == 0) {
            start = lastDayOfPrevMonth - 6;
            startDate = addDays(firstDate, -7);
        } else {
            start = lastDayOfPrevMonth - dayOfWeek + 1;
            startDate = addDays(firstDate, -dayOfWeek);
        }

        for (let i = start; i <= lastDayOfPrevMonth; i++) {
            cells.push(
                <Cell
                    key={index}
                    className="body-cell gray"
                    value={i}
                    date={startDate}
                    prefixCls={prefixCls}
                />
            );
            tmpDate.push(startDate);
            startDate = addDays(startDate, 1);
            index++;
        }
        for (let i = 1; i <= days; i++) {
            cells.push(
                <Cell
                    key={index}
                    className="body-cell"
                    value={i}
                    date={startDate}
                    prefixCls={prefixCls}
                />
            );
            tmpDate.push(startDate);
            startDate = addDays(startDate, 1);
            index++;
        }
        end = 42 - cells.length;
        for (let i = 1; i <= end; i++) {
            cells.push(
                <Cell
                    key={index}
                    className="body-cell gray"
                    value={i}
                    date={startDate}
                    prefixCls={prefixCls}
                />
            );
            tmpDate.push(startDate);
            startDate = addDays(startDate, 1);
            index++;
        }

        for (let i = 0; i < 6; i++) {
            rows.push(
                <div key={`row-${i}`} className={`${prefixCls}-row`}>
                    <div className={`${prefixCls}-row-cell-container`}>
                        {cells.splice(0, 7)}
                    </div>
                    <div className={`${prefixCls}-row-event-container`}>
                        {/* <div className="grid-cell">
                            <div className="event-percent" />
                        </div>
                        <div className="grid-cell">
                            <div className="event-percent" />
                        </div>
                        <div className="grid-cell" />
                        <div className="grid-cell" />
                        <div className="grid-cell" />
                        <div className="grid-cell" />
                        <div className="grid-cell" /> */}
                        {this.renderGridCells(tmpDate.splice(0, 7))}
                    </div>
                </div>
            );
        }
        return <div className={`${prefixCls}-body`}>{rows}</div>;
    }
    renderGridCells(arrDate) {
        const { data } = this.props;
        let formatStr = "YYYYMMDD",
            gridCells = [],
            key;

        arrDate.forEach(date => {
            key = formatter(date, "YYYYMMDD");
            let events = data && data[key];
            let percentItems = [],
                style;
            if (events) {
                events.forEach(event => {
                    if (this.rows.length == 0) {
                        style = { width: event.width + "%" };
                        this.rows.push(event.dates);
                        percentItems.push(
                            <Progress key={event} style={style} data={event} />
                        );
                    } else {
                        let rIndex = -1;
                        for (let i = 0; i < this.rows.length; i++) {
                            let row = this.rows[i];
                            rIndex = row.findIndex(item => {
                                return (
                                    formatter(event.startDate, formatStr) ==
                                    formatter(item, formatStr)
                                );
                            });
                            if (rIndex == -1) {
                                row.push(...event.dates);
                                style = {
                                    top: i * 20,
                                    width: event.width + "%"
                                };
                                percentItems.push(
                                    <Progress
                                        key={event}
                                        style={style}
                                        data={event}
                                    />
                                );
                                break;
                            }
                        }
                        if (rIndex >= 0) {
                            this.rows.push(event.dates);
                            style = {
                                top: (rIndex + 1) * 20,
                                width: event.width + "%"
                            };
                            percentItems.push(
                                <Progress
                                    key={event}
                                    style={style}
                                    data={event}
                                />
                            );
                        }
                    }
                });
            }
            gridCells.push(
                <div key={date} className="grid-cell">
                    {percentItems}
                </div>
            );
        });
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
