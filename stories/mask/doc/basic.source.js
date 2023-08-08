export default `import React, { Component } from 'react';
import { Button, Mask, Loading } from 'kui-react';

export default class Demo extends Component {
  state = {
    show: false,
  };
  render() {
    return (
      <div className="story-demo-mask">
        <Button
          onClick={() => {
            this.setState({
              show: true,
            });
          }}
        >
          Show mask
        </Button>
        <Mask
          show={this.state.show}
          onClick={() => {
            this.setState({
              show: false,
            });
          }}
        >
          <Loading
            style={{
              position: 'absoluate',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
            color="primary"
            size="xl"
          />
        </Mask>
      </div>
    );
  }
}
`