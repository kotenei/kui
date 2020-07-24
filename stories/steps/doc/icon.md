```jsx
import React, { Component } from 'react';
import { Steps, StepsItem } from 'kui-react';
import { AiOutlineUser, AiOutlineIdcard, AiOutlineSmile } from 'react-icons/ai';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-steps">
        <Steps current={1} status="process" >
          <StepsItem
            icon={<AiOutlineUser />}
            title="First"
            description="This is description! This is description! This is description! This is description! This is description! This is description! This is description! This is description! This is description! This is description! This is description! "
          />
          <StepsItem icon={<AiOutlineIdcard />} title="Second" description="This is description! " />
          <StepsItem icon={<AiOutlineSmile />} title="Finish" description="This is description! " />
        </Steps>
      </div>
    );
  }
}

```
