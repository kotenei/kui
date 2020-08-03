```jsx
import React, { Component } from 'react';
import { Tooltip, Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-tooltip">
        <div style={{ marginLeft: 60 }}>
          <Tooltip placement="topLeft" title="tooltip text">
            <Button>上左</Button>
          </Tooltip>
          <Tooltip placement="top" title="tooltip text">
            <Buttona>上边</Buttona>
          </Tooltip>
          <Tooltip placement="topRight" title="tooltip text">
            <Button>上右</Button>
          </Tooltip>
        </div>
        <div style={{ width: 60, float: 'left' }}>
          <Tooltip placement="leftTop" title="tooltip text">
            <Button>左上</Button>
          </Tooltip>
          <Tooltip placement="left" title="tooltip text">
            <Button>左边</Button>
          </Tooltip>
          <Tooltip placement="leftBottom" title="tooltip text">
            <Button>左下</Button>
          </Tooltip>
        </div>
        <div style={{ width: 60, marginLeft: 270 }}>
          <Tooltip placement="rightTop" title="tooltip text">
            <Button>右上</Button>
          </Tooltip>
          <Tooltip placement="right" title="tooltip text">
            <Button>右边</Button>
          </Tooltip>
          <Tooltip placement="rightBottom" title="tooltip text">
            <Button>右下</Button>
          </Tooltip>
        </div>
        <div style={{ marginLeft: 60, clear: 'both' }}>
          <Tooltip placement="bottomLeft" title="tooltip text">
            <Button>下左</Button>
          </Tooltip>
          <Tooltip placement="bottom" title="tooltip text">
            <Button>下边</Button>
          </Tooltip>
          <Tooltip placement="bottomRight" title="tooltip text">
            <Button>下右</Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

```
