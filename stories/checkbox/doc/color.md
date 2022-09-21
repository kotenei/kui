```jsx
import React, { Component } from 'react';
import { Checkbox } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-checkbox">
        <Checkbox label="default" />
        <Checkbox label="primary" color="primary" />
        <Checkbox label="info" color="info" />
        <Checkbox label="success" color="success" />
        <Checkbox label="warning" color="warning" />
        <Checkbox label="danger" color="danger" />
      </div>
    );
  }
}

```
