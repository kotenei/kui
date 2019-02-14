import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox,Radio } from "main";

let CheckboxGroup = Checkbox.CheckboxGroup;

const options = ["one", "two", "three", "four"];
const value = ["one"];

class CheckboxView extends Component {
    constructor(props) {
        super(props);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            indeterminate: false,
            checkAll: false,
            checkedList: []
        };
    }
    handleCheckAll(e) {
        this.setState({
            checkAll: !this.state.checkAll,
            indeterminate:false,
            checkedList: e.target.checked ? options : []
        });
    }
    handleChange(checkedList) {
        this.setState({
            checkAll: checkedList.length == options.length,
            indeterminate:
                checkedList.length > 0 && checkedList.length != options.length,
            checkedList
        });
    }
    render() {
        const { checkAll, checkedList, indeterminate } = this.state;
        return (
            <div>
                <h1>Checkbox 多选框</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Checkbox mode="none">none</Checkbox>
                    <Checkbox>normal</Checkbox>
                    <Checkbox mode="toggle">toggle</Checkbox>
                </div>
                <h3>禁用状态</h3>
                <div className="k-example">
                    <Checkbox checked disabled>
                        Checkbox
                    </Checkbox>
                    <Checkbox disabled>Checkbox</Checkbox>
                </div>
                <h3>多选框组</h3>
                <div className="k-example">
                    <CheckboxGroup options={options} defaultValue={value} />
                </div>
                <h3>全选/反选</h3>
                <div className="k-example">
                    <Checkbox
                        checked={checkAll}
                        indeterminate={indeterminate}
                        onChange={this.handleCheckAll}
                    >
                        全选
                    </Checkbox>
                    <CheckboxGroup
                        options={options}
                        value={checkedList}
                        onChange={this.handleChange}
                    />
                </div>
                <h1>API</h1>
                <h2>Checkbox</h2>
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
                            <td>复选框风格，none normal toggle</td>
                            <td>string</td>
                            <td>normal</td>
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
                            <td>string|number|boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>变化时回调函数</td>
                            <td>function(e:Event)</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h2>Checkbox Group</h2>
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
                            <td>array</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>默认选中选项</td>
                            <td>array</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>变化时回调函数</td>
                            <td>function(checkedValue)</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CheckboxView;
