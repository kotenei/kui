```jsx
import React, { Component } from "react";
import { Input, Icon } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Input type="text" prefix={<Icon type="user" />} />
                <br />
                <Input type="text" suffix={<Icon type="search" />} />
            </React.Fragment>
        );
    }
}

```
