```jsx
import React, { Component } from 'react';
import { Pagination } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-pagination">
        <Pagination total={200} />
      </div>
    );
  }
}

```
