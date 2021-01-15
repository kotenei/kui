export type DropdownPlacementType =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';

export interface DropdownProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>> {
  menu?: React.ReactElement;
  trigger?: 'hover' | 'click' | 'manual';
  placement?: DropdownPlacementType;
  disabled?: boolean;
  show?: boolean;
}

export interface DropdownButtonProps extends DropdownProps {
  onClick?: () => void;
}
