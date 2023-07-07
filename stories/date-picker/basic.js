import React, { Component } from 'react';
import { DatePicker, RangePicker } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-datepicker">
        <DatePicker />
        <br></br>
        <RangePicker showTime showToday/>
      </div>
    );
  }
}
