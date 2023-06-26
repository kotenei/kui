import React, { memo } from 'react';
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';

import { Icon } from '../icon';
import { CalendarHeaderProps } from './typing';
import { addMonths, addYears } from 'date-fns';

const CalendarHeader = (props: CalendarHeaderProps) => {
  const {
    date = new Date(),
    view = 'day',
    showPrevYear = true,
    showPrevMonth = true,
    showNextYear = true,
    showNextMonth = true,
    onChange,
    onViewChange,
  } = props;

  const onPrevYearClick = () => {
    const val = addYears(date, view === 'year' ? -10 : -1);
    onChange && onChange(val);
  };

  const onPrevMonthClick = () => {
    const val = addMonths(date, -1);
    onChange && onChange(val);
  };

  const onNextYearClick = () => {
    const val = addYears(date, view === 'year' ? 10 : 1);
    onChange && onChange(val);
  };

  const onNextMonthClick = () => {
    const val = addMonths(date, 1);
    onChange && onChange(val);
  };

  const onYearClick = () => {
    onViewChange && onViewChange('year');
  };

  const onMonthClick = () => {
    onViewChange && onViewChange('month');
  };

  const prefixCls = `${props.prefixCls}-header`;
  const year = date.getFullYear(),
    num = parseInt(year.toString().substr(3), 10),
    start = year - num,
    end = start + 9;

  return (
    <div className={prefixCls}>
      {showPrevYear ? (
        <Icon fontSize={12} onClick={onPrevYearClick}>
          <AiOutlineDoubleLeft />
        </Icon>
      ) : null}
      {view !== 'year' && view !== 'month' && showPrevMonth ? (
        <Icon fontSize={12}  onClick={onPrevMonthClick}>
          <AiOutlineLeft />
        </Icon>
      ) : null}
      <div className={`${prefixCls}-select`}>
        <span className={`${prefixCls}-select__year`}>
          {view !== 'year' ? <a onClick={onYearClick}>{`${year}年`} </a> : `${start}-${end}`}
        </span>
        {view !== 'year' && view !== 'month' ? (
          <span className={`${prefixCls}-select__month`} >
            <a onClick={onMonthClick}>{date.getMonth() + 1}月</a>
          </span>
        ) : null}
      </div>
      {view !== 'year' && view !== 'month' && showNextMonth ? (
        <Icon fontSize={12}  onClick={onNextMonthClick}>
          <AiOutlineRight />
        </Icon>
      ) : null}
      {showNextYear ? (
        <Icon fontSize={12}  onClick={onNextYearClick}>
          <AiOutlineDoubleRight />
        </Icon>
      ) : null}
    </div>
  );
};

export default memo(CalendarHeader);
