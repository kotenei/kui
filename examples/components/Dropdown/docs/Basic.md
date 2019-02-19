```jsx
import React, { Component } from "react";
import { Dropdown, Menu } from "kui-react";

const menu = (
    <Menu>
        <Menu.Item id="1">选项1</Menu.Item>
        <Menu.Item id="2">选项2</Menu.Item>
        <Menu.Item id="3">选项3</Menu.Item>
        <Menu.Item id="4">选项4</Menu.Item>
        <Menu.SubMenu id="1-1" title={<span>子菜单</span>}>
            <Menu.Item id="5">子菜单1</Menu.Item>
            <Menu.Item id="6">子菜单2</Menu.Item>
        </Menu.SubMenu>
    </Menu>
);

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Dropdown menu={menu} style={{ marginRight: 50 }}>
                    <a href="javascript:void(0);">Hover me!</a>
                </Dropdown>
                <Dropdown menu={menu} trigger="click">
                    <a href="javascript:void(0);">Click me!</a>
                </Dropdown>
            </React.Fragment>
        );
    }
}

```
