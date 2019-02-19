```jsx
import React, { Component } from "react";
import { DatePicker } from "kui-react";

const { RangePicker, YearPicker, MonthPicker, WeekPicker } = DatePicker;

export default class Example extends Component {
    handleChange = date => {
        console.log(date);
    };
    render() {
        return (
            <React.Fragment>
                <DatePicker
                    onChange={this.handleChange}
                    kSize="sm"
                    placeholder="请选择日期"
                />
                <br />
                <DatePicker
                    onChange={this.handleChange}
                    placeholder="请选择日期"
                />
                <br />
                <DatePicker
                    onChange={this.handleChange}
                    kSize="lg"
                    placeholder="请选择日期"
                />
            </React.Fragment>
        );
    }
}

```
