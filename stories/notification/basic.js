import React, { Component } from 'react';
import { notification, Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-notification">
        <Button
          onClick={() => {
            notification.open('This is title', 'This is content This is content This is content');
          }}
        >
          Default
        </Button>
        <Button
          color="info"
          onClick={() => {
            notification.info('This is title', 'This is content This is content This is content');
          }}
        >
          Info
        </Button>
        <Button
          color="success"
          onClick={() => {
            notification.success(
              'This is title',
              'This is content This is content This is content',
            );
          }}
        >
          Success
        </Button>
        <Button
          color="warning"
          onClick={() => {
            notification.warning(
              'This is title',
              'This is content This is content This is content',
            );
          }}
        >
          Warning
        </Button>
        <Button
          color="danger"
          onClick={() => {
            notification.error('This is title', 'This is content This is content This is content');
          }}
        >
          Error
        </Button>
      </div>
    );
  }
}
