import React, { Component } from "react";
import Basic from "./Basic";

class LazyLoadView extends Component {
    render() {
        return (
            <div>
                <h1>LazyLoad 延迟加载</h1>
                <div className="k-example">
                    <Basic />
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
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>loading</td>
                            <td>预加载图片</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>error</td>
                            <td>加载失败图片</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onSuccess</td>
                            <td>加载成功回调函数</td>
                            <td>Function(value:object)</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onError</td>
                            <td>加载失败回调函数</td>
                            <td>Function(value:object)</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LazyLoadView;
