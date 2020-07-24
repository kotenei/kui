```jsx
import React, { Component } from 'react';
import { Steps, StepsItem } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-steps">
        <Steps current={1} status="process" direction="vertical">
          <StepsItem
            title="First"
            description="This is description! This is description! This is description! This is description! This is description! This is description! This is description! This is description! This is description! This is description! This is description! "
          />
          <StepsItem title="Second" description="This is description! " />
          <StepsItem title="Finish" description="This is description! " />
        </Steps>
      </div>
    );
  }
}

```
