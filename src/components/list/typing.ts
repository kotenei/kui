export interface ListProps extends KUI.BasicProps<React.HTMLAttributes<HTMLUListElement>> {
  bordered?: boolean;
  data?: Array<any>;
  footer?: React.ReactNode | string;
  header?: React.ReactNode | string;
  size?: 'sm' | 'lg';
  renderItem?: (item: any, index: number) => React.ReactNode | string;
  split?: boolean;
}

export interface ListItemProps extends KUI.BasicProps<React.HTMLAttributes<HTMLLIElement>> {
  actions?: Array<any>;
}

export interface ListItemMetaProps
  extends KUI.BasicProps<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  avatar?: React.ReactNode;
  description?: React.ReactNode | string;
  title?: React.ReactNode | string;
}
