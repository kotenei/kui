import React from 'react';

export interface TreeNode {
  key: string;
  parentKey: string;
  parentKeys: string[];
  path?: string;
  children?: string[];
  level: number;
  isParent: boolean;
  index: number;
}

export interface DicNode {
  [key: string]: TreeNode;
}

const loop = (
  children: any,
  parentNode: TreeNode | null,
  nodes: TreeNode[],
  dicNode: DicNode,
  index: number = 0,
) => {
  React.Children.forEach(children, (child: any) => {
    if (!child || !child.key) {
      return;
    }
    const nodeKey = child.key as string;
    const parentKeys = parentNode
      ? parentNode.parentKeys.length > 0
        ? [parentNode.key, ...parentNode.parentKeys]
        : [parentNode.key]
      : [];
    const path = parentNode ? parentNode.path + nodeKey + '/' : `/${nodeKey}/`;

    const node: TreeNode = {
      key: nodeKey,
      parentKey: parentNode ? parentNode.key : '',
      parentKeys,
      path,
      level: parentNode ? parentNode.level + 1 : 1,
      isParent: false,
      index,
    };

    if (parentNode) {
      parentNode.isParent = true;
    }

    nodes.push(node);
    dicNode[nodeKey] = node;
    if (child.props && child.props.children) {
      loop(child.props.children, node, nodes, dicNode, ++index);
    }
  });
};

export const generateTree = (children: any): { nodes: TreeNode[]; dicNode: DicNode } => {
  const nodes: TreeNode[] = [];
  const dicNode: DicNode = {};

  if (children) {
    loop(children, null, nodes, dicNode);
  }
  return { nodes, dicNode };
};
