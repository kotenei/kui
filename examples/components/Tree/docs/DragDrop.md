```jsx
import React, { Component } from "react";
import { Tree } from "kui-react";

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

export default class Example extends Component {
    state = {
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
            <Tree dragable onDragEnd={this.handleDragEnd}>
                {this.renderTreeNodes(this.state.dragData)}
            </Tree>
        );
    }
}

```
