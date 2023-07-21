export default `import React, { Component } from 'react';
import { AutoComplete } from 'kui-react';
import { data } from '../../public/data';

export default class Demo extends Component {
  state = {
    dataSource: [],
  };
  onSearch = (val) => {
    let result = [];
    data.forEach((item) => {
      if (val && item.toLowerCase().indexOf(val.toLowerCase()) != -1) {
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
`