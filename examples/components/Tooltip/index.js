import React, { Component } from "react";
import Basic from "./Basic";
import Placement from "./Placement";
import DocMark from "../DocMark";
import docs from "./docs";

class TooltipView extends Component {
    render() {
        return (
            <div>
                <h1>Tooltip 文字提示</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>12个方向</h3>
                <div className="k-example">
                    <Placement />
                    <DocMark source={docs.Placement} />
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
                            <td>title</td>
                            <td>提示内容</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>kStyle</td>
                            <td>
                                风格，可选值 'primary' 'info' 'success'
                                'warning' 'danger'
                            </td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <h1>公共API</h1>
                <h3>以下API为Tooltip、Popover共享的API</h3>
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
                            <td>placement</td>
                            <td>
                                显示位置，可选 top left right bottom topLeft
                                topRight bottomLeft bottomRight leftTop
                                leftBottom rightTop rightBottom
                            </td>
                            <td>string</td>
                            <td>'top'</td>
                        </tr>
                        <tr>
                            <td>trigger</td>
                            <td>触发tips显示和隐藏的事件,可选 hover click</td>
                            <td>string</td>
                            <td>hover</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TooltipView;
