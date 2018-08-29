import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import YearView from "./YearView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import WeekView from "./WeekView";
import { addYears, addMonths, addDays, format as formatter } from "date-fns";
import { dates, getFirstDay, getDiffDay } from "../../utils/dateUtils";
import { deepClone } from "../../utils";

const prefixCls = "k-calendar";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            tmpView: props.view || props.defaultView,
            tmpData: null
        };
    }
    static propTypes = {
        defaultView: PropTypes.oneOf([0, 1, 2, 3]),
        view: PropTypes.oneOf([0, 1, 2, 3]),
        lang: PropTypes.string,
        data: PropTypes.array,
        onChangeView: PropTypes.func,
        onEventClick: PropTypes.func
    };
    static defaultProps = {
        lang: "zh-cn",
        defaultView: 1
    };
    handlePrevNextClick = type => {
        const { tmpView, date } = this.state;
        let newDate = date,
            num = type == "prev" ? -1 : 1;
        switch (tmpView) {
            case 0:
                newDate = addYears(date, num);
                break;
            case 1:
                newDate = addMonths(date, num);
                break;
            case 2:
                newDate = addDays(date, num);
                break;
        }
        this.setState({
            date: newDate
        });
    };
    handleTodayClick = () => {
        this.setState({
            date: new Date()
        });
    };
    handleViewClick = view => {
        const { onChangeView } = this.props;
        if (onChangeView) {
            onChangeView(view);
        }
        if (!("view" in this.props)) {
            this.setState({
                tmpView: view
            });
        }
    };
    handleMonthClick = date => {
        this.setState({
            date
        });
        if (!("view" in this.props)) {
            this.setState({
                tmpView: 1
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
        const { data } = props || this.props;
        if (data && data.length > 0) {
            let formatStr = "YYYYMMDD",
                tmpData = deepClone(data),
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
                item.startDate = new Date(item.start);
                item.endDate = new Date(item.end);
                item.tmpStartDate = new Date(
                    item.startDate.getFullYear(),
                    item.startDate.getMonth(),
                    item.startDate.getDate(),
                    0,
                    0,
                    0
                );
                item.tmpEndDate = new Date(
                    item.endDate.getFullYear(),
                    item.endDate.getMonth(),
                    item.endDate.getDate(),
                    0,
                    0,
                    0
                );
                days = getDiffDay(item.tmpStartDate, item.endDate);
                item.dates = [item.tmpStartDate];
                item.datesNumber = [formatter(item.tmpStartDate, formatStr)];
                if (days > 0) {
                    for (let i = 1, d; i <= days; i++) {
                        d = addDays(item.tmpStartDate, i);
                        item.dates.push(d);
                        item.datesNumber.push(formatter(d, formatStr));
                    }
                }
            });
            this.setState({
                tmpData
            });
        }
    }
    componentWillMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }
    render() {
        const { lang } = this.props;
        const { tmpView, date, tmpData } = this.state;
        return (
            <div className={prefixCls}>
                <Header
                    prefixCls={prefixCls}
                    view={tmpView}
                    date={date}
                    onPrevNextClick={this.handlePrevNextClick}
                    onTodayClick={this.handleTodayClick}
                    onViewClick={this.handleViewClick}
                />
                <div className={`${prefixCls}-container`}>
                    {tmpView == 0 ? (
                        <YearView
                            prefixCls={prefixCls}
                            date={date}
                            data={tmpData}
                            onClick={this.handleMonthClick}
                        />
                    ) : null}
                    {tmpView == 1 ? (
                        <MonthView
                            prefixCls={prefixCls}
                            date={date}
                            data={tmpData}
                            onEventClick={this.handleEventClick}
                        />
                    ) : null}
                    {/* {tmpView == 2 ? (
                        <DayView prefixCls={prefixCls} date={date} />
                    ) : null}
                    {tmpView == 3 ? (
                        <WeekView prefixCls={prefixCls} date={date} />
                    ) : null} */}
                </div>
            </div>
        );
    }
}

export default Calendar;
