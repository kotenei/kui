```jsx
import React, { Component } from 'react';
import { List, ListItem } from 'kui-react';

const data = ["List Item", "List Item", "List Item"];

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-list">
        <h4>Default Size</h4>
        <List bordered data={data} header="Header" footer="Footer" />
        <br />
        <h4>Small Size</h4>
        <List bordered data={data} size="sm" header="Header" footer="Footer" />
        <br />
        <h4>Large Size</h4>
        <List bordered data={data} size="lg" header="Header" footer="Footer" />
      </div>
    );
  }
}

```
