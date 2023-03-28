import React, { Component } from 'react';
import { Input } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-input">
        <Input type="textarea" />
      </div>
    );
  }
}
