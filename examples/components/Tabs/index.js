import React, { Component } from "react";
import Basic from "./Basic";
import Disabled from "./Disabled";
import Extra from "./Extra";
import Position from "./Position";
import Card from "./Card";
import Edit from "./Edit";
import DocMark from "../DocMark";
import docs from "./docs";

class TabsView extends Component {
    render() {
        return (
            <div>
                <h1>Tabs 标签</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>禁用某一项</h3>
                <div className="k-example">
                    <Disabled />
                    <DocMark source={docs.Disabled} />
                </div>
                <h3>附加内容</h3>
                <div className="k-example">
                    <Extra />
                    <DocMark source={docs.Extra} />
                </div>
                <h3>位置</h3>
                <div className="k-example">
                    <Position />
                    <DocMark source={docs.Position} />
                </div>
                <h3>卡片式</h3>
                <div className="k-example">
                    <Card />
                    <DocMark source={docs.Card} />
                </div>
                <h3>编辑</h3>
                <div className="k-example">
                    <Edit />
                    <DocMark source={docs.Edit} />
                </div>
                <h1>API</h1>
                <h3>Tabs</h3>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
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
                <table className="k-example-table k-example-table-hover k-example-table-striped">
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
