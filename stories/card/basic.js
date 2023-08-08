import React, { Component } from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import { Card } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-card">
        <Card title="Card title"  extra={<AiOutlineMore />} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    );
  }
}
