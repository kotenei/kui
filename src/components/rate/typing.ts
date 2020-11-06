export interface RateProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLUListElement>, 'onChange'> {
  allowHalf?: boolean;
  count?: number;
  defaultValue?: number;
  value?: number;
  character?: React.ReactNode;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export interface RateItemProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLLIElement>, 'onClick'> {
  current: number;
  value: number;
  character?: React.ReactNode;
  allowHalf?: boolean;
  onHover?: (value: number) => void;
  onClick?: (value: number) => void;
}
