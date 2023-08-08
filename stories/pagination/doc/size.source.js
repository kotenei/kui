export default `import React, { Component } from 'react';
import { Pagination } from 'kui-react';

export default class Demo extends Component {
  state = {
    pageIndex: 0,
  };
  render() {
    return (
      <div className="story-demo-pagination">
        <Pagination total={200} size="sm" />
        <Pagination total={200}/>
        <Pagination
          total={200}
          size="lg"
          pageIndex={this.state.pageIndex}
          onChange={(pageIndex, pageSize) => {
            this.setState({
              pageIndex,
            });
          }}
        />
      </div>
    );
  }
}
`