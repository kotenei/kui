```jsx
import React, { Component } from "react";
import { Menu, Icon } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <Menu style={{ width: 250 }} mode="inline">
                <Menu.Item id="1">
                    <Icon type="home" />
                    <span>导航一</span>
                </Menu.Item>
                <Menu.SubMenu
                    id="1-1"
                    title={
                        <span>
                            <Icon type="setting" />
                            <span>导航二</span>
                        </span>
                    }
                >
                    <Menu.Item id="2">
                        <Icon type="android" />
                        <span>选项一</span>
                    </Menu.Item>
                    <Menu.Item id="3">
                        <Icon type="apple" />
                        <span>选项二</span>
                    </Menu.Item>
                    <Menu.Item id="4">
                        <Icon type="windows" />
                        <span>选项三</span>
                    </Menu.Item>
                    <Menu.Item id="5">
                        <Icon type="github" />
                        <span>选项四</span>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );
    }
}

```
