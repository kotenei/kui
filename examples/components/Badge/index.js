import React, { Component } from "react";
import Basic from "./Basic";
import Dot from "./Dot";
import DocMark from "../DocMark";
import docs from "./docs";

class BadgeView extends Component {
    render() {
        return (
            <div>
                <h1>Badge 徽章</h1>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <div className="k-example">
                    <Dot />
                    <DocMark source={docs.Dot} />
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
                            <td>count</td>
                            <td>
                                展示数字，大于overflowCount时显示'overflowCount+',为0时隐藏
                            </td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>overflowCount</td>
                            <td>展示封顶的数字值</td>
                            <td>number</td>
                            <td>99</td>
                        </tr>
                        <tr>
                            <td>dot</td>
                            <td>不展示数字，只有一个小点</td>
                            <td>boolean</td>
                            <td>false</td>
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
            </div>
        );
    }
}

export default BadgeView;
