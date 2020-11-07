import { TooltipProps } from '../tooltip/typing';

export interface PopconfirmProps extends KUI.BasicProps<TooltipProps> {
  cancelText?: React.ReactNode | string;
  confirmText?: React.ReactNode | string;
  onCancel?: () => void;
  onConfirm?: () => void;
}
