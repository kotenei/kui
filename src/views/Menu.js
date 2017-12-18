import React, { Component } from 'react';
import Menu from '../components/Menu';
import Icon from '../components/Icon';


class MenuView extends Component {
    render() {
        return (
            <div>
                <h1>Menu 菜单</h1>
                <div className="k-example" >
                    <Menu style={{width:250}} mode="inline" inlineCollapsed >
                        <Menu.Item id="1">
                            <Icon type="areachart" />
                            <span>菜单1</span>
                        </Menu.Item>
                        <Menu.SubMenu id="1-1" title={<span><Icon type="areachart" />菜单2</span>}>
                            <Menu.Item id="2">
                                <Icon type="calendar" />
                                子菜单
                            </Menu.Item>
                            <Menu.SubMenu id="1-2" title={<span><Icon type="areachart" />菜单2</span>}>
                                <Menu.Item id="3">
                                    <Icon type="calendar" />
                                    子菜单
                            </Menu.Item>
                                <Menu.Item id="4">
                                    <Icon type="calendar" />
                                    子菜单
                            </Menu.Item>
                            </Menu.SubMenu>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            </div >
        )
    }
}

export default MenuView;