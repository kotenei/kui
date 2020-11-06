export interface IconProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>> {
  fontSize?: number;
  color?: KUI.ColorTypes;
  spin?: boolean;
  viewBox?: string;
}

export interface SvgIconProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLOrSVGElement>> {
  color?: KUI.ColorTypes;
  nativeColor?: string;
  fontSize?: number;
  title?: string;
  viewBox?: string;
}
