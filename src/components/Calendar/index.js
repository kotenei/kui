import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import YearView from "./YearView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import WeekView from "./WeekView";
import { addYears, addMonths, addDays, format as formatter } from "date-fns";
import { dates, getFirstDay, getDiffDay } from "../../utils/dateUtils";

const prefixCls = "k-calendar";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tmpDate: new Date(),
            tmpView: props.view,
            tmpData: null
        };
    }
    static propTypes = {
        view: PropTypes.oneOf([0, 1, 2, 3]),
        lang: PropTypes.string,
        data: PropTypes.array
    };
    static defaultProps = {
        view: 0,
        lang: "zh-cn",
        data: [
            { id: 1, title: "event1", start: "2018-07-17", end: "2018-08-17" },
            { id: 2, title: "event2", start: "2018-08-15", end: "2018-08-16" },
            { id: 3, title: "event3", start: "2018-08-15", end: "2018-08-18" },
            { id: 4, title: "event4", start: "2018-08-16", end: "2018-08-19" },
            { id: 5, title: "event5", start: "2018-08-17", end: "2018-08-17" },
            { id: 6, title: "event6", start: "2018-06-17", end: "2018-08-20" },
            { id: 7, title: "event7", start: "2018-08-18", end: "2018-08-19" },
            { id: 8, title: "event8", start: "2018-08-19", end: "2018-08-25" },
            { id: 9, title: "event9", start: "2018-08-20", end: "2018-08-22" }
            // { id: 3, title: "event3", start: "2018-08-17", end: "2018-08-18" },
            // { id: 4, title: "event4", start: "2018-08-17", end: "2018-08-18" },
            // { id: 5, title: "event5", start: "2018-08-18", end: "2018-08-18" }
        ]
    };
    handlePrevNextClick = type => {
        const { tmpView, tmpDate } = this.state;
        let newDate = tmpDate,
            num = type == "prev" ? -1 : 1;
        switch (tmpView) {
            case 0:
                newDate = addYears(tmpDate, num);
                break;
            case 1:
                newDate = addMonths(tmpDate, num);
                break;
            case 2:
                newDate = addDays(tmpDate, num);
                break;
        }
        this.setState({
            tmpDate: newDate
        });
    };
    handleTodayClick = () => {
        this.setState({
            tmpDate: new Date()
        });
    };
    handleViewClick = view => {
        this.setState({
            tmpView: view
        });
    };
    init(props) {
        const { data } = props || this.props;
        if (data && data.length > 0) {
            let formatStr = "YYYYMMDD",
                tmpData = [...data],
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
                item.datesNumber = [formatter(item.startDate, formatStr)];
                if (days > 0) {
                    for (let i = 1, d; i <= days; i++) {
                        d = addDays(item.startDate, i);
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
        const { lang, data } = this.props;
        const { tmpView, tmpDate, tmpData } = this.state;
        return (
            <div className={prefixCls}>
                <Header
                    prefixCls={prefixCls}
                    view={tmpView}
                    date={tmpDate}
                    onPrevNextClick={this.handlePrevNextClick}
                    onTodayClick={this.handleTodayClick}
                    onViewClick={this.handleViewClick}
                />
                <div className={`${prefixCls}-container`}>
                    {tmpView == 0 ? (
                        <YearView
                            prefixCls={prefixCls}
                            date={tmpDate}
                            data={tmpData}
                        />
                    ) : null}
                    {tmpView == 1 ? (
                        <MonthView
                            prefixCls={prefixCls}
                            date={tmpDate}
                            data={tmpData}
                        />
                    ) : null}
                    {/* {tmpView == 2 ? (
                        <DayView prefixCls={prefixCls} date={tmpDate} />
                    ) : null}
                    {tmpView == 3 ? (
                        <WeekView prefixCls={prefixCls} date={tmpDate} />
                    ) : null} */}
                </div>
            </div>
        );
    }
}

export default Calendar;
