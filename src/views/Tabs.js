import React, { Component } from 'react';
import Tabs from '../components/Tabs';
import Button from '../components/Button';

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

class TabsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            tabPosition: 'top',
            tabs: [
                { title: 'tab1', content: 'tab1' },
                { title: 'tab2', content: 'tab2' },
                { title: 'tab3', content: 'tab3' }
            ]
        }
    }
    handleChange = (e) => {
        this.setState({
            tabPosition: e.target.value
        })
    }
    handleTabClick = (e, index) => {
        this.setState({
            activeIndex: index
        })
    }
    handleEdit = (e, action, index) => {
        const { tabs, activeIndex } = this.state;
        let activeKey = 0, len = tabs.length;
        if (action == 'add') {
            tabs.push({
                title: `new tab ${len + 1}`,
                content: `new tab content ${len + 1}`
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
            tabs
        })
    }
    renderTabs() {
        const { tabs } = this.state;
        let items = [];
        tabs.forEach(tab => {
            items.push(
                <TabPane tab={tab.title}>{tab.content}</TabPane>
            )
        })
        return items;
    }
    render() {
        const { tabPosition, tabs, activeIndex } = this.state;
        return (
            <div>
                <h1>Tabs 标签</h1>
                <h3>基本使用</h3>
                <div className="k-example" >
                    <Tabs>
                        <TabPane tab="Tab 1">Tab 1</TabPane>
                        <TabPane tab="Tab 2">Tab 2</TabPane>
                        <TabPane tab="Tab 3">Tab 3</TabPane>
                    </Tabs>
                </div>
                <h3>禁用某一项</h3>
                <div className="k-example">
                    <Tabs>
                        <TabPane tab="Tab 1">Tab 1</TabPane>
                        <TabPane tab="Tab 2" disabled>Tab 2</TabPane>
                        <TabPane tab="Tab 3">Tab 3</TabPane>
                    </Tabs>
                </div>
                <h3>附加内容</h3>
                <div className="k-example">
                    <Tabs extraContent={<Button kSize="sm" raised>Extra</Button>}>
                        <TabPane tab="Tab 1">Tab 1</TabPane>
                        <TabPane tab="Tab 2">Tab 2</TabPane>
                        <TabPane tab="Tab 3">Tab 3</TabPane>
                    </Tabs>
                </div>
                <h3>位置</h3>
                <div className="k-example">
                    <select className="k-form-control" style={{ width: 80 }} onChange={this.handleChange} value={tabPosition}>
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
                </div>
                <h3>卡片式</h3>
                <div className="k-example">
                    <Tabs type="card">
                        <TabPane tab="Tab 1">Tab 1</TabPane>
                        <TabPane tab="Tab 2">Tab 2</TabPane>
                        <TabPane tab="Tab 3">Tab 3</TabPane>
                    </Tabs>
                </div>
                <h3>编辑</h3>
                <div className="k-example">
                    <Tabs type="card" editable onEdit={this.handleEdit} activeIndex={activeIndex} onTabClick={this.handleTabClick}>
                        {this.renderTabs()}
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default TabsView;