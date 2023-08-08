import { CalendarProps, CalendarViewType } from '../calendar/typing';
import { PopPanelPlacementType } from '../pop-panel/typing';

export interface DatePickerProps
  extends KUI.BasicProps<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  defaultValue?: Date;
  date?: Date;
  disabled?: boolean;
  format?: string;
  placeholder?: string;
  placement?: PopPanelPlacementType;
  minDate?: Date;
  maxDate?: Date;
  okText?: string | React.ReactNode;
  size?: 'sm' | 'lg';
  showToday?: boolean;
  showTime?: boolean;
  view?: CalendarViewType;
  value?: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  onChange?: (date?: Date) => void;
}

export interface DatePickerCalendarAction {
  show: boolean;
  view?: CalendarViewType;
  isTime?: boolean;
}

export interface DatePickerCalendarProps extends KUI.BasicProps<CalendarProps, 'onChange'> {
  showTime?: boolean;
  showToday?: boolean;
  onChange?: (date: Date, action: DatePickerCalendarAction) => void;
}

export interface RangePickerProps
  extends KUI.BasicProps<DatePickerProps, 'onChange' | 'defaultValue' | 'value'> {
  startPlaceholder?: string;
  endPlaceholder?: string;
  separator?: string | React.ReactNode;
  trigger?: React.ReactElement;
  defaultValue?: [Date, Date];
  value?: [Date, Date];
  onChange?: (val?: [Date, Date]) => void;
}
