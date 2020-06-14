import React, { Component } from 'react';
import {
  AiFillEdit,
  AiFillDelete,
  AiFillApple,
  AiFillAndroid,
  AiFillWindows,
} from 'react-icons/ai';
import { List, ListItem, ListItemMeta } from 'kui-react';

const actions = [<AiFillEdit />, <AiFillDelete />];

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-list">
        <List bordered>
          <ListItem actions={actions}>
            <ListItemMeta
              avatar={<AiFillApple fontSize={24} />}
              title="List Item"
              description="Description"
            />
          </ListItem>
          <ListItem actions={actions}>
            <ListItemMeta
              avatar={<AiFillAndroid fontSize={24} />}
              title="List Item"
              description="Description"
            />
          </ListItem>
          <ListItem actions={actions}>
            <ListItemMeta
              avatar={<AiFillWindows fontSize={24} />}
              title="List Item"
              description="Description"
            />
          </ListItem>
        </List>
      </div>
    );
  }
}
