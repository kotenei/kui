import React, { Component } from "react";
import { DatePicker } from "main";

const { RangePicker, YearPicker, MonthPicker, WeekPicker } = DatePicker;

class DatePickerView extends Component {
    state = {
        rangeDates: []
    };
    handleChange = date => {
        console.log(date);
    };
    render() {
        return (
            <div>
                <h1>DatePicker 日期选择</h1>
                <h3>基本使用</h3>
                <div className="k-example">
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
                    <WeekPicker
                        kSize="lg"
                        onChange={this.handleChange}
                        placeholder="选择周"
                    />
                    <br />
                    <RangePicker kSize="lg" />
                </div>
                <h3>尺寸</h3>
                <div className="k-example">
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
                </div>
                <h3>时间选择</h3>
                <div className="k-example">
                    <DatePicker
                        onChange={this.handleChange}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择日期"
                    />
                </div>
                <h1>API</h1>
                <table className="k-table k-table-hover k-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td />
                            <td />
                            <td />
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DatePickerView;
