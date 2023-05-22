export default `import React, { Component } from 'react';
import { Radio } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-radio">
        <Radio label="default" />
        <Radio label="primary" color="primary" />
        <Radio label="info" color="info" />
        <Radio label="success" color="success" />
        <Radio label="warning" color="warning" />
        <Radio label="danger" color="danger" />
      </div>
    );
  }
}
`