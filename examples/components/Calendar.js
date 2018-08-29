import React, { Component } from "react";
import { Calendar } from "main";

const data = [
    { id: 1, title: "event1", start: "2018-07-17", end: "2018-08-17" },
    { id: 2, title: "event2", start: "2018-08-15", end: "2018-08-16" },
    { id: 3, title: "event3", start: "2018-08-15", end: "2018-08-18" },
    { id: 4, title: "event4", start: "2018-08-16", end: "2018-08-19" },
    { id: 5, title: "event5", start: "2018-08-17", end: "2018-08-17" },
    { id: 6, title: "event6", start: "2018-06-17", end: "2018-08-20" },
    { id: 7, title: "event7", start: "2018-08-18", end: "2018-08-19" },
    { id: 8, title: "event8", start: "2018-08-19", end: "2018-08-25" },
    { id: 9, title: "event9", start: "2018-08-20", end: "2018-08-22" }
];

class CalendarView extends Component {
    render() {
        return (
            <div>
                <h1>Calendar 日历</h1>
                <div className="k-example">
                    <Calendar data={data} />
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
                            <td>defaultView</td>
                            <td>默认视图，0：年视图，1：月视图</td>
                            <td>number</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>data</td>
                            <td>事件数据，格式：{`[{ id: 1, title: "event1", start: "2018-07-17", end: "2018-08-17" },...]`}</td>
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
