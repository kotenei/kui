export interface TimePickerProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  cancelText?: React.ReactNode | string;
  okText?: React.ReactNode | string;
  defaultValue?: string;
  disabled?: boolean;
  size?: 'sm' | 'lg';
  hourStep?: number;
  minuteStep?: number;
  minTime?: string;
  maxTime?: string;
  secondStep?: number;
  show?: boolean;
  showClearIcon?: boolean;
  placeholder?: string;
  use12Hours?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export interface TimePickerSelectProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>, 'onScroll'> {
  data: string[];
  type: 'hour' | 'minute' | 'second' | 'timeSlot';
  disabled?: boolean;
  value?: string;
  onItemClick?: (type: string, value: string, index: number) => void;
  onScroll?: (type: string, value: string, index: number) => void;
}
