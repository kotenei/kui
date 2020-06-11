export interface ButtonProps extends KUI.BasicProps<React.HTMLAttributes<HTMLButtonElement>> {
  color?: KUI.ColorTypes;
  icon?: React.ReactNode;
  disabled?: boolean;
  full?: boolean;
  type?: 'button' | 'reset' | 'submit';
  active?: boolean;
  size?: KUI.SizeTypes;
  onClick?: (e) => void;
}
