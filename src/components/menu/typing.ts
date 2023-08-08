export type MenuMode = 'vertical' | 'inline' | 'horizontal' | 'inlineCollapsed';

export interface MenuProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLUListElement>, 'onClick'> {
  defaultOpenKeys?: string[];
  defaultSelectedKeys?: string[];
  selectedKeys?: string[];
  openKeys?: string[];
  inlineIndent?: number;
  mode?: MenuMode;
  multiple?: boolean;
  hoverKey?: string;
  onClick?: (key: string, selectedKeys: string[], openKeys: string[]) => void;
  onHover?: (key: string, type: 'enter' | 'leave') => void;
}

export interface MenuItemProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLLIElement>, 'title'> {
  key: any;
  componentKey?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  parentKey?: string;
  parentKeys?: string[];
  level?: number;
  title?: string;
  mode?: MenuMode;
  inlineIndent?: number;
}

export interface SubMenuProps extends MenuItemProps {}
