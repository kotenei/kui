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
    view = 'day',
    defaultValue,
    value,
    minDate,
    maxDate,
  } = props;
  const now = new Date();
  const [state, setState] = useState({
    date: value || defaultValue || now,
    value: value || defaultValue,
    view,
  });

  useEffect(() => {
    if ('view' in props) {
      setState({
        view,
      });
    }

    if ('value' in props) {
      setState({
        date: value,
        value,
      });
    }
  }, [view, value]);

  const onHeaderDateChange = (date) => {
    setState({
      date,
    });
  };

  const onViewChange = (view) => {
    if (!('view' in props)) {
      setState({
        view,
      });
    }
  };

  const classString = classnames(prefixCls, className);

  const renderView = () => {
    const viewProps = {
      prefixCls,
      minDate,
      maxDate,
      date: state.date,
      value: state.value,
    };
    switch (state.view) {
      case 'year':
        return <CalendarYear {...viewProps} />;
      case 'month':
        return <CalendarMonth {...viewProps} />;
      case 'day':
        return <CalendarDay {...viewProps} />;
      case 'week':
        return <CalendarDay {...viewProps} showWeek />;
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
        onChange={onHeaderDateChange}
        onViewChange={onViewChange}
      />
      <div className={`${prefixCls}-body`}>{renderView()}</div>
    </div>
  );
};

export default memo(Calendar);
