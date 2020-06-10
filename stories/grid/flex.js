import React, { Component } from 'react';
import { Row, Col } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-grid">
        <h4>start</h4>
        <Row justify="start">
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
        <h4>center</h4>
        <Row justify="center">
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
        <h4>end</h4>
        <Row justify="end">
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
        <h4>Space Around</h4>
        <Row justify="space-around">
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
        <h4>Space Between</h4>
        <Row justify="space-between">
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
