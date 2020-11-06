import React, { Component } from 'react';
import { Tabs, TabPanel } from 'kui-react';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabPosition: 'top',
    };
  }
  handleChange = e => {
    this.setState({
      tabPosition: e.target.value,
    });
  };
  render() {
    const { tabPosition } = this.state;
    return (
      <div className="story-demo-tabs">
        <select
          className="k-form-control"
          style={{ width: 80 }}
          onChange={this.handleChange}
          value={tabPosition}
        >
          <option value="left">left</option>
          <option value="top">top</option>
          <option value="right">right</option>
          <option value="bottom">bottom</option>
        </select>
        <br /><br />
        <Tabs tabPosition={tabPosition} style={{ height: 200 }} type="card">
          <TabPanel tab="Tab 1">Tab 1</TabPanel>
          <TabPanel tab="Tab 2">Tab 2</TabPanel>
          <TabPanel tab="Tab 3">Tab 3</TabPanel>
          <TabPanel tab="Tab 4">Tab 4</TabPanel>
          <TabPanel tab="Tab 5">Tab 5</TabPanel>
        </Tabs>
      </div>
    );
  }
}
