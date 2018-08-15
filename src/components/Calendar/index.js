import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import YearView from "./YearView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import WeekView from "./WeekView";
import { dates } from "../../utils/dateUtils";

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
        view: 0,
        lang: "zh-cn"
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
                    onTodayClick={this.handleTodayClick}
                    onViewClick={this.handleViewClick}
                />
                <div className={`${prefixCls}-container`}>
                    {tmpView == 0 ? <YearView prefixCls={prefixCls} /> : null}
                    {tmpView == 1 ? <MonthView prefixCls={prefixCls} /> : null}
                    {tmpView == 2 ? <DayView prefixCls={prefixCls} /> : null}
                    {tmpView == 3 ? <WeekView prefixCls={prefixCls} /> : null}
                </div>
            </div>
        );
    }
}

export default Calendar;
