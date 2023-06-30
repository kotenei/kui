export type PopPanelPlacementType =
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

export interface PopPanelProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>> {
  trigger: HTMLElement;
  placement?: PopPanelPlacementType;
  show?: boolean;
  appear?: boolean;
  unmountOnExit?: boolean;
  timeout?: number;
}
