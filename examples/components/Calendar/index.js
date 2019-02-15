import React, { Component } from "react";
import Basic from "./Basic";

class CalendarView extends Component {
    render() {
        return (
            <div>
                <h1>Calendar 日历</h1>
                <div className="k-example">
                    <Basic />
                </div>
                <h1>API</h1>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
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
                            <td>defaultView</td>
                            <td>默认视图，0：年视图，1：月视图</td>
                            <td>number</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>data</td>
                            <td>
                                事件数据，格式：
                                {`[{ id: 1, title: "event1", start: "2018-07-17", end: "2018-08-17" },...]`}
                            </td>
                            <td>array</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>view</td>
                            <td>视图，0：年视图，1：月视图</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onChangeView</td>
                            <td>视图切换时回调函数</td>
                            <td>Function(view:number)</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onEventClick</td>
                            <td>事件点击时回调函数</td>
                            <td>Function(event:object)</td>
                            <td>无</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CalendarView;
