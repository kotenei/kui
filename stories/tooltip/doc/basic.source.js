export default `import React, { Component } from 'react';
import { Tooltip, Button } from 'kui-react';

const style = {
  marginRight: '1em',
  marginBottom: '1em',
};

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-tooltip">
        <Tooltip title="tooltip text">
          <Button style={style} >default</Button>
        </Tooltip>
        <Tooltip title="tooltip text" color="primary">
          <Button style={style}>primary</Button>
        </Tooltip>
        <Tooltip title="tooltip text" color="info">
          <Button style={style}>info</Button>
        </Tooltip>
        <Tooltip title="tooltip text" color="success">
          <Button style={style}>success</Button>
        </Tooltip>
        <Tooltip title="tooltip text" color="warning">
          <Button style={style}>warning</Button>
        </Tooltip>
        <Tooltip title="tooltip text" color="danger">
          <Button style={style}>danger</Button>
        </Tooltip>
        <Tooltip title="tooltip text" trigger="click">
          <Button style={style}>click</Button>
        </Tooltip>
      </div>
    );
  }
}
`