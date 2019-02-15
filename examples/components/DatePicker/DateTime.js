import React, { Component } from "react";
import { DatePicker } from "main";

const { RangePicker} = DatePicker;

export default class DateTime extends Component {
    handleChange = date => {
        console.log(date);
    };
    render() {
        return (
            <React.Fragment>
                <DatePicker
                    onChange={this.handleChange}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="请选择日期"
                />
                <br />
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </React.Fragment>
        );
    }
}
