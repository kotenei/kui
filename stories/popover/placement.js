import React, { Component } from 'react';
import { Popover, Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-popover placement">
        <div style={{ marginLeft: 80 }}>
          <Popover placement="topLeft" title="Title" content="content">
            <Button>TL</Button>
          </Popover>
          <Popover placement="top" title="Title" content="content">
            <Button>Top</Button>
          </Popover>
          <Popover placement="topRight" title="Title" content="content">
            <Button>TR</Button>
          </Popover>
        </div>
        <div style={{ width: 80, float: 'left' }}>
          <Popover placement="leftTop" title="Title" content="content">
            <Button>LT</Button>
          </Popover>
          <Popover placement="left" title="Title" content="content">
            <Button>Left</Button>
          </Popover>
          <Popover placement="leftBottom" title="Title" content="content">
            <Button>LB</Button>
          </Popover>
        </div>
        <div style={{ width: 80, marginLeft: 336 }}>
          <Popover placement="rightTop" title="Title" content="content">
            <Button>RT</Button>
          </Popover>
          <Popover placement="right" title="Title" content="content">
            <Button>Right</Button>
          </Popover>
          <Popover placement="rightBottom" title="Title" content="content">
            <Button>RB</Button>
          </Popover>
        </div>
        <div style={{ marginLeft: 80, clear: 'both' }}>
          <Popover placement="bottomLeft" title="Title" content="content">
            <Button>BL</Button>
          </Popover>
          <Popover placement="bottom" title="Title" content="content">
            <Button>Bottom</Button>
          </Popover>
          <Popover placement="bottomRight" title="Title" content="content">
            <Button>BR</Button>
          </Popover>
        </div>
      </div>
    );
  }
}
