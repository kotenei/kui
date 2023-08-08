export interface SelectProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>, 'onChange' | 'onSelect'> {
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defautValue?: string[];
  value?: string[];
  size?: 'sm' | 'lg';
  onChange?: (value: string[]) => void;
}

export interface SelectOptionProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>> {
  value: string;
  disabled?: boolean;
}
