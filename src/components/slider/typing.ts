export interface SliderProps
  extends KUI.BasicProps<
    React.HtmlHTMLAttributes<HTMLDivElement>,
    'onChange' | 'onDragStart' | 'defaultValue'
  > {
  disabled?: boolean;
  min?: number;
  max?: number;
  marks?: any;
  step?: number;
  range?: boolean;
  vertical?: boolean;
  value?: number | number[];
  defaultValue?: number | number[];
  tipFormatter?: (value: number | number[]) => React.ReactNode;
  onDragStart?: (value: number | number[]) => void;
  onDragStop?: (value: number | number[]) => void;
  onChange?: (value: number | number[]) => void;
}

export interface SliderHandleProps
  extends KUI.BasicProps<
    React.HtmlHTMLAttributes<HTMLDivElement>,
    'title' | 'onMouseEnter' | 'onMouseLeave' | 'onChange' | 'onDragStart'
  > {
  index: number;
  title?: React.ReactNode | string;
  vertical?: boolean;
  value: number;
  showTooltip?: boolean;
  disabled?: boolean;
  onMouseEnter?: (value: number) => void;
  onMouseLeave?: (value: number) => void;
  onDragStart?: (event, index: number) => void;
  onChange?: (event, index?: number) => void;
  onDragStop?: (event) => void;
}
