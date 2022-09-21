```jsx
import React, { Component } from 'react';
import { CheckboxGroup } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-checkbox">
        <CheckboxGroup options={['one', 'two', 'three', 'four']} />
      </div>
    );
  }
}

```
