import React, { Component } from 'react';
import { Carousel } from 'kui-react';

const style = {
  background: '#364D79',
  height: 160,
  color: 'white',
  textAlign: 'center',
  lineHeight: '160px',
  fontSize: 24,
};

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-carousel">
        <Carousel style={{ height: 160 }}>
          <div style={style}>1</div>
          <div style={style}>2</div>
          <div style={style}>3</div>
        </Carousel>
      </div>
    );
  }
}
