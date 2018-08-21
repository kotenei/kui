import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import YearView from "./YearView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import WeekView from "./WeekView";
import { dates, getDiffDay } from "../../utils/dateUtils";
import { addYears, addMonths, addDays, format as formatter } from "date-fns";
import { tmpdir } from "os";

const prefixCls = "k-calendar";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tmpDate: new Date(),
            tmpView: props.view,
            tmpData: {}
        };
    }
    static propTypes = {
        view: PropTypes.oneOf([0, 1, 2, 3]),
        lang: PropTypes.string,
        data: PropTypes.array
    };
    static defaultProps = {
        view: 1,
        lang: "zh-cn",
        data: [
            { id: 1, title: "event1", start: "2018-07-17", end: "2018-08-17" },
            { id: 2, title: "event2", start: "2018-08-15", end: "2018-08-16" },
            { id: 3, title: "event3", start: "2018-08-15", end: "2018-08-18" },
            { id: 4, title: "event4", start: "2018-08-16", end: "2018-08-19" }
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
    init(data) {
        // data = data || this.props.data;
        // if (!data || data.length == 0) {
        //     return;
        // }
        // let tmpData = {},
        //     formatStr = "YYYYMMDD";
        // data.forEach(item => {
        //     let key, days;
        //     item.startDate = new Date(item.start);
        //     item.endDate = new Date(item.end);
        //     days = getDiffDay(item.startDate, item.endDate);
        //     item.width = ((days + 1) / 7) * 100;
        //     item.dates = [item.startDate];
        //     if (days > 0) {
        //         for (let i = 1; i <= days; i++) {
        //             item.dates.push(addDays(item.startDate, i));
        //         }
        //     }
        //     key = formatter(item.startDate, formatStr);
        //     if (!tmpData[key]) {
        //         tmpData[key] = [item];
        //     } else {
        //         let items = tmpData[key];
        //         items.push(item);
        //         items.sort((a, b) => {
        //             return b.dates.length - a.dates.length;
        //         });
        //     }
        // });
        // let rows = [];
        // for (const key in tmpData) {
        //     let events = tmpData[key];
        //     events.forEach(event => {
        //         let style = { width: event.width + "%", top: 0 };
        //         if (rows.length == 0) {
        //             event.style = style;
        //             rows.push(event.dates);
        //         } else {
        //             let rIndex = -1;
        //             for (let i = 0; i < rows.length; i++) {
        //                 let row = rows[i];
        //                 rIndex = row.findIndex(item => {
        //                     return (
        //                         formatter(event.startDate, formatStr) ==
        //                         formatter(item, formatStr)
        //                     );
        //                 });
        //                 if (rIndex == -1) {
        //                     row.push(...event.dates);
        //                     style.top = i * 20;
        //                     event.style = style;
        //                     break;
        //                 }
        //             }
        //             if (rIndex >= 0) {
        //                 rows.push(event.dates);
        //                 style.top = (rIndex + 1) * 20;
        //                 event.style = style;
        //             }
        //         }
        //     });
        // }
        // console.log(tmpData);
        //console.log(tmpData);
        // this.setState({
        //     tmpData
        // });
    }
    componentWillMount() {
        this.init();
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
                        <YearView prefixCls={prefixCls} date={tmpDate} />
                    ) : null}
                    {tmpView == 1 ? (
                        <MonthView
                            prefixCls={prefixCls}
                            date={tmpDate}
                            data={data}
                        />
                    ) : null}
                    {tmpView == 2 ? (
                        <DayView prefixCls={prefixCls} date={tmpDate} />
                    ) : null}
                    {tmpView == 3 ? (
                        <WeekView prefixCls={prefixCls} date={tmpDate} />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Calendar;
