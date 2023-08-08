import React, { Component } from 'react';
import { Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-button">
        <Button color="primary"  size="xs" >
          xs button
        </Button>
        <Button color="primary"  size="sm">
          sm button
        </Button>
        <Button color="primary" >
          default
        </Button>
        <Button color="primary"  size="lg" >
          lg button
        </Button>
      </div>
    );
  }
}
