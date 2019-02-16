import React, { Component } from "react";
import { Tooltip } from "kui-react";

export default class Placement extends Component {
    render() {
        return (
            <div className="tooltip-box">
                <div style={{ marginLeft: 60 }}>
                    <Tooltip placement="topLeft" title="tooltip text">
                        <a>上左</a>
                    </Tooltip>
                    <Tooltip placement="top" title="tooltip text">
                        <a>上边</a>
                    </Tooltip>
                    <Tooltip placement="topRight" title="tooltip text">
                        <a>上右</a>
                    </Tooltip>
                </div>
                <div style={{ width: 60, float: "left" }}>
                    <Tooltip placement="leftTop" title="tooltip text">
                        <a>左上</a>
                    </Tooltip>
                    <Tooltip placement="left" title="tooltip text">
                        <a>左边</a>
                    </Tooltip>
                    <Tooltip placement="leftBottom" title="tooltip text">
                        <a>左下</a>
                    </Tooltip>
                </div>
                <div style={{ width: 60, marginLeft: 270 }}>
                    <Tooltip placement="rightTop" title="tooltip text">
                        <a>右上</a>
                    </Tooltip>
                    <Tooltip placement="right" title="tooltip text">
                        <a>右边</a>
                    </Tooltip>
                    <Tooltip placement="rightBottom" title="tooltip text">
                        <a>右下</a>
                    </Tooltip>
                </div>
                <div style={{ marginLeft: 60, clear: "both" }}>
                    <Tooltip placement="bottomLeft" title="tooltip text">
                        <a>下左</a>
                    </Tooltip>
                    <Tooltip placement="bottom" title="tooltip text">
                        <a>下边</a>
                    </Tooltip>
                    <Tooltip placement="bottomRight" title="tooltip text">
                        <a>下右</a>
                    </Tooltip>
                </div>
            </div>
        );
    }
}
