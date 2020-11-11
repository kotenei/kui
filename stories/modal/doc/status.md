```jsx
import React, { Component } from 'react';
import {  modal, Button } from 'kui-react';

function confirm() {
  modal.confirm({
    header: 'This is title',
    content: <div>This is content.</div>,
    onOK() {
      console.log('ok');
    },
    onCancel() {
      console.log('cancel');
    },
  });
}

function info() {
  modal.info({
    header: 'This is title',
    content: <div>This is content.</div>,
    onOK() {
      console.log('ok');
    },
  });
}

function success() {
  modal.success({
    header: 'This is title',
    content: <div>This is content.</div>,
    onOK() {
      console.log('ok');
    },
  });
}

function warning() {
  modal.warning({
    header: 'This is title',
    content: <div>This is content.</div>,
    onOK() {
      console.log('ok');
    },
  });
}

function error() {
  modal.error({
    header: 'This is title',
    content: <div>This is content.</div>,
    onOK() {
      console.log('ok');
    },
  });
}

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-modal">
        <Button color="primary" onClick={confirm}>
          confirm
        </Button>
        &nbsp;&nbsp;
        <Button color="info" onClick={info}>
          Info
        </Button>
        &nbsp;&nbsp;
        <Button color="success" onClick={success}>
          Success
        </Button>
        &nbsp;&nbsp;
        <Button color="warning" onClick={warning}>
          Warning
        </Button>
        &nbsp;&nbsp;
        <Button color="danger" onClick={error}>
          Error
        </Button>
      </div>
    );
  }
}

```
