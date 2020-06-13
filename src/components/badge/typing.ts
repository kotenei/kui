export interface BadgeProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLSpanElement>> {
  text?: number | string;
  dot?: boolean;
  overflowCount?: number;
  color?: KUI.ColorTypes;
}
