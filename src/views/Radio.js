import React, { Component, PropTypes } from 'react';
import Radio from '../components/Radio';

let RadioGroup = Radio.RadioGroup;

const options = ['Apple', 'Pear', 'Orange'];


class RadioView extends Component {
    render() {
        return (
            <div>
                <h1>Radio 单选框</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Radio mode="normal">normal</Radio>
                    <Radio>material</Radio>
                </div>
                <h3>禁用状态</h3>
                <div className="k-example">
                    <Radio checked disabled>Radio</Radio>
                    <Radio disabled>Radio</Radio>
                </div>
                <h3>单选框组</h3>
                <div className="k-example">
                    <RadioGroup options={options}  />
                </div>
                <h1>API</h1>
                <h2>Radio</h2>
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
                            <td>checked</td>
                            <td>指定当前是否选中</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>defaultChecked</td>
                            <td>初始是否选中</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>inline</td>
                            <td>是否行内显示</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>mode</td>
                            <td>复选框风格，normal material </td>
                            <td>string</td>
                            <td>material</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>名称</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>值</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>变化时回调函数</td>
                            <td>function(e:Event)</td>
                            <td>{'()=>{  }'}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h2>Checkbox Group</h2>
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
                            <td>inline</td>
                            <td>是否行内显示</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>名称</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>options</td>
                            <td>选项</td>
                            <td>array</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>指定选中选项</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>默认选中选项</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>变化时回调函数</td>
                            <td>function(checkedValue)</td>
                            <td>{'()=>{  }'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default RadioView;