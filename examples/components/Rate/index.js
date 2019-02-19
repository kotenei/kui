import React, { Component } from "react";
import Basic from "./Basic";
import Half from "./Half";
import Disabled from "./Disabled";
import Character from "./Character";
import DocMark from "../DocMark";
import docs from "./docs";

class RateView extends Component {
    render() {
        return (
            <div>
                <h1>Rate 评分</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>半星</h3>
                <div className="k-example">
                    <Half />
                    <DocMark source={docs.Half} />
                </div>
                <h3>禁用</h3>
                <div className="k-example">
                    <Disabled />
                    <DocMark source={docs.Disabled} />
                </div>
                <h3>其它字符</h3>
                <div className="k-example">
                    <Character />
                    <DocMark source={docs.Character} />
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
                            <td>allowHalf</td>
                            <td>是否允许半选</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>count</td>
                            <td>star总数</td>
                            <td>number</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>默认值</td>
                            <td>number</td>
                            <td />
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>当前值</td>
                            <td>number</td>
                            <td />
                        </tr>
                        <tr>
                            <td>character</td>
                            <td>自定义字符</td>
                            <td>ReactNode</td>
                            <td>&lt;Icon type="star" /&gt;</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onHoverChange</td>
                            <td>鼠标经过时数值变化的回调</td>
                            <td>function(value:number)</td>
                            <td />
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>选择时回调</td>
                            <td>function(value:number)</td>
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RateView;
