import React, { Component } from 'react';
import { Calendar } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-calendar">
        <h3>视图</h3>
        <br />
        <div style={{ display: 'flex' }}>
          <div>
            <h4>年</h4>
            <Calendar view="year" />
          </div>
          <div>
            <h4>月</h4>
            <Calendar view="month" />
          </div>
          <div>
            <h4>日</h4>
            <Calendar view="day" />
          </div>
          <div>
            <h4>周</h4>
            <Calendar view="week" />
          </div>
        </div>
      </div>
    );
  }
}
