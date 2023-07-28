import React from 'react';

interface TreeContextType {
  checkedKeys: string[];
  expandedKeys: string[];
  selectedKeys: string[];
  checkable: boolean;
  selectable: boolean;
  dragable: boolean;
  showLine: boolean;
  initNodes: (key: string, parentKeys: string[]) => void;
  initCheckedKey: (key: string) => void;
  removeCheckedKey: (key: string) => void;
  onTreeNodeSelect: (key: string) => void;
  onTreeNodeExpand: (key: string) => void;
  onTreeNodeCheck: (key: string, parentKeys: string[]) => void;
}

export const TreeContext: React.Context<TreeContextType> = React.createContext<any>({});
