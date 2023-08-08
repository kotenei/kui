export default `import React, { Component } from 'react';
import { Progress } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-progress">
        <h4>Percent outside</h4>
        <Progress percent={10} color="primary" showText={false} />
        <Progress percent={40} color="warning" />
        <Progress percent={100} color="success" status="success" />
        <Progress percent={80} color="danger" status="error" />
      </div>
    );
  }
}
`