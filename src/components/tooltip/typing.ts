export type TooltipPlacementType =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export interface TooltipProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
  color: KUI.ColorTypes;
  title: React.ReactNode | string;
  placement?: TooltipPlacementType;
  trigger?: 'hover' | 'click';
  delay?: number;
  show?: boolean;
}
