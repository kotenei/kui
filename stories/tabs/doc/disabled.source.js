export default `import React, { Component } from 'react';
import { Tabs, TabPanel } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-tabs">
        <Tabs >
          <TabPanel tab="Tab 1">Tab 1</TabPanel>
          <TabPanel tab="Tab 2" disabled>Tab 2</TabPanel>
          <TabPanel tab="Tab 3">Tab 3</TabPanel>
        </Tabs>
      </div>
    );
  }
}
`