export interface TreeProps
  extends KUI.BasicProps<
    React.HtmlHTMLAttributes<HTMLElement>,
    'onSelect' | 'onLoad' | 'onDragOver'
  > {
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
  showLine?: boolean;
  loadData?: (key: string, children: any) => Promise<any>;
  onCheck?: (checkedKeys: string[]) => void;
  onExpand?: (expandedKeys: string[]) => void;
  onSelect?: (selectedKeys: string[]) => void;
  onDragOver?: (info) => void;
  onDragEnd?: (info) => void;
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

export interface TreeNodeContentProps extends KUI.BasicProps<TreeNodeProps> {
  dropInfo?: any;
  onDropOver?: (dropInfo: any) => void;
}
