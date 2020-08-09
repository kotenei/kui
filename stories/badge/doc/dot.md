```jsx
import React, { Component } from 'react';
import { Badge } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-badge">
        <Badge dot color="danger">
          <a
            href="###"
            style={{
              width: 42,
              height: 42,
              borderRadius: 4,
              background: '#eee',
              display: 'inline-block',
            }}
          />
        </Badge>
        <Badge text={11} overflowCount={10}>
          <a
            href="###"
            style={{
              width: 42,
              height: 42,
              borderRadius: 4,
              background: '#eee',
              display: 'inline-block',
            }}
          />
        </Badge>
      </div>
    );
  }
}

```
