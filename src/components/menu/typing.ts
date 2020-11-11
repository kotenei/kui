export type MenuMode = 'vertical' | 'inline' | 'horizontal' | 'inlineCollapsed';

export interface MenuProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLUListElement>, 'onClick'> {
  defaultOpenKeys?: string[];
  defaultSelectedKeys?: string[];
  selectedKeys?: string[];
  selectable?: boolean;
  openKeys?: string[];
  inlineIndent?: number;
  inlineCollapsed?: boolean;
  mode?: MenuMode;
  multiple?: boolean;
  onClick?: (key: string) => void;
  onOpened?: (keys: string[]) => void;
  onSelected?: (keys: string[]) => void;
}

export interface MenuItemProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLLIElement>, 'title'> {
  key?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  parentKey?: string;
  parentKeys?: string[];
  level?: number;
  openKeys?: string[];
  selectedKeys?: string[];
  title?: string;
  mode?: MenuMode;
  inlineIndent?: number;
}

export interface SubMenuProps extends MenuItemProps {}
