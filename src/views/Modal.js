import React, { Component } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';

function confirm() {
    let a = Modal.confirm({
        title: '这是消息标题',
        content: (
            <div>
                这里是提示消息
            </div>
        ),
        onOK() {
            console.log('ok')
        },
        onCancel() {
            console.log('cancel')
        }
    });
}

function info() {
    Modal.info({
        title: '这是消息标题',
        content: (
            <div>
                这里是提示消息
            </div>
        ),
        onOK() {
            console.log('ok')
        }
    });
}

function success() {
    Modal.success({
        title: '这是消息标题',
        content: (
            <div>
                这里是提示消息
            </div>
        ),
        onOK() {
            console.log('ok')
        }
    });
}

function warning() {
    Modal.warning({
        title: '这是消息标题',
        content: (
            <div>
                这里是提示消息
            </div>
        ),
        onOK() {
            console.log('ok')
        }
    });
}

function error() {
    Modal.error({
        title: '这是消息标题',
        content: (
            <div>
                这里是提示消息
            </div>
        ),
        onOK() {
            console.log('ok')
        }
    });
}

class ModalView extends Component {
    state = {
        show: false,
        show2: false
    }
    showModal = () => {
        this.setState({
            show: true
        });
    }
    handleCancel = (e) => {
        this.setState({
            show: false
        })
    }
    handleOK = (e) => {
        this.setState({
            show: false
        })
    }
    render() {
        return (
            <div>
                <h1>Modal 对话框</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Button raised kStyle="primary" onClick={this.showModal}>点击打开</Button>
                    <Modal
                        show={this.state.show}
                        title="测试"
                        content="对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容内容"
                        onOK={this.handleOK}
                        onCancel={this.handleCancel} z
                    >
                    </Modal>
                </div>
                <h3>信息状态</h3>
                <div className="k-example">
                    <Button raised kStyle="primary" onClick={confirm}>confirm</Button>&nbsp;&nbsp;
                    <Button raised kStyle="info" onClick={info}>Info</Button>&nbsp;&nbsp;
                    <Button raised kStyle="success" onClick={success}>Success</Button>&nbsp;&nbsp;
                    <Button raised kStyle="warning" onClick={warning}>Warning</Button>&nbsp;&nbsp;
                    <Button raised kStyle="danger" onClick={error}>Error</Button>&nbsp;&nbsp;
                </div>
                <h1>API</h1>
                <table className="k-table k-table-hover k-table-striped">
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
                            <td>确定按钮风格，可选 primary success info warning danger</td>
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
                            <td>确定按钮风格，可选 primary success info warning danger</td>
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
                <br/>
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
                参数对象如下：<br/>
                <table className="k-table k-table-hover k-table-striped">
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
                            <td>确定按钮风格，可选 primary success info warning danger</td>
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
                            <td>确定按钮风格，可选 primary success info warning danger</td>
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
        )
    }
}

export default ModalView;