import React, { Component } from 'react';
import { Tree, TreeNode } from 'kui-react';

export default class Demo extends Component {
  state = {
    checkedKeys: ['1-1-1', '1-1-2', '1-2'],
  };
  render() {
    console.log(this.state.checkedKeys)
    return (
      <div className="story-demo-tree">
        <Tree
          showLine
          checkable
          selectable
          multiple
          checkedKeys={this.state.checkedKeys}
          onCheck={(keys) => {
            this.setState({
              checkedKeys: keys,
            });
          }}
        >
          <TreeNode title="parent 1" key="1">
            <TreeNode title="parent 1-1" key="1-1">
              <TreeNode title="leaf" key="1-1-1" />
              <TreeNode title="leaf" key="1-1-2" />
              <TreeNode title="leaf" key="1-1-3" />
            </TreeNode>
            <TreeNode title="parent 1-2" key="1-2">
              <TreeNode title="leaf" key="1-2-1" />
              <TreeNode title="leaf" key="1-2-2" />
              <TreeNode title="leaf" key="1-2-3" />
            </TreeNode>
          </TreeNode>
          <TreeNode title="leaf 2" key="2" />
          <TreeNode title="leaf 3" key="3" />
        </Tree>
      </div>
    );
  }
}
