export default `import React, { Component } from 'react';
import { Popconfirm, Button, message } from 'kui-react';

export default class Demo extends Component {
  onCacnel = () => {
    message.error('click cancel');
  };
  onConfirm = () => {
    message.info('click confirm');
  };
  render() {
    return (
      <div className="story-demo-popconfirm">
        <Popconfirm
          title="Are you sure?"
          placement="right"
          onCancel={this.onCacnel}
          onConfirm={this.onConfirm}
        >
          <Button>Delete</Button>
        </Popconfirm>
      </div>
    );
  }
}
`