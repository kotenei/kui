import React, { Component } from "react";
import { Tabs, Button } from "main";

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

class TabsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            tabPosition: "top",
            tabs: [
                { title: "tab1", content: "tab1" },
                { title: "tab2", content: "tab2" },
                { title: "tab3", content: "tab3" }
            ]
        };
    }
    handleChange = e => {
        this.setState({
            tabPosition: e.target.value
        });
    };
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
        const { tabPosition, tabs, activeIndex } = this.state;
        return (
            <div>
                <h1>Tabs 标签</h1>
                <h3>基本用法</h3>
                <div className="k-example">
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
                        <TabPane tab="Tab 2" disabled>
                            Tab 2
                        </TabPane>
                        <TabPane tab="Tab 3">Tab 3</TabPane>
                    </Tabs>
                </div>
                <h3>附加内容</h3>
                <div className="k-example">
                    <Tabs
                        extraContent={
                            <Button kSize="sm" raised>
                                Extra
                            </Button>
                        }
                    >
                        <TabPane tab="Tab 1">Tab 1</TabPane>
                        <TabPane tab="Tab 2">Tab 2</TabPane>
                        <TabPane tab="Tab 3">Tab 3</TabPane>
                    </Tabs>
                </div>
                <h3>位置</h3>
                <div className="k-example">
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
                    <Tabs
                        type="card"
                        editable
                        onEdit={this.handleEdit}
                        activeIndex={activeIndex}
                        onTabClick={this.handleTabClick}
                    >
                        {this.renderTabs()}
                    </Tabs>
                </div>
                <h1>API</h1>
                <h3>Tabs</h3>
                <table className="k-table k-table-hover k-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>activeIndex</td>
                            <td>当前激活面板</td>
                            <td>number</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>defaultActiveIndex</td>
                            <td>初始化时选中的面板</td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>extraContent</td>
                            <td>tab bar 扩展内容</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>tabPosition</td>
                            <td>
                                标签位置，可选 'top' 'left' 'right' 'bottom'
                            </td>
                            <td>string</td>
                            <td>'top'</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>标签类型，可选 'line' 'card'</td>
                            <td>string</td>
                            <td>'line'</td>
                        </tr>
                        <tr>
                            <td>editable</td>
                            <td>是否可编辑</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>hideAdd</td>
                            <td>是否隐藏添加图标，编辑状态有效</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onTabClick</td>
                            <td>点击标签的回调函数</td>
                            <td>Function(e:eventObject,index:number)</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onEdit</td>
                            <td>新增或删除标签回调函数</td>
                            <td>
                                Function(e:eventObject,action:string,index:number)
                            </td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h3>Tabs.TabPane</h3>
                <table className="k-table k-table-hover k-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>tab</td>
                            <td>选项卡头显示内容</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TabsView;
