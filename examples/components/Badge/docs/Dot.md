```jsx
import React, { Component } from "react";
import { Badge } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Badge dot={true} kStyle="danger">
                    <a
                        href="javascript:void(0);"
                        style={{
                            width: 42,
                            height: 42,
                            borderRadius: 4,
                            background: "#eee",
                            display: "inline-block"
                        }}
                    />
                </Badge>
                &nbsp;&nbsp;
                <Badge count={11} overflowCount={10}>
                    <a
                        href="javascript:void(0);"
                        style={{
                            width: 42,
                            height: 42,
                            borderRadius: 4,
                            background: "#eee",
                            display: "inline-block"
                        }}
                    />
                </Badge>
            </React.Fragment>
        );
    }
}

```
