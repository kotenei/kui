import React, { Component } from 'react';
import { Checkbox } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-checkbox">
        <Checkbox label="Apple" />
        <Checkbox label="Windows" disabled/>
      </div>
    );
  }
}
