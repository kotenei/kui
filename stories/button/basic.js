import React, { Component } from 'react';
import { Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-button">
        <h4>Normal</h4>
        <div>
          <Button>default</Button>
          <Button color="primary">primary</Button>
          <Button color="info">info</Button>
          <Button color="success">success</Button>
          <Button color="warning">warning</Button>
          <Button color="danger">danger</Button>
        </div>
        <br />
        <h4>Disabled</h4>
        <div>
          <Button disabled>default</Button>
          <Button color="primary" disabled>
            primary
          </Button>
          <Button color="info" disabled>
            info
          </Button>
          <Button color="success" disabled>
            success
          </Button>
          <Button color="warning" disabled>
            warning
          </Button>
          <Button color="danger" disabled>
            danger
          </Button>
        </div>
      </div>
    );
  }
}
