```jsx
import React, { Component } from "react";
import { Timeline, Icon } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <Timeline>
                <Timeline.Item>2012</Timeline.Item>
                <Timeline.Item color="info">2013</Timeline.Item>
                <Timeline.Item color="success">2014</Timeline.Item>
                <Timeline.Item color="warning">2015</Timeline.Item>
                <Timeline.Item
                    color="danger"
                    dot={
                        <Icon
                            type="clockcircleo"
                            style={{ fontSize: "16px" }}
                        />
                    }
                >
                    2016
                </Timeline.Item>
            </Timeline>
        );
    }
}


```
