import React, { Component } from "react";
import { Tree } from "main";

const TreeNode = Tree.TreeNode;

class CalendarView extends Component {
    static displayName = "TreeNode";
    render() {
        return (
            <div>
                <h1>Tree 树型</h1>
                <div className="k-example">
                    <Tree>
                        <TreeNode />
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
