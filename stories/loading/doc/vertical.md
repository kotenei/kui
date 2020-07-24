```jsx
import React, { Component } from 'react';
import { Loading } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-loading">
        <Loading tip="Loading..." vertical/>
      </div>
    );
  }
}

```
