```jsx
import React, { Component } from "react";
import { Notification, Button } from "kui-react";

export default class Example extends Component {
    handleDefaultShow() {
        Notification.open(
            "默认提示",
            "这是通知内容这是通知内容这是通知内容这是通知内容这是通知内容"
        );
    }
    handleShowInfo() {
        Notification.info(
            "消息提示",
            "这是一条消息提示这是一条消息提示这是一条消息提示这是一条消息提示这是一条消息提示这是一条消息提示这是一条消息提示这是一条消息提示"
        );
    }
    handleShowSuccess() {
        Notification.success("成功提示", "这是一条成功提示");
    }
    handleShowWarning() {
        Notification.waring("警告提示", "这是一条警告提示");
    }
    handleShowError() {
        Notification.error("错误提示", "这是一条错误提示");
    }
    render() {
        return (
            <React.Fragment>
                <Button raised onClick={this.handleDefaultShow}>
                    默认
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

```
