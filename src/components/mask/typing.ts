export interface MaskProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  zIndex?: number;
  show?: boolean;
  timeout?: number;
  transitionName?: string;
  onClick?: () => void;
}
