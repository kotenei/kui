import React, { Component } from "react";
import { Tabs } from "kui-react";

const TabPane = Tabs.TabPane;

export default class Disabled extends Component {
    render() {
        return (
            <Tabs>
                <TabPane tab="Tab 1">Tab 1</TabPane>
                <TabPane tab="Tab 2" disabled>
                    Tab 2
                </TabPane>
                <TabPane tab="Tab 3">Tab 3</TabPane>
            </Tabs>
        );
    }
}
