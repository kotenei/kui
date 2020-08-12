export interface ProgressProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  color?: KUI.ColorTypes;
  type?: 'line' | 'circle';
  percent?: number;
  status?: 'success' | 'error';
  strokeWidth?: number;
  textInside?: boolean;
  showText?: boolean;
  width?: number;
  indeterminate?: boolean;
  text?: string;
  nativeColor?: string;
}

export interface ProgressLineProps extends ProgressProps {}

export interface ProgressCircleProps extends ProgressProps {}
