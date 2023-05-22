export default `import React, { Component } from 'react';
import { Modal, Button } from 'kui-react';

export default class Demo extends Component {
  state = {
    open: false,
  };
  showModal = () => {
    this.setState({
      open: true,
    });
  };
  handleCancel = e => {
    this.setState({
      open: false,
    });
  };
  handleOK = e => {
    this.setState({
      open: false,
    });
  };
  render() {
    return (
      <div className="story-demo-modal">
        <Button color="primary" onClick={this.showModal}>
          open
        </Button>
        <Modal
          open={this.state.open}
          header="Title"
          content="This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content.This is content."
          onOK={this.handleOK}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}
`