import React, { Component } from 'react';
import { Rate } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-rate">
        <Rate disabled defaultValue={2}/>
      </div>
    );
  }
}
