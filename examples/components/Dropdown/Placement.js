import React, { Component } from "react";
import { Dropdown, Menu, Button } from "kui-react";

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
                <Dropdown menu={menu} placement="bottomLeft">
                    <Button raised>bottomLeft</Button>
                </Dropdown>
                &nbsp;&nbsp;
                <Dropdown menu={menu} placement="bottom">
                    <Button raised>bottomCenter</Button>
                </Dropdown>
                &nbsp;&nbsp;
                <Dropdown menu={menu} placement="bottomRight">
                    <Button raised>bottomRight</Button>
                </Dropdown>
                &nbsp;&nbsp;
                <Dropdown menu={menu} placement="topLeft">
                    <Button raised>topLeft</Button>
                </Dropdown>
                &nbsp;&nbsp;
                <Dropdown menu={menu} placement="top">
                    <Button raised>topCenter</Button>
                </Dropdown>
                &nbsp;&nbsp;
                <Dropdown menu={menu} placement="topRight">
                    <Button raised>topRight</Button>
                </Dropdown>
            </React.Fragment>
        );
    }
}
