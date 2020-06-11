export interface LoadingProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  color?: KUI.ColorTypes;
  size?: 'xl' | 'sm' | 'lg' | 'xl';
  tip?: React.ReactNode | string;
  vertical?: boolean;
}
