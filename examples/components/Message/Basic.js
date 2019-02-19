import React, { Component } from "react";
import { Button, Message } from "kui-react";

export default class Example extends Component {
    handleShowInfo() {
        Message.info("这是一条消息提示");
    }
    handleShowSuccess() {
        Message.success("这是一条成功提示");
    }
    handleShowWarning() {
        Message.warning("这是一条警告提示");
    }
    handleShowError() {
        Message.error("这是一条错误提示");
    }
    handleShowLoading() {
        var item = Message.loading("正在加载中", function() {
            alert("加载完成");
        });
    }
    render() {
        return (
            <React.Fragment>
                <Button raised onClick={this.handleShowLoading}>
                    加载
                </Button>
                &nbsp;&nbsp;
                <Button raised kStyle="info" onClick={this.handleShowInfo}>
                    消息
                </Button>
                &nbsp;&nbsp;
                <Button
                    raised
                    kStyle="success"
                    onClick={this.handleShowSuccess}
                >
                    成功
                </Button>
                &nbsp;&nbsp;
                <Button
                    raised
                    kStyle="warning"
                    onClick={this.handleShowWarning}
                >
                    警告
                </Button>
                &nbsp;&nbsp;
                <Button raised kStyle="danger" onClick={this.handleShowError}>
                    错误
                </Button>
            </React.Fragment>
        );
    }
}
