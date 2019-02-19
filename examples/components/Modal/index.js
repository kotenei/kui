import React, { Component } from "react";
import Basic from "./Basic";
import Status from "./Status";
import DocMark from "../DocMark";
import docs from "./docs";

class ModalView extends Component {
    render() {
        return (
            <div>
                <h1>Modal 对话框</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>信息状态</h3>
                <div className="k-example">
                    <Status />
                    <DocMark source={docs.Status} />
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
                            <td>标题</td>
                            <td>ReactNode</td>
                            <td>'对话框'</td>
                        </tr>
                        <tr>
                            <td>content</td>
                            <td>内容</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>footer</td>
                            <td>底部内容</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>width</td>
                            <td>宽度</td>
                            <td>Number</td>
                            <td>720</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>高度</td>
                            <td>Number</td>
                            <td>480</td>
                        </tr>
                        <tr>
                            <td>backdrop</td>
                            <td>是否显示遮罩层</td>
                            <td>Boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>backdropClose</td>
                            <td>点击遮罩层是否关对话框</td>
                            <td>Boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>show</td>
                            <td>是否显对话框</td>
                            <td>Boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>okText</td>
                            <td>确定按钮文本</td>
                            <td>String</td>
                            <td>'确定'</td>
                        </tr>
                        <tr>
                            <td>okStyle</td>
                            <td>
                                确定按钮风格，可选 primary success info warning
                                danger
                            </td>
                            <td>String</td>
                            <td>'primary'</td>
                        </tr>
                        <tr>
                            <td>cancelText</td>
                            <td>取消按钮文本</td>
                            <td>String</td>
                            <td>'取消'</td>
                        </tr>
                        <tr>
                            <td>cancelStyle</td>
                            <td>
                                确定按钮风格，可选 primary success info warning
                                danger
                            </td>
                            <td>String</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onOK</td>
                            <td>点击确定后的回调函数</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onCancel</td>
                            <td>点击取消后的回调函数</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>Modal.method()</h3>
                <pre>
                    <code>
                        <p>Modal.confirm(config);</p>
                        <p>Modal.info(config);</p>
                        <p>Modal.success(config);</p>
                        <p>Modal.warning(config);</p>
                        <p>Modal.error(config);</p>
                    </code>
                </pre>
                参数对象如下：
                <br />
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
                            <td>标题</td>
                            <td>ReactNode</td>
                            <td>'对话框'</td>
                        </tr>
                        <tr>
                            <td>content</td>
                            <td>内容</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>okText</td>
                            <td>确定按钮文本</td>
                            <td>String</td>
                            <td>'确定'</td>
                        </tr>
                        <tr>
                            <td>okStyle</td>
                            <td>
                                确定按钮风格，可选 primary success info warning
                                danger
                            </td>
                            <td>String</td>
                            <td>'primary'</td>
                        </tr>
                        <tr>
                            <td>cancelText</td>
                            <td>取消按钮文本</td>
                            <td>String</td>
                            <td>'取消'</td>
                        </tr>
                        <tr>
                            <td>cancelStyle</td>
                            <td>
                                确定按钮风格，可选 primary success info warning
                                danger
                            </td>
                            <td>String</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onOK</td>
                            <td>点击确定后的回调函数</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onCancel</td>
                            <td>点击取消后的回调函数</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ModalView;
