import React, { Component } from "react";
import Basic from "./Basic";
import Size from "./Size";
import DateTime from "./DateTime";
import Range from "./Range";
import DocMark from "../DocMark";
import docs from "./docs";

class DatePickerView extends Component {
    render() {
        return (
            <div>
                <h1>DatePicker 日期选择</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>尺寸</h3>
                <div className="k-example">
                    <Size />
                    <DocMark source={docs.Size} />
                </div>
                <h3>日期时间选择</h3>
                <div className="k-example">
                    <DateTime />
                    <DocMark source={docs.DateTime} />
                </div>
                <h3>日期范围</h3>
                <div className="k-example">
                    <Range />
                    <DocMark source={docs.Range} />
                </div>

                <h1>API</h1>
                <h3>DatePicker</h3>
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
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>默认日期</td>
                            <td>date object</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>footerExtra</td>
                            <td>页脚额外内容</td>
                            <td>ReactNode</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>format</td>
                            <td>展示日期格式，配置参考date-fns</td>
                            <td>string</td>
                            <td>"YYYY-MM-DD"</td>
                        </tr>
                        <tr>
                            <td>minDate</td>
                            <td>最小日期</td>
                            <td>date object</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>maxDate</td>
                            <td>最大日期</td>
                            <td>date object</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>okText</td>
                            <td>确定按钮文本</td>
                            <td>string</td>
                            <td>"确定"</td>
                        </tr>
                        <tr>
                            <td>placeholder</td>
                            <td>无日期占位符</td>
                            <td>string</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>showPrevYear</td>
                            <td>是否显示上一年箭头</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>showPrevYear</td>
                            <td>是否显示上个月箭头</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>showNextYear</td>
                            <td>是否显示下一年箭头</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>showNextYear</td>
                            <td>是否显示下个月箭头</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>showToday</td>
                            <td>是否显示今天按钮</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>showTime</td>
                            <td>是否显示时间选择</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>showWeek</td>
                            <td>是否显示周选择</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>日期</td>
                            <td>date object</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>view</td>
                            <td>视图，0：年选择，1：月选择，2：日选择</td>
                            <td>number</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>日期更改后的回调函数</td>
                            <td>Function(dateInfo:object)</td>
                            <td>无</td>
                        </tr>
                        {/* <tr>
                            <td>onClear</td>
                            <td>清空日期回调函数</td>
                            <td>Function()</td>
                            <td>无</td>
                        </tr> */}
                        <tr>
                            <td>onPrev</td>
                            <td>上一年或上个月的回调函数</td>
                            <td>Function(type:string,date:object)</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onNext</td>
                            <td>下一年或下个月的回调函数</td>
                            <td>Function(type:string,date:object)</td>
                            <td>无</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>YearPicker，MonthPicker，WeekPicker</h3>
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
                            <td>defaultValue</td>
                            <td>默认日期</td>
                            <td>date object</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>format</td>
                            <td>展示日期格式，配置参考date-fns</td>
                            <td>string</td>
                            <td>
                                YearPicker:"YYYY", MonthPicker:'YYYY-MM',
                                WeekPicker:'YYYY-WW周'
                            </td>
                        </tr>
                        <tr>
                            <td>placeholder</td>
                            <td>无日期占位符</td>
                            <td>string</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>日期</td>
                            <td>date object</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>日期更改后的回调函数</td>
                            <td>Function(dateInfo:object)</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onClear</td>
                            <td>清空日期回调函数</td>
                            <td>Function()</td>
                            <td>无</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>RangePicker</h3>
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
                            <td>defaultValue</td>
                            <td>默认日期</td>
                            <td>date object</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>format</td>
                            <td>展示日期格式，配置参考date-fns</td>
                            <td>string</td>
                            <td>"YYYY-MM-DD"</td>
                        </tr>
                        <tr>
                            <td>startPlaceholder</td>
                            <td>开始日期占位符</td>
                            <td>string</td>
                            <td>"开始日期"</td>
                        </tr>
                        <tr>
                            <td>endPlaceholder</td>
                            <td>结束日期占位符</td>
                            <td>string</td>
                            <td>"结束日期"</td>
                        </tr>
                        <tr>
                            <td>okText</td>
                            <td>确定按钮文本</td>
                            <td>string</td>
                            <td>"确定"</td>
                        </tr>
                        <tr>
                            <td>separator</td>
                            <td>分隔符</td>
                            <td>string</td>
                            <td>"-"</td>
                        </tr>
                        <tr>
                            <td>showTime</td>
                            <td>是否显示时间选择</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>日期</td>
                            <td>date object</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>日期更改后的回调函数</td>
                            <td>Function(dateInfo:object)</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onClear</td>
                            <td>清空日期回调函数</td>
                            <td>Function()</td>
                            <td>无</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DatePickerView;
