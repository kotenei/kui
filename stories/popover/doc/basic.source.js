export default `import React, { Component } from 'react';
import { Popover, Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-popover">
        <Popover title="Title" content="Content" color="primary">
          <Button>Hover</Button>
        </Popover>
        <Popover title="Title" content="Content" trigger="click">
          <Button>Click</Button>
        </Popover>
      </div>
    );
  }
}
`