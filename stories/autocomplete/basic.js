import React, { Component } from 'react';
import { AutoComplete } from 'kui-react';
import { data } from '../../public/data';

export default class Demo extends Component {
  state = {
    dataSource: [],
  };
  onSearch = (text) => {
    const result = [];
    data.forEach((item) => {
      if (item.toLowerCase().indexOf(text.toLowerCase()) > -1) {
        result.push({ text: item, value: item });
      }
    });
    this.setState({
      dataSource: result,
    });
  };

  render() {
    return (
      <div className="story-demo-autocomplete">
        <AutoComplete
          placeholder="请输入a-z"
          dataSource={this.state.dataSource}
          onSearch={this.onSearch}
        />
      </div>
    );
  }
}
