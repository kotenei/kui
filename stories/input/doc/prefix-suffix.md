```jsx
import React, { Component } from 'react';
import { AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import { Input } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-input">
        <Input prefix={<AiOutlineUser />} suffix={<AiOutlineSearch />} />
        <br />
        <Input suffix={<AiOutlineSearch />} />
      </div>
    );
  }
}

```
