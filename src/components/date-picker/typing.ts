export type DatePickerView = 'year' | 'month' | 'day';

export interface CommonPickerProps {
  defaultValue?: Date;
  format?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  onClear?: () => void;
}

export interface DatePickerProps extends KUI.BasicProps<CommonPickerProps> {
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  okText?: string | React.ReactNode;
  showPrevYear?: boolean;
  showNextYear?: boolean;
  showToday?: boolean;
  showTime?: boolean;
  showWeek?: boolean;
  view?: DatePickerView;
  onPrev?: (type: string, date: Date) => void;
  onNext?: (type: string, date: Date) => void;
}

export interface HeaderProps {
  prefixCls?: string;
  date?: Date;
  view?: DatePickerView;
  showPrevYear?: boolean;
  showPrevMonth?: boolean;
  showNextYear?: boolean;
  showNextMonth?: boolean;
  onPrevYearClick?: () => void;
  onNextYearClick?: () => void;
  onPrevMonthClick?: () => void;
  onNextMonthClick?: () => void;
  onYearClick?: () => void;
  onMonthClick?: () => void;
}

export interface RangePickerProps extends KUI.BasicProps<CommonPickerProps> {
  startPlaceholder?: string;
  endPlaceholder?: string;
  okText?: string | React.ReactNode;
  separator?: string | React.ReactNode;
  showTime?: boolean;
}

export interface ViewProps {
  prefixCls?: string;
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (value: any) => void;
}

export interface YearProps extends ViewProps {}

export interface MonthProps extends ViewProps {}

export interface DayProps extends ViewProps {}
