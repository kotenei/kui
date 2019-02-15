import React, { Component } from "react";
import Basic from "./Basic";
import Accordion from "./Accordion";

class CollapseView extends Component {
    render() {
        return (
            <div>
                <h1>Collapse 折叠面板</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                </div>
                <h3>手网琴</h3>
                <div className="k-example">
                    <Accordion />
                </div>
                <h1>API</h1>
                <h3>Collapse</h3>
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
                            <td>activeIds</td>
                            <td>当前激活 tab 面板的 id</td>
                            <td>string[]</td>
                            <td />
                        </tr>
                        <tr>
                            <td>defaultActiveIds</td>
                            <td>初始化选中面板的 id</td>
                            <td>string[]</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>accordion</td>
                            <td>是否手风琴</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>切换面板的回调</td>
                            <td>Function(id:string)</td>
                            <td />
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h3>Collapse.Panel</h3>
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
                            <td>id</td>
                            <td>对应 activeId</td>
                            <td>string</td>
                            <td />
                        </tr>
                        <tr>
                            <td>header</td>
                            <td>面板头内容</td>
                            <td>string|ReactNode</td>
                            <td>[]</td>
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
export default CollapseView;
