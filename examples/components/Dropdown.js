import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown, Menu, Button, Message } from "main";

class DropdownView extends Component {
    handleButtonClick = () => {
        Message.info("点击了下拉菜单左侧按钮！");
    };
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
        );

        return (
            <div>
                <h1>Dropdown 下拉菜单</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Dropdown menu={menu} style={{ marginRight: 50 }}>
                        <a href="javascript:void(0);">Hover me!</a>
                    </Dropdown>
                    <Dropdown menu={menu} trigger="click">
                        <a href="javascript:void(0);">Click me!</a>
                    </Dropdown>
                </div>
                <h3>弹出位置</h3>
                <div className="k-example">
                    <Dropdown menu={menu} placement="bottomLeft">
                        <Button raised>bottomLeft</Button>
                    </Dropdown>&nbsp;&nbsp;
                    <Dropdown menu={menu} placement="bottom">
                        <Button raised>bottomCenter</Button>
                    </Dropdown>&nbsp;&nbsp;
                    <Dropdown menu={menu} placement="bottomRight">
                        <Button raised>bottomRight</Button>
                    </Dropdown>&nbsp;&nbsp;
                    <Dropdown menu={menu} placement="topLeft">
                        <Button raised>topLeft</Button>
                    </Dropdown>&nbsp;&nbsp;
                    <Dropdown menu={menu} placement="top">
                        <Button raised>topCenter</Button>
                    </Dropdown>&nbsp;&nbsp;
                    <Dropdown menu={menu} placement="topRight">
                        <Button raised>topRight</Button>
                    </Dropdown>
                </div>
                <h3>带下拉框按钮</h3>
                <div className="k-example">
                    <Dropdown.Button
                        menu={menu}
                        onClick={this.handleButtonClick}
                    >
                        下拉菜单
                    </Dropdown.Button>
                </div>
                <h1>API</h1>
                <h3>Dropdown</h3>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>component</td>
                            <td>容器组件</td>
                            <td>string|ReactElement</td>
                            <td>'div'</td>
                        </tr>
                        <tr>
                            <td>menu</td>
                            <td>菜单</td>
                            <td>ReactElement</td>
                            <td />
                        </tr>
                        <tr>
                            <td>trigger</td>
                            <td>触发方式，可选 'click' 'hover'</td>
                            <td>string</td>
                            <td>'hover'</td>
                        </tr>
                        <tr>
                            <td>placement</td>
                            <td>
                                弹出位置，可选 'topLeft' 'top' 'topRight'
                                'bottomLeft' 'bottom' 'bottomRight'
                            </td>
                            <td>string</td>
                            <td>'bottomLeft'</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>Dropdown.Button</h3>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>menu</td>
                            <td>菜单</td>
                            <td>ReactElement</td>
                            <td />
                        </tr>
                        <tr>
                            <td>trigger</td>
                            <td>触发方式，可选 'click' 'hover'</td>
                            <td>string</td>
                            <td>'hover'</td>
                        </tr>
                        <tr>
                            <td>placement</td>
                            <td>
                                弹出位置，可选 'topLeft' 'topCenter' 'topRight'
                                'bottomLeft' 'bottomCenter' 'bottomRight'
                            </td>
                            <td>string</td>
                            <td>'bottomLeft'</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onClick</td>
                            <td>点击左侧按钮回调函数</td>
                            <td>Function</td>
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DropdownView;
