import React, { Component } from "react";
import Basic from "./Basic";

class AlertView extends Component {
    render() {
        return (
            <div>
                <h1>Alert 警告提示</h1>
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
                            <td>showIcon</td>
                            <td>
                                是否展示图标，只有在kStyle属性设置为'info'
                                'success' 'warning' 'danger'才有效
                            </td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>closable</td>
                            <td>是否启用关闭</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>closeText</td>
                            <td>自定义关闭按钮</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>标题</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>description</td>
                            <td>警告提示的辅助性文字介绍</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>kStyle</td>
                            <td>
                                风格，可选值 'info' 'success' 'warning' 'danger'
                            </td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onClose</td>
                            <td>关闭回调函数,返回true则关闭</td>
                            <td>Function</td>
                            <td>{"()=>{ return true; }"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AlertView;
