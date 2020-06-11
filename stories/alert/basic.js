import React, { Component } from 'react';
import { Alert } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-alert">
        <Alert
          state="info"
          showIcon={true}
          closable
          title="Info Text"
          description="Info Description Info Description Info Description Info Description Info Description Info Description Info Description"
          onClose={this.handleClose}
        />
        <Alert
          state="success"
          showIcon={true}
          closable
          title="Success Text"
          closeText="OK"
          description="Success Description Success Description Success Description Success Description Success Description Success Description Success Description"
          onClose={this.handleOK}
        />
        <Alert
          state="warning"
          showIcon={true}
          closable
          title="Warning Text"
          description="Warning Description Warning Description Warning Description Warning Description Warning Description Warning Description Warning Description"
          onClose={this.handleClose}
        />
        <Alert
          state="danger"
          showIcon={true}
          closable
          title="Danger Text"
          description="Danger Description Danger Description Danger Description Danger Description Danger Description Danger Description Danger Description"
          onClose={this.handleClose}
        />
      </div>
    );
  }
  handleClose = () => {
    return true;
  };
  handleOK = () => {
    alert('you click ok');
    return false;
  };
}
