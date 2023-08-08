import React, { Component } from 'react';
import { Tree, TreeNode } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-tree">
        <Tree
          showLine
          checkable
          selectable
          defaultCheckedKeys={['1-1-1', '1-2']}
          defaultExpandedKeys={['1', '1-1', '1-2']}
        >
          <TreeNode title="parent 1" key="1">
            <TreeNode title="parent 1-1" key="1-1">
              <TreeNode title="leaf 1-1-1" key="1-1-1" />
              <TreeNode title="leaf 1-1-2" key="1-1-2" disabled />
              <TreeNode title="leaf 1-1-3" key="1-1-3" />
            </TreeNode>
            <TreeNode title="parent 1-2" key="1-2">
              <TreeNode title="leaf 1-2-1" key="1-2-1" />
              <TreeNode title="leaf 1-2-2" key="1-2-2" />
              <TreeNode title="leaf 1-2-3" key="1-2-3" />
            </TreeNode>
          </TreeNode>
          <TreeNode title="leaf 2" key="2" />
          <TreeNode title="leaf 3" key="3" />
        </Tree>
      </div>
    );
  }
}
