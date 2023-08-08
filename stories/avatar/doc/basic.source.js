export default `import React, { Component } from 'react';
import { AiFillCalendar, AiFillFolder } from 'react-icons/ai';
import { Avatar } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-avatar">
        <Avatar icon={<AiFillCalendar />} />
        <Avatar square color="danger" icon={<AiFillFolder />} />
        <Avatar color="primary">T</Avatar>
        <Avatar src="https://avatars2.githubusercontent.com/u/3725164?s=460&v=4" />
      </div>
    );
  }
}
`