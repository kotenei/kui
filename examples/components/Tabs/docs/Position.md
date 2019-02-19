```jsx
import React, { Component } from "react";
import { Tabs } from "kui-react";

const TabPane = Tabs.TabPane;

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabPosition: "top"
        };
    }
    handleChange = e => {
        this.setState({
            tabPosition: e.target.value
        });
    };
    render() {
        const { tabPosition } = this.state;
        return (
            <React.Fragment>
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
                <br />
                <Tabs tabPosition={tabPosition} style={{ height: 200 }}>
                    <TabPane tab="Tab 1">Tab 1</TabPane>
                    <TabPane tab="Tab 2">Tab 2</TabPane>
                    <TabPane tab="Tab 3">Tab 3</TabPane>
                    <TabPane tab="Tab 4">Tab 4</TabPane>
                    <TabPane tab="Tab 5">Tab 5</TabPane>
                </Tabs>
            </React.Fragment>
        );
    }
}

```
