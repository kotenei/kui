import React, { Component } from "react";
import { Tree, Icon } from "kui-react";

const TreeNode = Tree.TreeNode;

export default class IconTree extends Component {
    render() {
        return (
            <Tree defaultExpandedIds={["1"]}>
                <TreeNode icon={<Icon type="github" />} title="parent 1" id="1">
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
        );
    }
}
