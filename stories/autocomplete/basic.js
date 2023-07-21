import React, { Component } from 'react';
import { AutoComplete } from 'kui-react';
import { data } from '../../public/data';

const tmpSource = [
  { text: 'Option 1', value: '1' },
  { text: 'Option 2', value: '2' },
  { text: 'Option 3', value: '3' },
];

export default class Demo extends Component {
  state = {
    dataSource: tmpSource,
    value: '2',
  };
  onSearch = (text) => {
    console.log(text,'kkkkkk')
    let result = [];
    // data.forEach((item) => {
    //   if (val && item.toLowerCase().indexOf(val.toLowerCase()) != -1) {
    //     result.push({ text: item, value: item });
    //   }
    // });
    tmpSource.forEach((item) => {
      if (text && item.text.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1) {
        result.push(item);
      }
    });
    this.setState({
      dataSource: result,
    });
  };
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    return (
      <div className="story-demo-autocomplete">
        <AutoComplete
          placeholder="请输入a-z"
          dataSource={this.state.dataSource}
          value={this.state.value}
          onSearch={this.onSearch}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
