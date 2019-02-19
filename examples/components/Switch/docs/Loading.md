```jsx
import React, { Component } from "react";
import { Switch } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch loading />
                <br />
                <br />
                <Switch loading checked />
            </React.Fragment>
        );
    }
}

```
