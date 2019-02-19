```jsx
import React, { Component } from "react";
import { Tooltip } from "kui-react";

const style = {
    display: "inline-block",
    lineHeight: "32px",
    height: "32px",
    width: "60px",
    fontSize: "14px",
    textAlign: "center",
    background: "#f5f5f5",
    marginRight: "1em",
    marginBottom: "1em",
    borderRadius: "6px"
};

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Tooltip title="tooltip text">
                    <a style={style}>default</a>
                </Tooltip>
                <Tooltip title="tooltip text" kStyle="primary">
                    <a style={style}>primary</a>
                </Tooltip>
                <Tooltip title="tooltip text" kStyle="info">
                    <a style={style}>info</a>
                </Tooltip>
                <Tooltip title="tooltip text" kStyle="success">
                    <a style={style}>success</a>
                </Tooltip>
                <Tooltip title="tooltip text" kStyle="warning">
                    <a style={style}>warning</a>
                </Tooltip>
                <Tooltip title="tooltip text" kStyle="danger">
                    <a style={style}>danger</a>
                </Tooltip>
                <Tooltip title="tooltip text" trigger="click">
                    <a style={style}>click</a>
                </Tooltip>
            </React.Fragment>
        );
    }
}

```
