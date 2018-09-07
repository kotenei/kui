import React, { Component } from "react";
import { Tree } from "main";

const TreeNode = Tree.TreeNode;

class CalendarView extends Component {
    state = {
        data: [
            { title: "Expand to load", id: "0" },
            { title: "Expand to load", id: "1" },
            { title: "Tree Node", id: "2" }
        ]
    };
    handlLoad = treeNode => {
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
                <div className="k-example">
                    <Tree
                        // defaultExpandedIds={["1-1-1"]}
                        // defaultCheckedIds={["1-1", "1-1-2"]}
                        // defaultSelectedIds={["1-1"]}
                        checkable
                        multiple
                        loadData={this.handlLoad}
                    >
                        {/* <TreeNode title="parent 1" id="1">
                            <TreeNode title="parent 1-1" id="1-1" disabled>
                                <TreeNode title="parent 1-1-1" id="1-1-1" >
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
                        </TreeNode> */}
                        {this.renderTreeNodes(this.state.data)}
                    </Tree>
                </div>
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
                            <td />
                            <td />
                            <td />
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CalendarView;
