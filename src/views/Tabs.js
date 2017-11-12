import React, { Component } from 'react';
import Tabs from '../components/Tabs';
const TabPane = Tabs.TabPane;

class TabsView extends Component {
    render() {
        return (
            <div>
                <h1>Tabs 标签</h1>
                <div className="k-example" style={{width:420}}>
                    <Tabs defaultActiveIndex={0}>
                        <TabPane tab="Tab 1">Tab 1</TabPane>
                        <TabPane tab="Tab 2">Tab 2</TabPane>
                        <TabPane tab="Tab 3">Tab 3</TabPane>
                        <TabPane tab="Tab 4">Tab 4</TabPane>
                        <TabPane tab="Tab 5">Tab 5</TabPane>
                        <TabPane tab="Tab 6">Tab 6</TabPane>
                        <TabPane tab="Tab 7">Tab 7</TabPane>
                        <TabPane tab="Tab 8">Tab 8</TabPane>
                        <TabPane tab="Tab 9">Tab 9</TabPane>
                        <TabPane tab="Tab 11">Tab 11</TabPane>
                        <TabPane tab="Tab 12">Tab 12</TabPane>
                        <TabPane tab="Tab 13">Tab 13</TabPane>
                        <TabPane tab="Tab 14">Tab 14</TabPane>
                        <TabPane tab="Tab 15">Tab 15</TabPane>
                        <TabPane tab="Tab 16">Tab 16</TabPane>
                        <TabPane tab="Tab 17">Tab 17</TabPane>
                        <TabPane tab="Tab 18">Tab 18</TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default TabsView;