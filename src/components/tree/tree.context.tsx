import React from 'react';

interface TreeContextType {
  dropInfo?: any;
  checkedKeys: string[];
  expandedKeys: string[];
  selectedKeys: string[];
  checkable: boolean;
  selectable: boolean;
  dragable: boolean;
  showLine: boolean;
  initNodes: (key: string, parentKeys: string[], disabled: boolean) => void;
  initCheckedKey: (key: string) => void;
  removeCheckedKey: (key: string) => void;
  loadData?: (key: string, children: any) => Promise<any>;
  onTreeNodeSelect: (key: string) => void;
  onTreeNodeExpand: (key: string) => void;
  onTreeNodeCheck: (key: string, parentKeys: string[]) => void;
  onTreeNodeDropOver: (info: any) => void;
  onTreeNodeDropEnd: (info: any) => void;
}

export const TreeContext: React.Context<TreeContextType> = React.createContext<any>({});
