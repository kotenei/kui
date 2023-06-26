export type CalendarViewType = 'year' | 'month' | 'day' | 'week';

export interface CalendarViewProps
  extends KUI.BasicProps<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (date: Date) => void;
}

export interface CalendarProps
  extends KUI.BasicProps<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  defaultValue?: Date;
  minDate?: Date;
  maxDate?: Date;
  showPrevYear?: boolean;
  showNextYear?: boolean;
  showToday?: boolean;
  showWeek?: boolean;
  view?: CalendarViewType;
  value?: Date;
  onPrev?: (date: Date) => void;
  onNext?: (date: Date) => void;
  onViewChange?: (view: CalendarViewType) => void;
  onChange?: (date: Date) => void;
}

export interface CalendarHeaderProps
  extends KUI.BasicProps<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  view?: CalendarViewType;
  date?: Date;
  showPrevYear?: boolean;
  showPrevMonth?: boolean;
  showNextYear?: boolean;
  showNextMonth?: boolean;
  onViewChange?: (view: CalendarViewType) => void;
  onChange?: (date: Date) => void;
}

export interface CalendarYearProps extends CalendarViewProps {}

export interface CalendarMonthProps extends CalendarViewProps {}

export interface CalendarDayProps extends CalendarViewProps {
  showWeek?: boolean;
}

export interface CalendarWeekProps extends CalendarViewProps {}
