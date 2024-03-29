import React, { memo, useEffect } from 'react';
import classnames from 'classnames';

import CalendarHeader from './calendar-header';
import CalendarYear from './calendar-year';
import CalendarMonth from './calendar-month';
import CalendarDay from './calendar-day';
import { CalendarProps } from './typing';
import { useState } from '../../hooks';

const Calendar = (props: CalendarProps) => {
  const {
    prefixCls = 'k-calendar',
    className,
    view,
    defaultValue,
    date,
    value,
    minDate,
    maxDate,
    weekStartsOn = 0,
    showPrevYear = true,
    showPrevMonth = true,
    showNextMonth = true,
    showNextYear = true,
    rangeDate,
    rangeHoverDate,
    onChange,
    onViewChange,
    onHover,
  } = props;
  const [state, setState] = useState({
    date: value || defaultValue || date || new Date(),
    value: value || defaultValue,
    view: view || 'day',
    orgView: view || 'day',
  });

  useEffect(() => {
    if ('value' in props) {
      setState({
        value,
      });
    }
  }, [value]);

  useEffect(() => {
    if ('view' in props && view !== undefined) {
      setState({
        view,
        orgView: view,
      });
    }
  }, [view]);

  useEffect(() => {
    if (date) {
      setState({
        date,
      });
    }
  }, [date]);

  const onPrevNextChange = (date, type) => {
    setState({
      date,
    });
    props.onPrevNextChange && props.onPrevNextChange(date, type);
  };

  const onHeaderViewChange = (view) => {
    setState({
      view,
    });

    onViewChange && onViewChange(view);
  };

  const onDateChange = (date) => {
    const newState: any = {
      date,
      view: state.orgView,
    };

    if (!('value' in props) && state.view === state.orgView) {
      newState.value = date;
    }

    setState(newState);
    onChange && onChange(date, state.view);
  };

  const classString = classnames(prefixCls, className);

  const renderView = () => {
    const viewProps:any = {
      prefixCls,
      minDate,
      maxDate,
      date: state.date,
      value: state.value,
      rangeDate,
      rangeHoverDate,
      onChange: onDateChange,
      onHover,
    };
    switch (state.view) {
      case 'year':
        return <CalendarYear {...viewProps} />;
      case 'month':
        return <CalendarMonth {...viewProps} />;
      case 'day':
        return <CalendarDay {...viewProps} weekStartsOn={weekStartsOn} />;
      case 'week':
        return <CalendarDay {...viewProps} weekStartsOn={weekStartsOn} showWeek />;
      default:
        return null;
    }
  };

  return (
    <div className={classString}>
      <CalendarHeader
        prefixCls={prefixCls}
        view={state.view}
        date={state.date}
        showPrevYear={showPrevYear}
        showPrevMonth={showPrevMonth}
        showNextMonth={showNextMonth}
        showNextYear={showNextYear}
        onChange={onPrevNextChange}
        onViewChange={onHeaderViewChange}
      />
      <div className={`${prefixCls}-body`}>{renderView()}</div>
    </div>
  );
};

export default memo(Calendar);
