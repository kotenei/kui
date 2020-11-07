export type TabPosition = 'top' | 'left' | 'right' | 'bottom';

export type TabType = 'line' | 'card';

export interface TabsProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  activeIndex?: number;
  children?: React.ReactNode[];
  defaultActiveIndex?: number;
  tabPosition?: TabPosition;
  type?: TabType;
  editable?: boolean;
  hideAdd?: boolean;
  extraContent?: React.ReactNode;
  onTabClick?: (e: Event, index: number) => void;
  onEdit?: (e: Event, action: string, index?: number) => void;
}

export interface TabNavProps extends TabsProps {}

export interface TabNavItemProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLLIElement>, 'onClick'> {
  index: number;
  isActive?: boolean;
  disabled?: boolean;
  editable?: boolean;
  onClick?: (e: Event, index: number) => void;
  onClose?: (e: Event, index: number) => void;
}

export interface TabPanelProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  tab?: React.ReactNode | string;
  disabled?: boolean;
}

export interface TabContentProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  activeIndex?: number;
  tabPosition?: TabPosition;
  children?: React.ReactNode[];
}
