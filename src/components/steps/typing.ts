export interface StepsProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  alignCenter?: boolean;
  current?: number;
  direction?: 'horizontal' | 'vertical';
  status?: 'wait' | 'process' | 'finish' | 'error';
  size?: 'sm';
  iconInner?: boolean;
}

export interface StepsItemProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
  index?: number;
  icon?: React.ReactNode;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  status?: 'wait' | 'process' | 'finish' | 'error';
  iconInner?: boolean;
}
