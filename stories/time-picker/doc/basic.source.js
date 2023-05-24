export default `import React, { Component } from 'react';
import { TimePicker } from 'kui-react';

export default class Demo extends Component {
  state = {
    val: '12:00:00 AM',
  };
  render() {
    return (
      <div className="story-demo-timepicker">
        <TimePicker size="sm"/>
        <br />
        <TimePicker use12Hours value={this.state.val} onChange={(val) => this.setState({ val })} />
        <br />
        <TimePicker disabled value="12:00:00 AM" size="lg"/>
      </div>
    );
  }
}
`