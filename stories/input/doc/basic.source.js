export default `import React, { Component } from 'react';
import { Input } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-input">
        <Input size="sm" placeholder="Small size"  />
        <br />
        <Input  placeholder="Default size"/>
        <br />
        <Input size="lg" placeholder="Large size"/>
      </div>
    );
  }
}
`