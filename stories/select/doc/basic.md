```jsx
import React, { Component } from 'react';
import { Select, SelectOption } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-select">
        <Select placeholder="哈哈" multiple>
          <SelectOption key="选项一" value="选项一">选项一</SelectOption>
          <SelectOption key="选项二" value="选项二">选项二</SelectOption>
          <SelectOption key="选项三" value="选项三">选项三</SelectOption>
        </Select>
      </div>
    );
  }
}

```
