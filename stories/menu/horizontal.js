import React, { Component } from 'react';
import {
  AiOutlineAndroid,
  AiOutlineApple,
  AiOutlineGithub,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineWindows,
  AiOutlineAmazon,
} from 'react-icons/ai';
import { Menu, MenuItem, SubMenu } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-menu">
        <Menu mode="horizontal">
          <MenuItem key="1" icon={<AiOutlineHome />}>
            Menu 1
          </MenuItem>
          <SubMenu key="2" icon={<AiOutlineSetting />} title="Menu 2">
            <MenuItem key="2-1" icon={<AiOutlineAndroid />}>
              Android
            </MenuItem>
            <MenuItem key="2-2" icon={<AiOutlineApple />}>
              Apple
            </MenuItem>
            <MenuItem key="2-3" icon={<AiOutlineWindows />}>
              Windows
            </MenuItem>
            <SubMenu key="2-4" icon={<AiOutlineGithub />} title="gihub">
              <MenuItem key="2-4-1" icon={<AiOutlineAmazon />}>
                Amazon
              </MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
