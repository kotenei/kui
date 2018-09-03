import React, { Component } from "react";
import { Tree } from "main";

const TreeNode = Tree.TreeNode;

class CalendarView extends Component {
    render() {
        return (
            <div>
                <h1>Tree 树型</h1>
                <div className="k-example">
                    <Tree
                        defaultExpandedIds={["1"]}
                        defaultCheckedIds={["1"]}
                        checkable
                    >
                        <TreeNode title="parent 1" id="1">
                            <TreeNode title="parent 1-1" id="1-1">
                                <TreeNode title="leaf 1-1-1" id="1-1-1" />
                            </TreeNode>
                            <TreeNode title="leaf 1-2" id="1-2" />
                            <TreeNode title="leaf 1-3" id="1-3" />
                            <TreeNode title="leaf 1-4" id="1-4" />
                        </TreeNode>
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
