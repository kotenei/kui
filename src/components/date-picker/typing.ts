import { CalendarViewType } from '../calendar/typing';

export interface DatePickerProps
  extends KUI.BasicProps<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  defaultValue?: Date;
  disabled?: boolean;
  format?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  okText?: string | React.ReactNode;
  size?: 'sm' | 'lg';
  showToday?: boolean;
  showTime?: boolean;
  view?: CalendarViewType;
  value?: Date;
  onChange?: (date?: Date) => void;
}

// export interface RangePickerProps extends KUI.BasicProps<CommonPickerProps> {
//   startPlaceholder?: string;
//   endPlaceholder?: string;
//   okText?: string | React.ReactNode;
//   separator?: string | React.ReactNode;
//   showTime?: boolean;
// }
