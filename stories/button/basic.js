import React, { Component } from 'react';
import { Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-button">
        <Button>default</Button>

        <Button color="primary">primary</Button>

        <Button color="info">info</Button>

        <Button color="success">success</Button>

        <Button color="warning">warning</Button>

        <Button color="danger">danger</Button>

        <Button disabled>disabled</Button>
      </div>
    );
  }
}
