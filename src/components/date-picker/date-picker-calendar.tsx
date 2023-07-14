import React, { memo, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { format } from 'date-fns';

import { Button } from '../button';
import { Input } from '../input';
import { TimePicker } from '../time-picker';
import { Calendar } from '../calendar';
import { DatePickerCalendarProps } from './typing';
import { eventOmitHandler, omit } from '../../utils';
import { useState } from '../../hooks';

const DatePickerCalendar = (props: DatePickerCalendarProps) => {
  const {
    className,
    showTime,
    showToday,
    view,
    value,
    weekStartsOn = 1,
    rangeDate,
    onChange,
    onPrevNextChange,
    ...others
  } = props;
  const prefixCls = `${props.prefixCls}-calendar`;
  const tmpDate = useRef(value);
  const calendarProps = omit(others, ['prefixCls']);

  useEffect(() => {
    if (value) {
      tmpDate.current = value;
    }
  }, [value]);

  const onTimeChange = useCallback(
    (val) => {
      const date = value ? value : new Date();
      const newDate = new Date(`${format(date, 'yyyy-MM-dd')} ${val}`);
      tmpDate.current = newDate;
      onChange && onChange(newDate, { show: true, view });
    },
    [value],
  );

  const onCalendarChange = useCallback(
    (date, calendarView) => {
      const show = showTime === true || (view !== undefined && calendarView !== view);
      tmpDate.current = date;
      onChange && onChange(date, { show, view: calendarView });
    },
    [view, onChange],
  );

  const onClickToday = useCallback(() => {
    const now = new Date();
    tmpDate.current = now;
    onChange && onChange(now, { show: false, view });
  }, [onChange]);

  const onClickOK = useCallback(() => {
    tmpDate.current && onChange && onChange(tmpDate.current, { show: false });
  }, [onChange]);

  const renderHeader = () => {
    let dateStr = value ? format(value, 'yyyy-MM-dd') : '';
    let timeStr = value ? format(value, 'HH:mm:ss') : '';
    let timeDisabled = false;

    if (rangeDate && !value) {
      timeDisabled = true;
    }

    return (
      showTime &&
      view === 'day' && (
        <div className={`${prefixCls}-header`}>
          <div>
            <Input readOnly value={dateStr} />
          </div>
          <div>
            <TimePicker
              showClearIcon={false}
              value={timeStr}
              disabled={timeDisabled}
              onChange={onTimeChange}
            />
          </div>
        </div>
      )
    );
  };

  const renderFooter = () => {
    return (
      (showTime || showToday) && (
        <div className={`${prefixCls}-footer`}>
          {!showTime && showToday && (
            <span className={`${prefixCls}-footer__today`} onClick={onClickToday}>
              今天
            </span>
          )}
          {showTime && (
            <div className={`${prefixCls}-footer__right`}>
              <span onClick={onClickToday}>此刻</span>
              <Button color="primary" size="sm" onClick={onClickOK}>
                确定
              </Button>
            </div>
          )}
        </div>
      )
    );
  };

  return (
    <div className={classnames(prefixCls, className)} onClick={(e) => eventOmitHandler(e)}>
      {renderHeader()}
      <div className={`${prefixCls}-body`}>
        <Calendar
          value={value}
          view={view}
          weekStartsOn={weekStartsOn}
          rangeDate={rangeDate}
          {...calendarProps}
          onChange={onCalendarChange}
          onPrevNextChange={onPrevNextChange}
        />
      </div>
      {renderFooter()}
    </div>
  );
};

export default memo(DatePickerCalendar);
