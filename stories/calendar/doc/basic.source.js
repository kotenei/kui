export default `import React, { Component } from 'react';
import { addDays } from 'date-fns';
import { Calendar } from 'kui-react';

export default class Demo extends Component {
  render() {
    const now = new Date();
    return (
      <div className="story-demo-calendar">
        <Calendar view="week" minDate={addDays(now, -10)} maxDate={now}/>
      </div>
    );
  }
}
`