import { HTMLAttributes } from 'react';

export interface NotificationProps extends KUI.BasicProps<HTMLAttributes<HTMLDivElement>> {
  transitionName?: string;
}

export interface NotificationConfig {
  duration?: number;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

export interface NotificationState {
  notices?: any;
}

export interface NoticeProps extends KUI.BasicProps<any> {
  key?: string;
  duration?: number;
  content?: any;
  onClose?: () => {};
}

export interface NoticeContentProps
  extends KUI.BasicProps<HTMLAttributes<HTMLDivElement>, 'title'> {
  state?: KUI.StateTypes;
  title?: React.ReactNode | string;
  content?: React.ReactNode | string;
  onClose?: () => void;
}
