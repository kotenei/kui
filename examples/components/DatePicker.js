import React, { Component } from "react";
import { DatePicker } from "main";

const { RangePicker } = DatePicker;

class DatePickerView extends Component {
    render() {
        return (
            <div>
                <h1>DatePicker 日期选择</h1>
                <div className="k-example">
                    {/* <DatePicker
                        //minDate={new Date(2018, 7, 1)}
                        //maxDate={new Date(2018, 8, 1)}
                        //showTime
                        view={2}
                        format="YYYY-MM-DD"
                        value={new Date()}
                    /> */}
                    <RangePicker format="YYYY-MM-DD HH:mm:ss" showTime/>
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
