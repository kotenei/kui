export default `import React, { Component } from 'react';
import { AutoComplete } from 'kui-react';
import { data } from '../../public/data';


export default class Demo extends Component {
  
  render() {
    this.dataSource = data.map((item) => {
      return { text: item, value: item };
    });

    return (
      <div className="story-demo-autocomplete">
        <AutoComplete placeholder="请输入a-z" dataSource={this.dataSource} />
      </div>
    );
  }
}
`