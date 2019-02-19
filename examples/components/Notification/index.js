import React, { Component } from "react";
import Basic from "./Basic";
import DocMark from "../DocMark";
import docs from "./docs";

class NotificationView extends Component {
    render() {
        return (
            <div>
                <h1>Notification 通知提醒框</h1>
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
                            <td>title</td>
                            <td>提示标题，必填</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>content</td>
                            <td>提示内容,必填</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>duration</td>
                            <td>自动关闭延时，单位毫秒</td>
                            <td>number</td>
                            <td>1500</td>
                        </tr>
                        <tr>
                            <td>onClose</td>
                            <td>关闭时触发的回调函数</td>
                            <td>Function</td>
                            <td>()=>{}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>全局配置和销毁</h3>
                <pre>
                    <code>
                        //配置
                        <br />
                        Message.config(options)
                        <br />
                        <br />
                        //销毁
                        <br />
                        Message.destory()
                    </code>
                </pre>
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
                                弹出位置，可选 topLeft topRight bottomLeft
                                bottomRight
                            </td>
                            <td>string</td>
                            <td>topRight</td>
                        </tr>
                        <tr>
                            <td>duration</td>
                            <td>自动关闭延时，单位毫秒</td>
                            <td>number</td>
                            <td>1500</td>
                        </tr>
                        <tr>
                            <td>getContainer</td>
                            <td>配置渲染节点的输出位置</td>
                            <td>() => HTMLElement</td>
                            <td>() => document.body</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default NotificationView;
