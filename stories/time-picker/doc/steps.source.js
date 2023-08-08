export default `import React, { Component } from 'react';
import { TimePicker } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-timepicker">
        <TimePicker hourStep={2} minuteStep={5} secondStep={10} />
      </div>
    );
  }
}
`