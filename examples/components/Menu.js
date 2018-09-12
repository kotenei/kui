import React, { Component } from "react";
import { Menu, Icon, Button } from "main";

class MenuView extends Component {
    render() {
        return (
            <div>
                <h1>Menu 菜单</h1>
                <h3>水平导航菜单</h3>
                <div className="k-example">
                    <Menu mode="horizontal">
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
                            <Menu.SubMenu
                                id="1-2"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>导航三</span>
                                    </span>
                                }
                            >
                                <Menu.Item id="6">
                                    <Icon type="github" />
                                    <span>选项五</span>
                                </Menu.Item>
                                <Menu.Item id="7">
                                    <Icon type="github" />
                                    <span>选项六</span>
                                </Menu.Item>
                            </Menu.SubMenu>
                        </Menu.SubMenu>
                    </Menu>
                </div>
                <h3>垂直菜单，子菜单内嵌在菜单区域。</h3>
                <div className="k-example">
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
                </div>
                <h3>垂直菜单，子菜单是弹出的形式。</h3>
                <div className="k-example">
                    <Menu style={{ width: 250 }} mode="vertical">
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
                </div>
                <h3>折叠菜单</h3>
                <div className="k-example">
                    <Menu style={{ width: 250 }} mode="inlineCollapsed">
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
                </div>
                <h1>API</h1>
                <h3>Menus</h3>
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
                            <td>defaultOpenIds</td>
                            <td>初始展开SubMenu菜单项id数组</td>
                            <td>string[]</td>
                            <td />
                        </tr>
                        <tr>
                            <td>defaultSelectedIds</td>
                            <td>初始选中菜单项id数组</td>
                            <td>string[]</td>
                            <td />
                        </tr>
                        <tr>
                            <td>inlineIndent</td>
                            <td>inline 模式的菜单缩进宽度</td>
                            <td>number</td>
                            <td>24</td>
                        </tr>
                        <tr>
                            <td>mode</td>
                            <td>
                                菜单模式，可选 'inline' 'vertical' 'horizontal'
                                'inlineCollapsed'
                            </td>
                            <td>string</td>
                            <td>'inline'</td>
                        </tr>
                        <tr>
                            <td>selectable</td>
                            <td>菜单是否可选中</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>multiple</td>
                            <td>是否可多选</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h3>Menus.Item</h3>
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
                            <td>id</td>
                            <td>唯一标识</td>
                            <td>string</td>
                            <td />
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
                <br />
                <h3>Menus.SubMenu</h3>
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
                            <td>id</td>
                            <td>唯一标识</td>
                            <td>string</td>
                            <td />
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>子菜单项值</td>
                            <td>string|ReactNode</td>
                            <td />
                        </tr>
                        <tr>
                            <td>children</td>
                            <td>子菜单菜单项</td>
                            <td>Array&lt;MenuItem|SubMenu&gt;</td>
                            <td />
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MenuView;
