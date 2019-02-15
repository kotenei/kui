import React, { Component } from "react";
import { DatePicker } from "main";

const { RangePicker, YearPicker, MonthPicker, WeekPicker } = DatePicker;

export default class Basic extends Component {
    handleChange = date => {
        console.log(date);
    };
    render() {
        return (
            <React.Fragment>
                <DatePicker
                    onChange={this.handleChange}
                    placeholder="请选择日期"
                />
                <br />
                <YearPicker
                    onChange={this.handleChange}
                    placeholder="选择年份"
                />
                <br />
                <MonthPicker
                    onChange={this.handleChange}
                    placeholder="选择月份"
                />
                <br />
                <WeekPicker onChange={this.handleChange} placeholder="选择周" />
                <br />
                <RangePicker />
            </React.Fragment>
        );
    }
}
