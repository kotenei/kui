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
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  timeout?: number;
  onEnter?: (node, position: { left: number; top: number }) => void;
  onEntering?: (node) => void;
  onExiting?: (node) => void;
}
