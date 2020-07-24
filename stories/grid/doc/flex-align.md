```jsx
import React, { Component } from 'react';
import { Row, Col } from 'kui-react';

export default class Demo extends Component {
  render() {
    const rowStyle = { height: 100, background: '#fff' };
    return (
      <div className="story-demo-grid">
        <h4>top</h4>
        <Row align="top" justify="center" style={rowStyle}>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
        </Row>
        <h4>middle</h4>
        <Row align="middle" justify="space-around" style={rowStyle}>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
        </Row>
        <h4>bottom</h4>
        <Row align="bottom" justify="space-between" style={rowStyle}>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
          <Col span={4}>
            <div className="gutter-box">col-4</div>
          </Col>
        </Row>
      </div>
    );
  }
}

```
