```jsx
import React, { Component } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { List, ListItem } from 'kui-react';

const actions = [<AiFillEdit />, <AiFillDelete />];

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-list">
        <List bordered>
          <ListItem actions={actions}>List Item</ListItem>
          <ListItem actions={actions}>List Item</ListItem>
          <ListItem actions={actions}>List Item</ListItem>
        </List>
      </div>
    );
  }
}

```
