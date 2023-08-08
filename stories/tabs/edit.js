import React, { Component } from 'react';
import { Tabs, TabPanel, Button } from 'kui-react';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      tabs: [
        { title: 'tab1', content: 'tab1' },
        { title: 'tab2', content: 'tab2' },
        { title: 'tab3', content: 'tab3' },
      ],
    };
  }
  handleEdit = (e, action, index) => {
    const { tabs, activeIndex } = this.state;
    let activeKey = 0,
      len = tabs.length;
    if (action == 'add') {
      tabs.push({
        title: `new tab `,
        content: `new tab content`,
      });
      activeKey = tabs.length - 1;
    } else if (action == 'remove') {
      activeKey = activeIndex;
      let lastActiveIndex = index - 1;
      tabs.splice(index, 1);
      if (index <= activeIndex) {
        activeKey = activeIndex - 1;
      }
      if (activeKey < 0) {
        activeKey = 0;
      }
    }
    this.setState({
      activeIndex: activeKey,
      tabs,
    });
  };
  handleTabClick = (e, index) => {
    this.setState({
      activeIndex: index,
    });
  };
  renderTabs() {
    const { tabs } = this.state;
    let items = [];
    tabs.forEach((tab, index) => {
      items.push(
        <TabPanel key={index} tab={tab.title} disabled={tab.disabled}>
          {tab.content}
        </TabPanel>,
      );
    });
    return items;
  }
  render() {
    const { activeIndex } = this.state;
    return (
      <div className="story-demo-tabs">
        <Tabs
          editable
          onEdit={this.handleEdit}
          activeIndex={activeIndex}
          onTabClick={this.handleTabClick}
        >
          {this.renderTabs()}
        </Tabs>
      </div>
    );
  }
}
