export default `import React, { Component } from 'react';
import { Row, Col } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-grid">
        <Row>
          <Col span={12}>
            <div className="gutter-box">col-12</div>
          </Col>
          <Col span={12}>
            <div className="gutter-box">col-12</div>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <div className="gutter-box">col-8</div>
          </Col>
          <Col span={8}>
            <div className="gutter-box">col-8</div>
          </Col>
          <Col span={8}>
            <div className="gutter-box">col-8</div>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
        </Row>
      </div>
    );
  }
}
`