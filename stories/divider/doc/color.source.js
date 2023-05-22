export default `import React, { Component } from 'react';
import { Divider } from 'kui-react';

const style = {
  marginBottom: 16,
};

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-divider">
        <p style={style}>
          <Divider color="primary" />
        </p>
        <p style={style}>
          <Divider color="info" />
        </p>
        <p style={style}>
          <Divider color="success" />
        </p>
        <p style={style}>
          <Divider color="warning" />
        </p>
        <p style={style}>
          <Divider color="danger" />
        </p>
      </div>
    );
  }
}
`