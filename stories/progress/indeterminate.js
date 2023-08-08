import React, { Component } from 'react';
import { Progress } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-progress">
        <h4>Indeterminate</h4>
        <Progress indeterminate />
      </div>
    );
  }
}
