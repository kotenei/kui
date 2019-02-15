import React, { Component } from "react";
import { Card } from "main";

export default class Basic extends Component {
    render() {
        return (
            <React.Fragment>
                <Card
                    title="卡片标题"
                    extra={<a href="javascript:void(0);">更多</a>}
                >
                    <p>列表内容1</p>
                    <p>列表内容2</p>
                    <p>列表内容3</p>
                    <p style={{ marginBottom: 0 }}>列表内容4</p>
                </Card>
            </React.Fragment>
        );
    }
}
