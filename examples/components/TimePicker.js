import React, { Component } from "react";
import { TimePicker } from "main";

class TimePickerView extends Component {
    state = {
        value: "10:52:50"
    };
    handleOK = value => {
        console.log(value);
        this.setState({
            value
        });
    };
    render() {
        const { value } = this.state;
        return (
            <div>
                <h1>TimePicker 时间选择</h1>
                <h3>基本使用</h3>
                <div className="k-example">
                    <TimePicker />
                </div>
                <h3>禁用</h3>
                <div className="k-example">
                    <TimePicker disabled value="12:00:00" />
                </div>
                <h3>尺寸</h3>
                <div className="k-example">
                    <TimePicker kSize="lg" value={value} onOK={this.handleOK} />
                    <br />
                    <TimePicker value={value} onOK={this.handleOK} />
                    <br />
                    <TimePicker kSize="sm" value={value} onOK={this.handleOK} />
                </div>
                <h3>步长</h3>
                <div className="k-example">
                    <TimePicker
                        hourStep={2}
                        minuteStep={5}
                        secondStep={10}
                        onOK={this.handleOK}
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
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TimePickerView;
