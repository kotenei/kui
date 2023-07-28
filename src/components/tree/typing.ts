export interface TreeProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>, 'onSelect' | 'onLoad'> {
  checkable?: boolean;
  checkedKeys?: string[];
  defaultCheckedKeys?: string[];
  defaultExpandedKeys?: string[];
  defaultSelectedKeys?: string[];
  disabled?: boolean;
  dragable?: boolean;
  expandedKeys?: string[];
  multiple?: boolean;
  selectable?: boolean;
  selectedKeys?: string[];
  showIcon?: boolean;
  showLine?: boolean;
  onCheck?: (checkedKeys: string[]) => void;
  onExpand?: (expandedKeys: string[]) => void;
  onSelect?: (selectedKeys: string[]) => void;
  onLoad?: (key: string) => void;
}

export interface TreeNodeProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>, 'title'> {
  key: string;
  componentKey: string;
  parentKeys?: string[];
  disabledCheckbox?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  title?: string | React.ReactNode;
}
