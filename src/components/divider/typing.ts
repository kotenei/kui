import { ElementType } from "react";

export interface DividerProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>> {
  component?: ElementType;
  color?: KUI.ColorTypes;
  direction?: 'horizontal' | 'vertical';
}
