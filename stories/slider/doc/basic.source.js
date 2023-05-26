export default `import React, { Component } from 'react';
import { Slider } from 'kui-react';

export default class Demo extends Component {
  render() {

    return (
      <div className="story-demo-slider" style={{ height: 200 }}>
        <Slider range defaultValue={[5, 10]}  />
      </div>
    );
  }
}
`