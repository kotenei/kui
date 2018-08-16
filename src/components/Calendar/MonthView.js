import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getDaysInMonth, addDays, lastDayOfMonth, addMonths } from "date-fns";
import { dates, getFirstDay } from "../../utils/dateUtils";

class Cell extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        value: PropTypes.any,
        date: PropTypes.object
    };
    static defaultProps = {};
    render() {
        const { prefixCls, value, className } = this.props;
        return (
            <div
                className={classnames(className, {
                    [`${prefixCls}-row-cell`]: true
                })}
            >
                {value}
            </div>
        );
    }
}

class MonthView extends Component {
    static propTypes = {
        date: PropTypes.object,
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
        const { date } = this.props;
        let days = getDaysInMonth(date),
            firstDate = getFirstDay(date),
            dayOfWeek = firstDate.getDay(), //当月第一天是星期几
            lastDayOfPrevMonth = lastDayOfMonth(addMonths(date, -1)).getDate(),
            rows = [],
            cells = [],
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
                    </div>
                </div>
            );
        }
        return <div className={`${prefixCls}-body`}>{rows}</div>;
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
