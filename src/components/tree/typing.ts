export interface TreeProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>, 'onSelect' | 'onLoad'> {
  checkable?: boolean;
  checkedKeys?: string[];
  defaultCheckedKeys?: string[];
  defaultExpandedKeys?: string[];
  defaultSelectedKeys?: string[];
  dragable?: boolean;
  expandedKeys?: string[];
  multiple?: boolean;
  selectable?: boolean;
  selectedKeys?: string[];
  showIcon?: boolean;
  showLine?: boolean;
  loadData?: (key: string, children: any) => Promise<any>;
  onCheck?: (checkedKeys: string[]) => void;
  onExpand?: (expandedKeys: string[]) => void;
  onSelect?: (selectedKeys: string[]) => void;
  onLoadData?: (key: string, children: any) => Promise<any>;
}

export interface TreeNodeProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>, 'title'> {
  key: string;
  componentKey: string;
  parentKeys?: string[];
  disabled?: boolean;
  icon?: React.ReactNode;
  title?: string | React.ReactNode;
  isLeaf?: boolean;
}
