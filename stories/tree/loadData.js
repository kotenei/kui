import React, { Component } from 'react';
import { Tree, TreeNode } from 'kui-react';

export default class Demo extends Component {
  state = {
    data: [
      { title: 'Expand to load 1', key: '1' },
      { title: 'Expand to load 2', key: '2' },
      { title: 'Tree Node', key: '3', isLeaf: true },
    ],
  };
  updateTreeData = (data, key, children) => {
    return data.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }

      if (node.children) {
        return { ...node, children: this.updateTreeData(node.children, key, children) };
      }

      return node;
    });
  };
  load = (key, children) => {
    return new Promise((resolve) => {
      if (!key || children) {
        resolve();
        return;
      }
      setTimeout(() => {
        let children = [];
        for (let i = 0; i < 2; i++) {
          const k = `${key}-${i}`;
          children.push({ title: `Child Node ${k}`, key: k });
        }
        this.setState({
          data: this.updateTreeData(this.state.data, key, children),
        });
        resolve();
      }, 1000);
    });
  };
  renderTreeNodes = (data) => {
    if (!data || data.length == 0) {
      return;
    }
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} key={item.key} />;
    });
  };
  render() {
    return (
      <div className="story-demo-tree">
        <Tree loadData={this.load}>{this.renderTreeNodes(this.state.data)}</Tree>
      </div>
    );
  }
}
