export default `import React, { Component } from 'react';
import { Radio } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-radio">
        <Radio label="Apple" />
        <Radio label="Windows" disabled/>
        <Radio label="Android" checked disabled/>
      </div>
    );
  }
}
`