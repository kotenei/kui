import React, { Component } from "react";
import PropTypes from "prop-types";
import YearView from "./YearView";
import MonthView from "./MonthView";
import DayView from "./DayView";

const prefixCls = "k-datepicker";

class DatePicker extends Component {
    static propTypes = {
        type: PropTypes.arrayOf(["year", "month", "week", "date", "dateTime"]),
        disabled: PropTypes.bool,
        defaultValue: PropTypes.object,
        value: PropTypes.object
    };
    static defaultProps = {};
    render() {
        return <div className={prefixCls} />;
    }
}

export default DatePicker;
