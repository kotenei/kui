```jsx
import React, { Component } from 'react';
import { Loading } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-loading">
        <Loading color="primary" size="xs"/>
        <Loading color="info" size="sm"/>
        <Loading color="warning"/>
        <Loading color="success" size="lg"/>
        <Loading color="danger" size="xl"/>
      </div>
    );
  }
}

```
