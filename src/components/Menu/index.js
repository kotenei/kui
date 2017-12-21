import React from 'react';
import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuItemGroup from './MenuItemGroup';
import SubMenu from './SubMenu';
import Divider from '../Divider';

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = MenuItemGroup;
Menu.Divider = (props) => (<Divider component="li" {...props} />);

export default Menu;