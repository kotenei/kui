export default `import React, { Component } from 'react';
import { AiFillCalendar, AiFillFolder } from 'react-icons/ai';
import { Avatar } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-avatar">
        <Avatar icon={<AiFillCalendar />} square/>
        <Avatar square color="danger" icon={<AiFillFolder />} square/>
        <Avatar color="primary" square>T</Avatar>
        <Avatar src="https://avatars2.githubusercontent.com/u/3725164?s=460&v=4" square/>
      </div>
    );
  }
}
`