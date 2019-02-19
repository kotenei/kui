```jsx
import React, { Component } from "react";
import { Tree } from "kui-react";

const TreeNode = Tree.TreeNode;

export default class Example extends Component {
    render() {
        return (
            <Tree defaultExpandedIds={["1-1-1"]} showLine checkable selectable>
                <TreeNode title="parent 1" id="1">
                    <TreeNode title="parent 1-1" id="1-1">
                        <TreeNode title="parent 1-1-1" id="1-1-1">
                            <TreeNode title="leaf 1-1-1-1" id="1-1-1-1" />
                        </TreeNode>
                        <TreeNode title="leaf 1-1-2" id="1-1-2" />
                    </TreeNode>
                    <TreeNode title="leaf 1-2" id="1-2" />
                    <TreeNode title="leaf 1-3" id="1-3" />
                    <TreeNode title="leaf 1-4" id="1-4" />
                </TreeNode>
            </Tree>
        );
    }
}

```
