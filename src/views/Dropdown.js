import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../components/Dropdown';
import Menu from '../components/Menu';

class DropdownView extends Component {
    render() {

        let menu = (
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
        )

        return (
            <div>
                <h1>Dropdown 下拉菜单</h1>
                <div className="k-example">
                    <Dropdown menu={menu}>
                        <a href="###">Hover me!</a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

export default DropdownView;