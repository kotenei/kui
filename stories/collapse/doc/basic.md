```jsx
import React, { Component } from 'react';
import { Collapse, CollapsePanel } from 'kui-react';

const text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-collapse">
        <Collapse>
          <CollapsePanel header="This is panel header 1" id="1">
            <p>{text}</p>
          </CollapsePanel>
          <CollapsePanel header="This is panel header 2" id="2">
            <p>{text}</p>
          </CollapsePanel>
          <CollapsePanel header="This is panel header 3" id="3" disabled>
            <p>{text}</p>
          </CollapsePanel>
        </Collapse>
      </div>
    );
  }
}

```
