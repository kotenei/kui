```jsx
import React, { Component } from 'react';
import { AiFillCalendar, AiFillFolder } from 'react-icons/ai';
import { Avatar } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-avatar">
        <div style={{ marginBottom: 10 }}>
          <Avatar icon={<AiFillCalendar/>} size="sm" />
          <Avatar icon={<AiFillCalendar/>} />
          <Avatar icon={<AiFillCalendar/>} size="lg" />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Avatar src="https://avatars2.githubusercontent.com/u/3725164?s=460&v=4" size="sm">
            T
          </Avatar>
          <Avatar src="https://avatars2.githubusercontent.com/u/3725164?s=460&v=4">T</Avatar>
          <Avatar src="https://avatars2.githubusercontent.com/u/3725164?s=460&v=4" size="lg">
            T
          </Avatar>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Avatar color="primary" square size="sm">
            T
          </Avatar>
          <Avatar color="primary" square>
            T
          </Avatar>
          <Avatar color="primary" square size="lg">
            T
          </Avatar>
        </div>
      </div>
    );
  }
}

```
