import React, { Component } from 'react';
import { Rate } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-rate">
        <Rate character="好" allowHalf />
      </div>
    );
  }
}
