```jsx
import React, { Component } from "react";
import { List, Icon } from "kui-react";

const data = ["List Item", "List Item", "List Item"];
const actions = [
    <Icon type="edit" theme="filled" />,
    <Icon type="delete" theme="filled" />
];

export default class Example extends Component {
    render() {
        return (
            <List bordered>
                <List.Item actions={actions}>List Item</List.Item>
                <List.Item actions={actions}>List Item</List.Item>
                <List.Item actions={actions}>List Item</List.Item>
            </List>
        );
    }
}

```
