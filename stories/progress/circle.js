import React, { Component } from 'react';
import { Progress } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-progress">
        <h4>Circle</h4>
        <Progress percent={30} type="circle" strokeWidth={10} />
        <Progress percent={60} color="primary" type="circle" strokeWidth={10} />
        <Progress percent={100} type="circle" status="success" strokeWidth={10} />
        <Progress percent={70} type="circle" status="error" strokeWidth={10} />
      </div>
    );
  }
}
