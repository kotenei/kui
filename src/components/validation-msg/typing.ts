export type ValidationMsgType = 'success' | 'info' | 'warning' | 'error';

export interface ValidationMsgProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  type?: ValidationMsgType;
  icon?: React.ReactNode;
  show?: boolean;
  showIcon?: boolean;
  message?: string | React.ReactNode;
  description?: string | React.ReactNode;
}
