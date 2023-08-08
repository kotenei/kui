export interface BreadcrumbProps extends KUI.BasicProps<React.HTMLAttributes<HTMLUListElement>> {
  separator?: React.ReactNode | string;
}

export interface BreadcrumbItemProps extends KUI.BasicProps<React.HTMLAttributes<HTMLLIElement>>{
    current?: boolean;
    icon?: React.ReactNode ;
    separator?: React.ReactNode | string;
    href?: string;
    prefixCls?: string;
    onClick?: () => void;
  }