```jsx
import React, { Component } from 'react';
import { Button } from 'kui-react';
import { AiFillSetting, AiOutlineSearch } from 'react-icons/ai';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-button">
        <Button icon={<AiOutlineSearch />}>Search</Button>&nbsp;&nbsp;
        <Button icon={<AiFillSetting />}>setting</Button>
      </div>
    );
  }
}

```
