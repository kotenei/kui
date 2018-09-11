import React, { Component } from "react";
import { Tree, Icon } from "main";

const TreeNode = Tree.TreeNode;

const generateData = function() {
    let data = [];
    for (let i = 0; i < 3; i++) {
        let parent = { id: `${i}`, title: `parent ${i}` };
        let children = [];
        for (let j = 0; j < 3; j++) {
            children.push({
                id: `${i}-${j}`,
                title: `child ${i}-${j}`
            });
        }
        parent.children = children;
        data.push(parent);
    }
    return data;
};

class CalendarView extends Component {
    state = {
        data: [
            { title: "Expand to load 1", id: "0" },
            { title: "Expand to load 2", id: "1" },
            { title: "Tree Node", id: "2", isLeaf: true }
        ],
        dragData: generateData()
    };
    handleLoad = treeNode => {
        return new Promise(resolve => {
            if (!treeNode || treeNode.props.children) {
                resolve();
                return;
            }
            setTimeout(() => {
                const { id } = treeNode.props;
                let children = [];
                for (let i = 0; i < 2; i++) {
                    children.push({ title: "Child Node", id: `${id}-${i}` });
                }
                treeNode.props.dataRef.children = children;
                this.setState({
                    data: [...this.state.data]
                });
                resolve();
            }, 1000);
        });
    };
    handleDragEnd = info => {
        if (!info || info.dragId == info.dropId) {
            return;
        }
        let data = [...this.state.dragData];
        const loop = (data, id, callback) => {
            data.forEach((item, index, arr) => {
                if (item.id === id) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, id, callback);
                }
            });
        };
        let dragObj, dropObj, dropIndex, dropArr;
        loop(data, info.dragId, (item, index, arr) => {
            dragObj = item;
            arr.splice(index, 1);
        });
        loop(data, info.dropId, (item, index, arr) => {
            dropObj = item;
            dropIndex = index;
            dropArr = arr;
        });
        if (dropObj) {
            switch (info.type) {
                case "top":
                    dropArr.splice(dropIndex, 0, dragObj);
                    break;
                case "middle":
                    if (!dropObj.children) {
                        dropObj.children = [];
                    }
                    dropObj.children.push(dragObj);
                    break;
                case "bottom":
                    dropArr.splice(dropIndex + 1, 0, dragObj);
                    break;
                default:
                    break;
            }
            this.setState({
                dragData: data
            });
        }
    };
    renderTreeNodes = data => {
        if (!data || data.length == 0) {
            return;
        }
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode
                        title={item.title}
                        id={item.id}
                        key={item.id}
                        dataRef={item}
                    >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} key={item.id} />;
        });
    };
    render() {
        return (
            <div>
                <h1>Tree 树型</h1>
                <h3>基本使用</h3>
                <div className="k-example">
                    <Tree
                        defaultExpandedIds={["1-1-1"]}
                        defaultCheckedIds={["1"]}
                        checkable
                        selectable
                    >
                        <TreeNode title="parent 1" id="1">
                            <TreeNode title="parent 1-1" id="1-1" disabled>
                                <TreeNode title="parent 1-1-1" id="1-1-1">
                                    <TreeNode
                                        title="leaf 1-1-1-1"
                                        id="1-1-1-1"
                                    />
                                </TreeNode>
                                <TreeNode title="leaf 1-1-2" id="1-1-2" />
                            </TreeNode>
                            <TreeNode title="leaf 1-2" id="1-2" />
                            <TreeNode title="leaf 1-3" id="1-3" />
                            <TreeNode title="leaf 1-4" id="1-4" />
                        </TreeNode>
                    </Tree>
                </div>
                <h3>链接线</h3>
                <div className="k-example">
                    <Tree
                        defaultExpandedIds={["1-1-1"]}
                        showLine
                        checkable
                        selectable
                    >
                        <TreeNode title="parent 1" id="1">
                            <TreeNode title="parent 1-1" id="1-1">
                                <TreeNode title="parent 1-1-1" id="1-1-1">
                                    <TreeNode
                                        title="leaf 1-1-1-1"
                                        id="1-1-1-1"
                                    />
                                </TreeNode>
                                <TreeNode title="leaf 1-1-2" id="1-1-2" />
                            </TreeNode>
                            <TreeNode title="leaf 1-2" id="1-2" />
                            <TreeNode title="leaf 1-3" id="1-3" />
                            <TreeNode title="leaf 1-4" id="1-4" />
                        </TreeNode>
                    </Tree>
                </div>
                <h3>异步加载</h3>
                <div className="k-example">
                    <Tree loadData={this.handleLoad}>
                        {this.renderTreeNodes(this.state.data)}
                    </Tree>
                </div>
                <h3>可拖拽</h3>
                <div className="k-example">
                    <Tree dragable onDragEnd={this.handleDragEnd}>
                        {this.renderTreeNodes(this.state.dragData)}
                    </Tree>
                </div>

                <h3>自定义图标</h3>
                <div className="k-example">
                    <Tree defaultExpandedIds={["1"]}>
                        <TreeNode
                            icon={<Icon type="github" />}
                            title="parent 1"
                            id="1"
                        >
                            <TreeNode
                                icon={<Icon type="apple" />}
                                title="leaf 1"
                                id="1-1"
                            />
                            <TreeNode
                                icon={<Icon type="android" />}
                                title="leaf 2"
                                id="1-2"
                            />
                        </TreeNode>
                    </Tree>
                </div>
                <br />
                <h1>API</h1>
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
                            <td>异步加载数据的回调函数</td>
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
                            <td>是否展示 TreeNode title 前的图标，如设置为 true，需要自行定义图标相关样式</td>
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
                            <td>复选节点的回调函数</td>
                            <td>function(id:string,checked:boolean,checkedIds:[])</td>
                            <td>无</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CalendarView;
