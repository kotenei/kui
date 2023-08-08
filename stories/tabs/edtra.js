import React, { Component } from 'react';
import { Tabs, TabPanel, Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-tabs">
        <Tabs  extraContent={<Button size="sm">Extra</Button>}>
          <TabPanel tab="Tab 1">Tab 1</TabPanel>
          <TabPanel tab="Tab 2">Tab 2</TabPanel>
          <TabPanel tab="Tab 3">Tab 3</TabPanel>
        </Tabs>
      </div>
    );
  }
}
