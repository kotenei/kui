export default `import React, { Component } from 'react';
import { Calendar } from 'kui-react';

export default class Demo extends Component {
  render() {
    const now = new Date();
    return (
      <div className="story-demo-calendar">
        <Calendar/>
      </div>
    );
  }
}
`