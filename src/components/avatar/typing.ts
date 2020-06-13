export interface AvatarProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  icon?: React.ReactNode;
  square?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: KUI.ColorTypes;
  src?: string;
}
