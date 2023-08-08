export interface PaginationProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLUListElement>, 'onChange'> {
  color?: KUI.ColorTypes;
  total?: number;
  pageSize?: number;
  pageIndex?: number;
  jump?: number;
  size?: 'sm' | 'lg';
  onChange?: (pageIndex: number, pageSize: number) => void;
}

export interface PaginationItemProps extends KUI.BasicProps<React.HTMLAttributes<HTMLLIElement>> {
  num: number;
  onItemClick?: (num: number) => void;
}
