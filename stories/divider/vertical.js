import React, { Component } from 'react';
import { Divider } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-divider">
        <div style={{height:100}}>
          <Divider direction="vertical" />
        </div>
      </div>
    );
  }
}
