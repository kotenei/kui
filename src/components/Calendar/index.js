import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import YearView from "./YearView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import WeekView from "./WeekView";
import { dates } from "../../utils/dateUtils";
import { addYears, addMonths, addDays } from "date-fns";

const prefixCls = "k-calendar";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tmpDate: new Date(),
            tmpView: props.view
        };
    }
    static propTypes = {
        view: PropTypes.oneOf([0, 1, 2, 3]),
        lang: PropTypes.string
    };
    static defaultProps = {
        view: 1,
        lang: "zh-cn"
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
    render() {
        const { lang } = this.props;
        const { tmpView, tmpDate } = this.state;
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
                        <MonthView prefixCls={prefixCls} date={tmpDate} />
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
