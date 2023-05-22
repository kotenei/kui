export default `import React, { Component } from 'react';
import { Loading } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-loading">
        <Loading color="primary"/>
        <Loading color="info"/>
        <Loading color="warning"/>
        <Loading color="success"/>
        <Loading color="danger"/>
      </div>
    );
  }
}
`