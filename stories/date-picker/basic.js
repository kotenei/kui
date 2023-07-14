import React, { Component } from 'react';
import { DatePicker, RangePicker } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-datepicker">
        <DatePicker defaultDate={new Date('2022-10-1')} />
        <br></br>
        <RangePicker view='year'  />
      </div>
    );
  }
}
