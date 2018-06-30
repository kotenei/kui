import React, { Component } from "react";
import { Select } from "main";

const Option = Select.Option;

const options = [
    <Option key="1" title="选项一" value="选项一">
        选项一
    </Option>,
    <Option key="2" title="选项二" value="选项二">
        选项二
    </Option>,
    <Option key="3" title="选项三" value="选项三">
        选项三
    </Option>
];

class SelectView extends Component {
    render() {
        return (
            <div>
                <h1>Select 选择器</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Select placeholder="请选择" >{options}</Select>
                    <br />
                    <br />
                    <Select placeholder="请选择" disabled>
                        {options}
                    </Select>
                </div>
                <h3>多选</h3>
                <div className="k-example">
                    <Select multiple placeholder="请选择">
                        {options}
                    </Select>
                </div>
                <h3>尺寸</h3>
                <div className="k-example">
                    <Select kSize="sm" placeholder="sm">
                        {options}
                    </Select>
                    <br />
                    <br />
                    <Select placeholder="default">{options}</Select>
                    <br />
                    <br />
                    <Select kSize="lg" placeholder="large">
                        {options}
                    </Select>
                </div>
                <h1>API</h1>
                <h3>Select</h3>
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
                            <td>multiple</td>
                            <td>是否多选</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>placeholder</td>
                            <td>占位符提示</td>
                            <td>string</td>
                            <td />
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>初始化默认值</td>
                            <td>string[]</td>
                            <td />
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>当前值</td>
                            <td>string[]</td>
                            <td />
                        </tr>
                        <tr>
                            <td>onSelect</td>
                            <td>选择时回调</td>
                            <td>function(value:string[])</td>
                            <td />
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>Select.Option</h3>
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
                            <td>title</td>
                            <td>选中该 Option 后，Select 的 title</td>
                            <td>string</td>
                            <td />
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>选项值</td>
                            <td>string</td>
                            <td />
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SelectView;
