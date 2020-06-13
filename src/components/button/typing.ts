export interface ButtonProps extends KUI.BasicProps<React.HTMLAttributes<HTMLButtonElement>> {
  color?: KUI.ColorTypes;
  icon?: React.ReactNode;
  disabled?: boolean;
  full?: boolean;
  type?: 'button' | 'reset' | 'submit';
  active?: boolean;
  loading?: boolean;
  size?: KUI.SizeTypes;
  onClick?: (e) => void;
}

export interface ButtonGroupProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {}
