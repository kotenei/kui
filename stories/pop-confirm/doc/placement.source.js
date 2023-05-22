export default `import React, { Component } from 'react';
import { Popconfirm, Button, message } from 'kui-react';

export default class Demo extends Component {
  onCancel = () => {
    message.error('click cancel');
  };
  onConfirm = () => {
    message.info('click confirm');
  };
  render() {
    return (
      <div className="story-demo-popconfirm placement">
        <div style={{ marginLeft: 80 }}>
          <Popconfirm
            placement="topLeft"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>TL</Button>
          </Popconfirm>
          <Popconfirm
            placement="top"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>Top</Button>
          </Popconfirm>
          <Popconfirm
            placement="topRight"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>TR</Button>
          </Popconfirm>
        </div>
        <div style={{ width: 80, float: 'left' }}>
          <Popconfirm
            placement="leftTop"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>LT</Button>
          </Popconfirm>
          <Popconfirm
            placement="left"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>Left</Button>
          </Popconfirm>
          <Popconfirm
            placement="leftBottom"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>LB</Button>
          </Popconfirm>
        </div>
        <div style={{ width: 80, marginLeft: 336 }}>
          <Popconfirm
            placement="rightTop"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>RT</Button>
          </Popconfirm>
          <Popconfirm
            placement="right"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>Right</Button>
          </Popconfirm>
          <Popconfirm
            placement="rightBottom"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>RB</Button>
          </Popconfirm>
        </div>
        <div style={{ marginLeft: 80, clear: 'both' }}>
          <Popconfirm
            placement="bottomLeft"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>BL</Button>
          </Popconfirm>
          <Popconfirm
            placement="bottom"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>Bottom</Button>
          </Popconfirm>
          <Popconfirm
            placement="bottomRight"
            title="Are you sure to delete this row?"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          >
            <Button>BR</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
}
`