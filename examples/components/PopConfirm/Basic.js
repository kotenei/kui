import React, { Component } from "react";
import { Button, Popconfirm, Message } from "kui-react";

export default class Basic extends Component {
    cacnel() {
        Message.error("点击了取消");
    }
    confirm() {
        Message.info("点击了确认");
    }
    render() {
        return (
            <Popconfirm
                title="您确认要删除吗?"
                placement="right"
                onCancel={this.cacnel}
                onConfirm={this.confirm}
            >
                <Button raised>Delete</Button>
            </Popconfirm>
        );
    }
}
