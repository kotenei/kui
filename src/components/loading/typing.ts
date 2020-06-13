export interface LoadingProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  color?: KUI.ColorTypes;
  size?: 'xs' | 'sm' | 'lg' | 'xl';
  tip?: React.ReactNode | string;
  vertical?: boolean;
}
