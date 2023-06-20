export default `import React, { Component } from 'react';
import { ValidationMsg } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-validation-msg">
        <h4>Warning</h4>
        <ValidationMsg message="message example" />
        <br /><br />
        <h4>Success</h4>
        <ValidationMsg message="message example" type="success" />
        <br /><br />
        <h4>Info</h4>
        <ValidationMsg message="message example" type="info" />
        <br /><br />
        <h4>Error</h4>
        <ValidationMsg message="message example" type="error" />
        <br /><br />
        <h4>Warning with description</h4>
        <ValidationMsg
          message="warning message example"
          description="warning description example"
        />
        <br /><br />
        <h4>Without Icon</h4>
        <ValidationMsg showIcon={false} message="message example" />
      </div>
    );
  }
}
`