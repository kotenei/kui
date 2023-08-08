import { HTMLAttributes } from 'react';

export interface MessageContentProps
  extends KUI.BasicProps<HTMLAttributes<HTMLDivElement>, 'title'> {
  state?: KUI.StateTypes | 'loading';
  content?: React.ReactNode | string;
  onClose?: () => void;
}

export interface MessageConfig {
  duration?: number;
}
