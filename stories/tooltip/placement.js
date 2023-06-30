import React, { Component } from 'react';
import { Tooltip, Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-tooltip placement">
        <div style={{ marginLeft: 80 }}>
          <Tooltip placement="topLeft" title="tooltip text">
            <Button>TL</Button>
          </Tooltip>&nbsp;&nbsp;
          <Tooltip placement="top" title="tooltip text">
            <Button>Top</Button>
          </Tooltip>&nbsp;&nbsp;
          <Tooltip placement="topRight" title="tooltip text">
            <Button>TR</Button>
          </Tooltip>
        </div>
        <div style={{ width: 80, float: 'left' }}>
          <Tooltip placement="leftTop" title="tooltip text">
            <Button>LT</Button>
          </Tooltip>
          <Tooltip placement="left" title="tooltip text">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip placement="leftBottom" title="tooltip text">
            <Button>LB</Button>
          </Tooltip>
        </div>
        <div style={{ width: 80, marginLeft: 336 }}>
          <Tooltip placement="rightTop" title="tooltip text">
            <Button>RT</Button>
          </Tooltip>
          <Tooltip placement="right" title="tooltip text">
            <Button>Right</Button>
          </Tooltip>
          <Tooltip placement="rightBottom" title="tooltip text">
            <Button>RB</Button>
          </Tooltip>
        </div>
        <div style={{ marginLeft: 80, clear: 'both' }}>
          <Tooltip placement="bottomLeft" title="tooltip text">
            <Button>BL</Button>
          </Tooltip>&nbsp;&nbsp;
          <Tooltip placement="bottom" title="tooltip text">
            <Button>Bottom</Button>
          </Tooltip>&nbsp;&nbsp;
          <Tooltip placement="bottomRight" title="tooltip text">
            <Button>BR</Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}
