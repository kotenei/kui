import React, { Component } from "react";
import Basic from "./Basic";
import Disabled from "./Disabled";
import Group from "./Group";
import DocMark from "../DocMark";
import docs from "./docs";

class RadioView extends Component {
    render() {
        return (
            <div>
                <h1>Radio 单选框</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>禁用状态</h3>
                <div className="k-example">
                    <Disabled />
                    <DocMark source={docs.Disabled} />
                </div>
                <h3>单选框组</h3>
                <div className="k-example">
                    <Group />
                    <DocMark source={docs.Group} />
                </div>
                <h1>API</h1>
                <h2>Radio</h2>
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
                            <td>单选框风格，none normal </td>
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
                            <td>string</td>
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
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RadioView;
