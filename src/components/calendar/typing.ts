export type CalendarViewType = 'year' | 'month' | 'day' | 'week';

export interface CalendarViewProps
  extends KUI.BasicProps<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  date: Date;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  rangeDate?: Date[];
  rangeHoverDate?: Date;
  onChange?: (date: Date) => void;
  onHover?: (date?: Date) => void;
}

export interface CalendarProps
  extends KUI.BasicProps<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  defaultValue?: Date;
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  view?: CalendarViewType;
  value?: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  rangeDate?: Date[];
  rangeHoverDate?: Date;
  showPrevYear?: boolean;
  showPrevMonth?: boolean;
  showNextYear?: boolean;
  showNextMonth?: boolean;
  onPrevNextChange?: (date: Date, type: CalendarPrevNextType) => void;
  onViewChange?: (view: CalendarViewType) => void;
  onHover?: (date: Date) => void;
  onChange?: (date: Date, view: CalendarViewType) => void;
}

export type CalendarPrevNextType = 'prevYear' | 'prevMonth' | 'nextYear' | 'nextMonth';

export interface CalendarHeaderProps
  extends KUI.BasicProps<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  view?: CalendarViewType;
  date?: Date;
  showPrevYear?: boolean;
  showPrevMonth?: boolean;
  showNextYear?: boolean;
  showNextMonth?: boolean;
  onViewChange?: (view: CalendarViewType) => void;
  onChange?: (date: Date, type: CalendarPrevNextType) => void;
}

export interface CalendarYearProps extends CalendarViewProps {}

export interface CalendarMonthProps extends CalendarViewProps {}

export interface CalendarDayProps extends CalendarViewProps {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  value?: Date;
  showWeek?: boolean;
}

export interface CalendarWeekProps extends CalendarViewProps {}
