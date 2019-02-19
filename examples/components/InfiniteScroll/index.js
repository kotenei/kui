import React, { Component } from "react";
import Basic from "./Basic";
import DocMark from "../DocMark";
import docs from "./docs";

class InfiniteScrollView extends Component {
    render() {
        return (
            <div>
                <h1>InfiniteScroll 无限滚动</h1>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
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
                            <td>width</td>
                            <td>容器宽度</td>
                            <td>number|string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>容器高度</td>
                            <td>number|string</td>
                            <td>400</td>
                        </tr>
                        <tr>
                            <td>distance</td>
                            <td>滚动系数</td>
                            <td>number</td>
                            <td>0.3</td>
                        </tr>
                        <tr>
                            <td>onScrollBottom</td>
                            <td>滚动到底部回调函数</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default InfiniteScrollView;
