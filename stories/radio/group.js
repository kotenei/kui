import React, { Component } from 'react';
import { RadioGroup } from 'kui-react';

const options = ['Apple', 'Pear', 'Orange'];

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-radio">
        <RadioGroup style={{ display: 'flex', alignItems: 'center' }} options={options} />
      </div>
    );
  }
}
