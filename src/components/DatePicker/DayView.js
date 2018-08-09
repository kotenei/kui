import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
    getDaysInMonth,
    lastDayOfMonth,
    addMonths,
    addDays,
    format,
    addYears
} from "date-fns";
import { dates, getWeek } from "../../utils/dateUtils";

class Cell extends Component {
    static propTypes = {
        value: PropTypes.any,
        date: PropTypes.object,
        minDate: PropTypes.object,
        maxDate: PropTypes.object,
        selected: PropTypes.object,
        rangeDates: PropTypes.array,
        week: PropTypes.bool,
        onClick: PropTypes.func
    };
    handleClick = () => {
        const { date, onClick } = this.props;
        if (onClick) {
            onClick(date);
        }
    };
    render() {
        const {
            className,
            value,
            date,
            selected,
            week,
            rangeDates
        } = this.props;
        let formatStr = "YYYYMMDD",
            curDate = new Date(),
            isCur = format(curDate, formatStr) == format(date, formatStr),
            strClassName = classnames(className, {
                curDay: isCur
            }),
            isActive;

        if (rangeDates) {
            if (rangeDates.length > 0) {
                rangeDates.forEach(rangeDate => {
                    if (
                        format(date, formatStr) === format(rangeDate, formatStr)
                    ) {
                        isActive = true;
                    }
                });
            }
        } else {
            isActive =
                selected &&
                format(date, formatStr) == format(selected, formatStr);
        }

        strClassName = classnames(strClassName, {
            active: isActive
        });

        return (
            <td>
                {week ? (
                    <span className={strClassName}>{value}</span>
                ) : (
                    <a className={strClassName} onClick={this.handleClick}>
                        {value}
                    </a>
                )}
            </td>
        );
    }
}

class Row extends Component {
    static propTypes = {
        week: PropTypes.bool,
        date: PropTypes.array,
        onClick: PropTypes.func
    };
    handleClick = () => {
        const { onClick, startDate, endDate, date } = this.props;
        if (onClick) {
            onClick(date);
        }
    };
    render() {
        const { className, children, week } = this.props;
        return (
            <tr
                className={classnames(className, {
                    "week-row": week
                })}
                onClick={this.handleClick}
            >
                {children}
            </tr>
        );
    }
}

class DayView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysName: dates[props.lang].daysMin
        };
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        date: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        selected: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        lang: PropTypes.string,
        minDate: PropTypes.object,
        maxDate: PropTypes.object,
        rangeDates: PropTypes.array,
        week: PropTypes.bool,
        onDaySelect: PropTypes.func,
        onWeekSelect: PropTypes.func
    };
    static defaultProps = {
        date: new Date(),
        lang: "zh-cn",
        week: false
    };
    handleClick = date => {
        const { onDaySelect, week } = this.props;
        if (week) return;
        let strDate =
            format(date, "YYYY-MM-DD") + " " + format(new Date(), "HH:mm:ss");
        date = new Date(strDate);
        if (onDaySelect) {
            onDaySelect(date);
        }
    };
    getDisabled(date) {
        const { minDate, maxDate } = this.props;
        let min = minDate ? format(minDate, "YYYYMMDD") : null,
            max = maxDate ? format(maxDate, "YYYYMMDD") : null,
            cur = format(date, "YYYYMMDD");
        return (min && cur < min) || (max && cur > max);
    }
    renderHead() {
        const { daysName } = this.state;
        const { week } = this.props;
        let items = [];
        if (week) {
            items.push(<td key="week" />);
        }
        daysName.forEach(item => {
            items.push(<td key={item}>{item}</td>);
        });
        return items;
    }
    renderBody() {
        const { date, week, selected, onWeekSelect, rangeDates } = this.props;
        let curDate = new Date(),
            days = getDaysInMonth(date), //当月所有天数
            firstDate = new Date(date.getFullYear(), date.getMonth(), 1),
            dayOfWeek = firstDate.getDay(), //当月第一天是星期几
            lastDayOfPrevMonth = lastDayOfMonth(addMonths(date, -1)).getDate(), //上月最后一天
            rows = [],
            cells = [],
            tmpDate = [],
            index = 0,
            disabled,
            start,
            end,
            startDate;

        if (dayOfWeek == 0) {
            start = lastDayOfPrevMonth - 6;
            startDate = addDays(firstDate, -7);
        } else {
            start = lastDayOfPrevMonth - dayOfWeek + 1;
            startDate = addDays(firstDate, -dayOfWeek);
        }
        for (let i = start; i <= lastDayOfPrevMonth; i++) {
            disabled = this.getDisabled(startDate);
            cells.push(
                <Cell
                    className={classnames("prev", {
                        disabled
                    })}
                    key={index}
                    value={i}
                    date={startDate}
                    selected={selected}
                    // rangeDates={rangeDates}
                    week={week}
                    onClick={!disabled ? this.handleClick : null}
                />
            );
            tmpDate.push(startDate);
            startDate = addDays(startDate, 1);
            index++;
        }
        for (let i = 1; i <= days; i++) {
            disabled = this.getDisabled(startDate);
            cells.push(
                <Cell
                    className={classnames({
                        disabled
                    })}
                    key={index}
                    value={i}
                    date={startDate}
                    rangeDates={rangeDates}
                    selected={selected}
                    week={week}
                    onClick={!disabled ? this.handleClick : null}
                />
            );
            tmpDate.push(startDate);
            startDate = addDays(startDate, 1);
            index++;
        }
        end = 42 - cells.length;
        for (let i = 1; i <= end; i++) {
            disabled = this.getDisabled(startDate);
            cells.push(
                <Cell
                    className={classnames("next", {
                        disabled
                    })}
                    key={index}
                    value={i}
                    date={startDate}
                    selected={selected}
                    // rangeDates={rangeDates}
                    week={week}
                    onClick={!disabled ? this.handleClick : null}
                />
            );
            tmpDate.push(startDate);
            startDate = addDays(startDate, 1);
            index++;
        }
        for (let i = 0; i < 6; i++) {
            let weekDate = tmpDate.splice(0, 7);
            rows.push(
                <Row
                    key={i}
                    className={classnames({
                        active:
                            selected &&
                            selected >= weekDate[0] &&
                            selected <= weekDate[6]
                    })}
                    week={week}
                    date={weekDate}
                    onClick={week ? onWeekSelect : null}
                >
                    {week ? (
                        <Cell
                            className="week"
                            week={week}
                            value={getWeek(weekDate[0])}
                        />
                    ) : null}
                    {cells.splice(0, 7)}
                </Row>
            );
        }

        return rows;
    }
    render() {
        const { prefixCls } = this.props;
        return (
            <table className={`${prefixCls}-day-table`}>
                <thead>
                    <tr>{this.renderHead()}</tr>
                </thead>
                <tbody>{this.renderBody()}</tbody>
            </table>
        );
    }
}

export default DayView;
