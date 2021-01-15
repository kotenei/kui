```jsx
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
import { Dropdown, Menu, MenuItem, SubMenu, Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    const menu = (
      <Menu>
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
    );
    return (
      <div className="story-demo-dropdown" style={{ padding: 80 }}>
        <Dropdown menu={menu} placement="bottomLeft">
          <Button>bottomLeft</Button>
        </Dropdown>
        &nbsp;&nbsp;
        <Dropdown menu={menu} placement="bottom">
          <Button>bottomCenter</Button>
        </Dropdown>
        &nbsp;&nbsp;
        <Dropdown menu={menu} placement="bottomRight">
          <Button>bottomRight</Button>
        </Dropdown>
        &nbsp;&nbsp;
        <Dropdown menu={menu} placement="topLeft">
          <Button>topLeft</Button>
        </Dropdown>
        &nbsp;&nbsp;
        <Dropdown menu={menu} placement="top">
          <Button>topCenter</Button>
        </Dropdown>
        &nbsp;&nbsp;
        <Dropdown menu={menu} placement="topRight">
          <Button>topRight</Button>
        </Dropdown>
      </div>
    );
  }
}

```
