import React, { Component } from "react";
import Basic from "./Basic";
import Multiple from "./Multiple";
import Size from "./Size";
import DocMark from "../DocMark";
import docs from "./docs";

class SelectView extends Component {
    render() {
        return (
            <div>
                <h1>Select 选择器</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>多选</h3>
                <div className="k-example">
                    <Multiple />
                    <DocMark source={docs.Multiple} />
                </div>
                <h3>尺寸</h3>
                <div className="k-example">
                    <Size />
                    <DocMark source={docs.Size} />
                </div>
                <h1>API</h1>
                <h3>Select</h3>
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
                            <td>onChange</td>
                            <td>
                                选中 option，或 input 的 value
                                变化时，调用此函数
                            </td>
                            <td>function(value:string|string[])</td>
                            <td>—</td>
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
