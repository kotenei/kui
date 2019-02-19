```jsx
import React, { Component } from "react";
import { Modal, Button } from "kui-react";

function confirm() {
    let a = Modal.confirm({
        title: "这是消息标题",
        content: <div>这里是提示消息</div>,
        onOK() {
            console.log("ok");
        },
        onCancel() {
            console.log("cancel");
        }
    });
}

function info() {
    Modal.info({
        title: "这是消息标题",
        content: <div>这里是提示消息</div>,
        onOK() {
            console.log("ok");
        }
    });
}

function success() {
    Modal.success({
        title: "这是消息标题",
        content: <div>这里是提示消息</div>,
        onOK() {
            console.log("ok");
        }
    });
}

function warning() {
    Modal.warning({
        title: "这是消息标题",
        content: <div>这里是提示消息</div>,
        onOK() {
            console.log("ok");
        }
    });
}

function error() {
    Modal.error({
        title: "这是消息标题",
        content: <div>这里是提示消息</div>,
        onOK() {
            console.log("ok");
        }
    });
}

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Button raised kStyle="primary" onClick={confirm}>
                    confirm
                </Button>
                &nbsp;&nbsp;
                <Button raised kStyle="info" onClick={info}>
                    Info
                </Button>
                &nbsp;&nbsp;
                <Button raised kStyle="success" onClick={success}>
                    Success
                </Button>
                &nbsp;&nbsp;
                <Button raised kStyle="warning" onClick={warning}>
                    Warning
                </Button>
                &nbsp;&nbsp;
                <Button raised kStyle="danger" onClick={error}>
                    Error
                </Button>
            </React.Fragment>
        );
    }
}

```
