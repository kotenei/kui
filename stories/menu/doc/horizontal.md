```jsx
import React, { Component } from 'react';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { Menu, MenuItem, Icon } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-menu">
        <Menu mode="horizontal">
          <MenuItem id="1">
            <Icon>
              <AiOutlineHome />
            </Icon>
            Menu 1
          </MenuItem>
          <MenuItem id="2">
            <Icon>
              <AiOutlineSetting />
            </Icon>
            Menu 2
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

```
