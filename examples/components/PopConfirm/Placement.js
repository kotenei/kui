import React, { Component } from "react";
import { Button, Popconfirm, Message } from "kui-react";

export default class Example extends Component {
    cacnel() {
        Message.error("点击了取消");
    }
    confirm() {
        Message.info("点击了确认");
    }
    render() {
        return (
            <div className="tooltip-box">
                <div style={{ marginLeft: 60 }}>
                    <Popconfirm
                        placement="topLeft"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>上左</a>
                    </Popconfirm>
                    <Popconfirm
                        placement="top"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>上边</a>
                    </Popconfirm>
                    <Popconfirm
                        placement="topRight"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>上右</a>
                    </Popconfirm>
                </div>
                <div style={{ width: 60, float: "left" }}>
                    <Popconfirm
                        placement="leftTop"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>左上</a>
                    </Popconfirm>
                    <Popconfirm
                        placement="left"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>左边</a>
                    </Popconfirm>
                    <Popconfirm
                        placement="leftBottom"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>左下</a>
                    </Popconfirm>
                </div>
                <div style={{ width: 60, marginLeft: 270 }}>
                    <Popconfirm
                        placement="rightTop"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>右上</a>
                    </Popconfirm>
                    <Popconfirm
                        placement="right"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>右边</a>
                    </Popconfirm>
                    <Popconfirm
                        placement="rightBottom"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>右下</a>
                    </Popconfirm>
                </div>
                <div style={{ marginLeft: 60, clear: "both" }}>
                    <Popconfirm
                        placement="bottomLeft"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>下左</a>
                    </Popconfirm>
                    <Popconfirm
                        placement="bottom"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>下边</a>
                    </Popconfirm>
                    <Popconfirm
                        placement="bottomRight"
                        title="您确认要删除吗？"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}
                    >
                        <a>下右</a>
                    </Popconfirm>
                </div>
            </div>
        );
    }
}
