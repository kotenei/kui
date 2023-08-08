export default `import React, { Component } from 'react';
import { Slider } from 'kui-react';

export default class Demo extends Component {
  render() {
    const marks = {
      22: '22',
      40: '40',
      100: {
        style: { color: '#f50' },
        label: <strong>100</strong>,
      },
    };
    return (
      <div className="story-demo-slider" style={{ height: 200, paddingTop: 50 }}>
        <Slider defaultValue={10} marks={marks} vertical />
      </div>
    );
  }
}
`