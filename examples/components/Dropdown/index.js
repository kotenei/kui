import React, { Component } from "react";
import Basic from "./Basic";
import Placement from "./Placement";
import Button from "./Button";
import DocMark from "../DocMark";
import docs from "./docs";

class DropdownView extends Component {
    render() {
        return (
            <div>
                <h1>Dropdown 下拉菜单</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>弹出位置</h3>
                <div className="k-example">
                    <Placement />
                    <DocMark source={docs.Placement} />
                </div>
                <h3>带下拉框按钮</h3>
                <div className="k-example">
                    <Button />
                    <DocMark source={docs.Button} />
                </div>
                <h1>API</h1>
                <h3>Dropdown</h3>
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
                            <td>component</td>
                            <td>容器组件</td>
                            <td>string|ReactElement</td>
                            <td>'div'</td>
                        </tr>
                        <tr>
                            <td>menu</td>
                            <td>菜单</td>
                            <td>ReactElement</td>
                            <td />
                        </tr>
                        <tr>
                            <td>trigger</td>
                            <td>触发方式，可选 'click' 'hover'</td>
                            <td>string</td>
                            <td>'hover'</td>
                        </tr>
                        <tr>
                            <td>placement</td>
                            <td>
                                弹出位置，可选 'topLeft' 'top' 'topRight'
                                'bottomLeft' 'bottom' 'bottomRight'
                            </td>
                            <td>string</td>
                            <td>'bottomLeft'</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>Dropdown.Button</h3>
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
                            <td>menu</td>
                            <td>菜单</td>
                            <td>ReactElement</td>
                            <td />
                        </tr>
                        <tr>
                            <td>trigger</td>
                            <td>触发方式，可选 'click' 'hover'</td>
                            <td>string</td>
                            <td>'hover'</td>
                        </tr>
                        <tr>
                            <td>placement</td>
                            <td>
                                弹出位置，可选 'topLeft' 'topCenter' 'topRight'
                                'bottomLeft' 'bottomCenter' 'bottomRight'
                            </td>
                            <td>string</td>
                            <td>'bottomLeft'</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onClick</td>
                            <td>点击左侧按钮回调函数</td>
                            <td>Function</td>
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DropdownView;
