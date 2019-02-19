import React, { Component } from "react";
import Basic from "./Basic";
import Line from "./Line";
import Remote from "./Remote";
import DragDrop from "./DragDrop";
import Icon from "./Icon";
import DocMark from "../DocMark";
import docs from "./docs";

class CalendarView extends Component {
    render() {
        return (
            <div>
                <h1>Tree 树型</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
                </div>
                <h3>链接线</h3>
                <div className="k-example">
                    <Line />
                    <DocMark source={docs.Line} />
                </div>
                <h3>异步加载</h3>
                <div className="k-example">
                    <Remote />
                    <DocMark source={docs.Remote} />
                </div>
                <h3>可拖拽</h3>
                <div className="k-example">
                    <DragDrop />
                    <DocMark source={docs.DragDrop} />
                </div>

                <h3>自定义图标</h3>
                <div className="k-example">
                    <Icon />
                    <DocMark source={docs.Icon} />
                </div>
                <br />
                <h1>API</h1>
                <h3>Tree</h3>
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
                            <td>checkable</td>
                            <td>是否可复选</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>checkedIds</td>
                            <td>
                                选中复选框的树节点（注意：父子节点有关联，如果传入父节点id，则子节点自动选中；相应当子节点id都传入，父节点也自动选中)
                            </td>
                            <td>string[]</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>defaultCheckedIds</td>
                            <td>默认选中复选框的树节点</td>
                            <td>string[]</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>defaultExpandedIds</td>
                            <td>默认展开的树节点</td>
                            <td>string[]</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>defaultSelectedIds</td>
                            <td>默认选中的树节点</td>
                            <td>string[]</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>dragable</td>
                            <td>是否可拖拽</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>expandedIds</td>
                            <td>展开指定的树节点</td>
                            <td>string[]</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>loadData</td>
                            <td>异步加载数据时调用</td>
                            <td>function(treeNode)</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>multiple</td>
                            <td>是否多选</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>selectable</td>
                            <td>是否可先择节点</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>selectedIds</td>
                            <td>选中的树节点</td>
                            <td>string[]</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>showIcon</td>
                            <td>
                                是否展示 TreeNode title 前的图标，如设置为
                                true，需要自行定义图标相关样式
                            </td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>showLine</td>
                            <td>是否展示连接线</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onCheck</td>
                            <td>复选节点时调用</td>
                            <td>
                                function(id:string,checked:boolean,checkedIds:[])
                            </td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onDragStart</td>
                            <td>开始拖拽时调用</td>
                            <td>function(id:string,treeNode:object)</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onDragOver</td>
                            <td>dragover 触发时调用</td>
                            <td>
                                function(
                                {`{dragId:string,dropId:string,type:string}`})
                            </td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onDragEnd</td>
                            <td>结束拖拽时调用</td>
                            <td>
                                function(
                                {`{dragId:string,dropId:string,type:string}`})
                            </td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onExpand</td>
                            <td>展开时调用</td>
                            <td>
                                function(id:string,isExpanded:boolean,expanedIds:string[])
                            </td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onSelect</td>
                            <td>选中节点时调用</td>
                            <td>function(selectedIds:string[])</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>onLoad</td>
                            <td>节点加载完毕时调用</td>
                            <td>function(id:string)</td>
                            <td>无</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>TreeNode</h3>
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
                            <td>id</td>
                            <td>节点唯一编号，必填</td>
                            <td>string</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>disableCheckbox</td>
                            <td>是否禁用复选</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁止响应</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>icon</td>
                            <td>自定义图标,showIcon必须设置为true才可用</td>
                            <td>Icon Component</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>isLeaf</td>
                            <td>是否叶子节点</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>selectable</td>
                            <td>节点是否可选中</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>标题</td>
                            <td>string|ReactNode</td>
                            <td>无</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CalendarView;
