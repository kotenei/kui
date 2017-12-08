import React, { Component } from 'react';
import Menu from '../components/Menu';
import Icon from '../components/Icon';


class MenuView extends Component {
    render() {
        return (
            <div>
                <h1>Menu 菜单</h1>
                <div className="k-example" >
                    <Menu style={{ width: 250 }}>
                        <Menu.Item key="1">
                            <Icon type="areachart" />
                            菜单1
                        </Menu.Item>
                        <Menu.SubMenu title={<span><Icon type="areachart" />菜单2</span>}>
                            <Menu.Item key="2">
                                <Icon type="calendar" />
                                子菜单
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            </div >
        )
    }
}

export default MenuView;