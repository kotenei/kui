import React, { Component } from "react";
import { Popover, Button } from "kui-react";

export default class Placement extends Component {
    render() {
        return (
            <div className="tooltip-box">
                <div style={{ marginLeft: 60 }}>
                    <Popover
                        placement="topLeft"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>上左</a>
                    </Popover>
                    <Popover
                        placement="top"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>上边</a>
                    </Popover>
                    <Popover
                        placement="topRight"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>上右</a>
                    </Popover>
                </div>
                <div style={{ width: 60, float: "left" }}>
                    <Popover
                        placement="leftTop"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>左上</a>
                    </Popover>
                    <Popover
                        placement="left"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>左边</a>
                    </Popover>
                    <Popover
                        placement="leftBottom"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>左下</a>
                    </Popover>
                </div>
                <div style={{ width: 60, marginLeft: 270 }}>
                    <Popover
                        placement="rightTop"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>右上</a>
                    </Popover>
                    <Popover
                        placement="right"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>右边</a>
                    </Popover>
                    <Popover
                        placement="rightBottom"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>右下</a>
                    </Popover>
                </div>
                <div style={{ marginLeft: 60, clear: "both" }}>
                    <Popover
                        placement="bottomLeft"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>下左</a>
                    </Popover>
                    <Popover
                        placement="bottom"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>下边</a>
                    </Popover>
                    <Popover
                        placement="bottomRight"
                        title="弹出框"
                        content="这里是内容"
                        trigger="click"
                    >
                        <a>下右</a>
                    </Popover>
                </div>
            </div>
        );
    }
}
