import React, { Component } from 'react';
import { Pagination } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-pagination">
        <Pagination total={200} color="primary" />
        <Pagination total={200} color="info" />
        <Pagination total={200} color="warning" />
        <Pagination total={200} color="success" />
        <Pagination total={200} color="danger" />
      </div>
    );
  }
}
