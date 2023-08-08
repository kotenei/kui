export default `import React, { Component } from 'react';
import { Rate } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-rate">
        <Rate allowHalf defaultValue={1.5}/>
      </div>
    );
  }
}
`