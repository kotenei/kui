export interface TagProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  color: KUI.ColorTypes;
  closable?: boolean;
  line?: boolean;
  onClose?: () => boolean;
}
