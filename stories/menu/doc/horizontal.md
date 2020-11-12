```jsx
import React, { Component } from 'react';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { Menu, MenuItem } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-menu">
        <Menu mode="horizontal">
          <MenuItem id="1" icon={<AiOutlineHome />}>
            Menu 1
          </MenuItem>
          <MenuItem id="2" icon={<AiOutlineSetting />}>
            Menu 2
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

```
