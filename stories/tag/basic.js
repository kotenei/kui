import React, { Component } from 'react';
import { Tag } from 'kui-react';

export default class Demo extends Component {
  handleClose = () => {
    return true;
  };
  render() {
    return (
      <div className="story-demo-tag">
        <Tag closable color="primary" onClose={this.handleClose}>
          primary
        </Tag>
        <Tag closable color="info" onClose={this.handleClose}>
          info
        </Tag>
        <Tag closable color="success" onClose={this.handleClose}>
          success
        </Tag>
        <Tag closable color="warning" onClose={this.handleClose}>
          warning
        </Tag>
        <Tag closable color="danger" onClose={this.handleClose}>
          danger
        </Tag>
      </div>
    );
  }
}
