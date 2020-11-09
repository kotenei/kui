import { HTMLAttributes } from 'react';

export interface ModalProps extends KUI.BasicProps<HTMLAttributes<HTMLDivElement>, 'title'> {
  header?: React.ReactNode | string;
  content?: React.ReactNode | string;
  footer?: React.ReactNode;
  width?: number;
  height?: number;
  space?: number;
  open?: boolean;
  mask?: boolean;
  maskClose?: boolean;
  okText?: React.ReactNode | string;
  cancelText?: React.ReactNode | string;
  showCancel?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  showCloseIcon?: boolean;
  onCancel?: () => void;
  onOK?: () => void;
}

export interface ConfirmProps extends ModalProps {
  Icon?: React.ReactNode;
  type?: KUI.StateTypes;
  okCancel?: boolean;
  onCancel?: () => void | boolean;
  onOK?: () => void | boolean;
}
