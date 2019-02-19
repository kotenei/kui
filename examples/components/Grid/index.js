import React, { Component } from "react";
import Basic from "./Basic";
import Gutter from "./Gutter";
import Offset from "./Offset";
import FlexLayout from "./FlexLayout";
import FlexAlign from "./FlexAlign";
import Responsive from "./Responsive";
import DocMark from "../DocMark";
import docs from "./docs";

class GridView extends Component {
    render() {
        return (
            <div>
                <h1>Grid 栅格</h1>
                <h3>基础栅格</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>区块间隔</h3>
                <div className="k-example">
                    <Gutter />
                    <DocMark source={docs.Gutter} />
                </div>
                <h3>偏移</h3>
                <div className="k-example">
                    <Offset />
                    <DocMark source={docs.Offset} />
                </div>
                <h3>flex布局</h3>
                <div className="k-example">
                    <FlexLayout />
                    <DocMark source={docs.FlexLayout} />
                </div>
                <h3>flex对齐</h3>
                <div className="k-example">
                    <FlexAlign />
                    <DocMark source={docs.FlexAlign} />
                </div>
                <h3>响应式</h3>
                <div className="k-example">
                    <Responsive />
                    <DocMark source={docs.Responsive} />
                </div>
                <h1>API</h1>
                <h2>Row</h2>
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
                            <td>align</td>
                            <td>
                                flex 布局下的垂直对齐方式：top middle bottom
                            </td>
                            <td>string</td>
                            <td>'top'</td>
                        </tr>
                        <tr>
                            <td>gutter</td>
                            <td>栅格间隔</td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>justify</td>
                            <td>
                                flex 布局下的水平排列方式：start end center
                                space-around space-between
                            </td>
                            <td>string</td>
                            <td>'start'</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h2>Col</h2>
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
                            <td>offset</td>
                            <td>栅格左侧的间隔格数，间隔内不可以有栅格</td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>span</td>
                            <td>栅格占位格数，为 0 时相当于 display: none</td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>xs</td>
                            <td>{"<"}576px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>sm</td>
                            <td>{">"}576px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>md</td>
                            <td>{">"}768px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>lg</td>
                            <td>{">"}992px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>xl</td>
                            <td>{">"}1200px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>xxl</td>
                            <td>{">"}1600px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GridView;
