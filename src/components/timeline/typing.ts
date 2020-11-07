export interface TimelineProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLUListElement>> {}

export interface TimelineItemProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLLIElement>> {
  color?: KUI.ColorTypes;
  dot?: React.ReactNode | string;
}
