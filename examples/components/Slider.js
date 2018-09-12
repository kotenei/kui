import React, { Component } from "react";
import { Slider, Switch } from "main";

const marks = {
    22: "22",
    40: "40",
    100: {
        style: {
            color: "#f50"
        },
        label: <strong>100</strong>
    }
};

class SliderView extends Component {
    state = {
        disabled: false
    };
    render() {
        const { disabled } = this.state;
        return (
            <div>
                <h1>Slider 滑块</h1>
                <h3>基本用法</h3>
                <div
                    className="k-example"
                    style={{ paddingLeft: 30, paddingRight: 30 }}
                >
                    <Slider defaultValue={10} disabled={disabled} />
                    <br />
                    <Slider
                        range
                        defaultValue={[5, 10, 30]}
                        disabled={disabled}
                    />
                    <br />
                    Disabled:{" "}
                    <Switch
                        defaultChecked
                        onChange={checked => {
                            this.setState({
                                disabled: !checked
                            });
                        }}
                    />
                </div>
                <h3>格式化Tooltip</h3>
                <div
                    className="k-example"
                    style={{ paddingLeft: 30, paddingRight: 30 }}
                >
                    <Slider
                        tipFormatter={value => {
                            return `${value}%`;
                        }}
                    />
                    <br />
                    <Slider  tipFormatter={null} />
                </div>
                <h3>带标签滑块</h3>
                <div
                    className="k-example"
                    style={{
                        paddingLeft: 30,
                        paddingRight: 30,
                        paddingBottom: 30
                    }}
                >
                    <Slider defaultValue={10} marks={marks} />
                </div>
                <h3>方向</h3>
                <div
                    className="k-example"
                    style={{
                        paddingLeft: 30,
                        paddingRight: 30,
                        paddingBottom: 30,
                        height: 400
                    }}
                >
                    <Slider defaultValue={10} marks={marks} vertical />
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
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>min</td>
                            <td>最小值</td>
                            <td>number</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>max</td>
                            <td>最大值</td>
                            <td>number</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>step</td>
                            <td>步长</td>
                            <td>number</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>range</td>
                            <td>是否双滑块模式</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>vertical</td>
                            <td>是否垂直方向</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>
                                设置当前取值。当 range 为 false 时，使用
                                number，否则用 [number, number]
                            </td>
                            <td>number|number[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>
                                设置初始取值。当 range 为 false 时，使用
                                number，否则用 [number, number]
                            </td>
                            <td>number|number[]</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>tipFormatter</td>
                            <td>
                                Slider 会把当前值传给 tipFormatter，并在 Tooltip
                                中显示 tipFormatter 的返回值，若为 null，则隐藏
                                Tooltip。
                            </td>
                            <td>Function(value)|null</td>
                            <td>{"(value)=>{ return value; }"}</td>
                        </tr>
                        <tr>
                            <td>onDragStart</td>
                            <td>开始拖拽回调函数</td>
                            <td>Function(value:number|number[])</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>拖拽时回调函数</td>
                            <td>Function(value:number|number[])</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onDragStop</td>
                            <td>结束拖拽回调函数</td>
                            <td>Function(value:number|number[])</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SliderView;
