```jsx
import React, { Component } from 'react';
import { Checkbox, CheckboxGroup } from 'kui-react';

const options = ['one', 'two', 'three', 'four'];

export default class Demo extends Component {
  state = {
    indeterminate: false,
    checkAll: false,
    checkedList: [],
  };
  handleCheckAll = (e) => {
    this.setState({
      checkAll: !this.state.checkAll,
      indeterminate: false,
      checkedList: e.target.checked ? options : [],
    });
  };
  handleChange = (checkedList) => {
    this.setState({
      checkAll: checkedList.length == options.length,
      indeterminate: checkedList.length > 0 && checkedList.length != options.length,
      checkedList,
    });
  };
  render() {
    const { checkAll, checkedList, indeterminate } = this.state;

    return (
      <div
        className="story-demo-checkbox"
        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <Checkbox checked={checkAll} indeterminate={indeterminate} onChange={this.handleCheckAll}>
          全选
        </Checkbox>
        <CheckboxGroup
          style={{ display: 'flex', alignItems: 'center' }}
          options={options}
          value={checkedList}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

```
