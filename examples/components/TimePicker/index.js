import React, { Component } from "react";
import Basic from "./Basic";
import Disabled from "./Disabled";
import Size from "./Size";
import Step from "./Step";
import DocMark from "../DocMark";
import docs from "./docs";

class TimePickerView extends Component {
    render() {
        return (
            <div>
                <h1>TimePicker 时间选择</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>禁用</h3>
                <div className="k-example">
                    <Disabled />
                    <DocMark source={docs.Disabled} />
                </div>
                <h3>尺寸</h3>
                <div className="k-example">
                    <Size />
                    <DocMark source={docs.Size} />
                </div>
                <h3>步长</h3>
                <div className="k-example">
                    <Step />
                    <DocMark source={docs.Step} />
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
                            <td>cancelText</td>
                            <td>取消按钮文本</td>
                            <td>string</td>
                            <td>取消</td>
                        </tr>
                        <tr>
                            <td>okText</td>
                            <td>确定按钮文本</td>
                            <td>string</td>
                            <td>确定</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>默认时间</td>
                            <td>string</td>
                            <td>'00:00:00'</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>kSize</td>
                            <td>尺寸，可选'sm' 'lg'</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>hourStep</td>
                            <td>小时步长</td>
                            <td>number</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>minuteStep</td>
                            <td>分钟步长</td>
                            <td>number</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>minTime</td>
                            <td>最小时间，格式:"00:00:00"</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>maxTime</td>
                            <td>最大时间，格式:"00:00:00"</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>secondStep</td>
                            <td>秒步长</td>
                            <td>number</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>open</td>
                            <td>是否显示时间选择</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>placeholder</td>
                            <td>没有值时显示内容</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>suffix</td>
                            <td>后缀图标</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>当前时间</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onCancel</td>
                            <td>取消回调</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onOK</td>
                            <td>确定回调</td>
                            <td>Function(value:string)</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>时间发生变化的回调</td>
                            <td>Function(value:string)</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TimePickerView;
