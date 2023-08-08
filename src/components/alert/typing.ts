export interface AlertProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
  closeText?: React.ReactNode | string;
  closable?: boolean;
  showIcon?: boolean;
  state?: KUI.StateTypes;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  onClose?: () => boolean;
}
