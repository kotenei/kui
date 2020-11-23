import React from 'react';

type ContextMenu = {
  openKeys?: string[];
  selectedKeys?: string[];
  selectedSubMenuKeys?: string[];
  onItemClick?: (componentKey: string, parentKeys: string[], isLeaf: boolean) => void;
  onItemHover?: (
    componentKey: string,
    parentKeys: string[],
    type: 'enter' | 'leave',
    isLeaf: boolean,
  ) => void;
};

export const MenuContext: React.Context<ContextMenu> = React.createContext({});
