```jsx
import React, { Component } from "react";
import { Tabs } from "kui-react";

const TabPane = Tabs.TabPane;

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            tabs: [
                { title: "tab1", content: "tab1" },
                { title: "tab2", content: "tab2" },
                { title: "tab3", content: "tab3" }
            ]
        };
    }
    handleTabClick = (e, index) => {
        this.setState({
            activeIndex: index
        });
    };
    handleEdit = (e, action, index) => {
        const { tabs, activeIndex } = this.state;
        let activeKey = 0,
            len = tabs.length;
        if (action == "add") {
            tabs.push({
                title: `new tab `,
                content: `new tab content`
            });
            activeKey = tabs.length - 1;
        } else if (action == "remove") {
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
            tabs
        });
    };
    renderTabs() {
        const { tabs } = this.state;
        let items = [];
        tabs.forEach((tab, index) => {
            items.push(
                <TabPane key={index} tab={tab.title}>
                    {tab.content}
                </TabPane>
            );
        });
        return items;
    }
    render() {
        const { tabs, activeIndex } = this.state;
        return (
            <Tabs
                type="card"
                editable
                onEdit={this.handleEdit}
                activeIndex={activeIndex}
                onTabClick={this.handleTabClick}
            >
                {this.renderTabs()}
            </Tabs>
        );
    }
}

```
