import React, { Component } from "react";
import { Modal, Button } from "kui-react";

export default class Basic extends Component {
    state = {
        show: false
    };
    showModal = () => {
        this.setState({
            show: true
        });
    };
    handleCancel = e => {
        this.setState({
            show: false
        });
    };
    handleOK = e => {
        this.setState({
            show: false
        });
    };
    render() {
        return (
            <React.Fragment>
                <Button raised kStyle="primary" onClick={this.showModal}>
                    点击打开
                </Button>
                <Modal
                    show={this.state.show}
                    title="测试"
                    content="对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容对话框内容内容"
                    onOK={this.handleOK}
                    onCancel={this.handleCancel}
                    z
                />
            </React.Fragment>
        );
    }
}
