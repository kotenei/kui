```jsx
import React, { Component } from 'react';
import { Modal, Button } from 'kui-react';

function confirm() {
  Modal.confirm({
    header: '这是消息标题',
    content: <div>这里是提示消息</div>,
    onOK() {
      console.log('ok');
    },
    onCancel() {
      console.log('cancel');
    },
  });
}

function info() {
  Modal.info({
    header: '这是消息标题',
    content: <div>这里是提示消息</div>,
    onOK() {
      console.log('ok');
    },
  });
}

function success() {
  Modal.success({
    header: '这是消息标题',
    content: <div>这里是提示消息</div>,
    onOK() {
      console.log('ok');
    },
  });
}

function warning() {
  Modal.warning({
    header: '这是消息标题',
    content: <div>这里是提示消息</div>,
    onOK() {
      console.log('ok');
    },
  });
}

function error() {
  Modal.error({
    header: '这是消息标题',
    content: <div>这里是提示消息</div>,
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
