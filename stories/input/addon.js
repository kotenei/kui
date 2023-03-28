import React, { Component } from 'react';
import { AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import { Input } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-input">
        <Input addonBefore={<AiOutlineUser />} />
        <br />
        <Input addonAfter={<AiOutlineSearch />} />
      </div>
    );
  }
}
