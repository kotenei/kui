import React, { Component } from 'react';
import { message, Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-message">
        <Button
          onClick={() => {
            message.loading('This is content', () => {
              alert('Loading completed');
            });
          }}
        >
          Loading
        </Button>
        <Button
          color="info"
          onClick={() => {
            message.info('This is content');
          }}
        >
          Info
        </Button>
        <Button
          color="success"
          onClick={() => {
            message.success('This is content');
          }}
        >
          Success
        </Button>
        <Button
          color="warning"
          onClick={() => {
            message.warning('This is content');
          }}
        >
          Warning
        </Button>
        <Button
          color="danger"
          onClick={() => {
            message.error('This is content');
          }}
        >
          Error
        </Button>
      </div>
    );
  }
}
