import React, { memo } from 'react';
import classnames from 'classnames';
import {
  format,
  getDaysInMonth,
  addDays,
  isToday,
  getWeek,
} from 'date-fns';

import { DAYS_MAP } from './constants';
import { CalendarDayProps } from './typing';

const Cell = (props) => {
  const { prefixCls, disabled, showWeek, selected, isToday, inView, date, onClick } = props;

  return (
    <td
      className={classnames({
        [`${prefixCls}__day `]: true,
        [`${prefixCls}__day--inview`]: inView,
      })}
    >
      {!showWeek ? (
        <a
          className={classnames({
            active: selected,
            today: isToday,
            disabled,
          })}
          onClick={
            !disabled
              ? () => {
                  onClick(date);
                }
              : undefined
          }
        >
          {date.getDate()}
        </a>
      ) : (
        <span
          className={classnames({
            today: isToday,
            disabled,
          })}
        >
          {date.getDate()}
        </span>
      )}
    </td>
  );
};

const CalendarDay = (props: CalendarDayProps) => {
  const {
    date = new Date(),
    minDate,
    maxDate,
    showWeek,
    value,
    weekStartsOn = 1,
    onChange,
  } = props;
  const prefixCls = `${props.prefixCls}-day`;
  const formatStr = 'yyyyMMdd';

  const onDateChange = (val) => {
    const newDate = new Date(
      val.getFullYear(),
      val.getMonth(),
      val.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    );
    onChange && onChange(newDate);
  };

  const isDisabled = (val) => {
    let min = minDate ? format(minDate, formatStr) : null,
      max = maxDate ? format(maxDate, formatStr) : null,
      cur = format(val, formatStr);
    return (min && cur < min) || (max && cur > max);
  };

  const isSelected = (val) => {
    const dateStr = format(val, formatStr);

    // if (rangeDate && rangeDate.length) {
    //   return (
    //     (rangeDate[0] && dateStr === format(rangeDate[0], formatStr)) ||
    //     (rangeDate[1] && dateStr === format(rangeDate[1], formatStr))
    //   );
    // }

    return value && dateStr === format(value, formatStr);
  };

  // const isInRange = (val) => {
  //   if (rangeDate && rangeDate.length === 2) {
  //     return val >= rangeDate[0] && date <= rangeDate[1];
  //   }
  //   return false;
  // };

  const getDaysArray = () => {
    const a = [0, 1, 2, 3, 4, 5, 6];
    const b = a.splice(weekStartsOn);
    const res = b.concat(a);
    return res;
  };

  const renderHeader = () => {
    const days = getDaysArray();
    return (
      <tr>
        {showWeek && <th></th>}
        {days.map((item) => {
          return <th key={item}>{DAYS_MAP[item]}</th>;
        })}
      </tr>
    );
  };

  const renderContent = () => {
    const rows: any = [];
    const cells: any = [];
    const tmpDate: any = [];
    const min = minDate ? format(minDate, formatStr) : '';
    const max = maxDate ? format(maxDate, formatStr) : '';
    const totalDays = getDaysInMonth(date);
    const daysArr = getDaysArray();
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDate.getDay();
    const dayOfWeekIndex = daysArr.indexOf(dayOfWeek);
    let startDate = addDays(firstDate, -dayOfWeekIndex);
    let disabled, selected, today, inRange, end;

    tmpDate.push(startDate);

    for (let i = 0; i < dayOfWeekIndex; i++) {
      disabled = isDisabled(startDate);
      selected = isSelected(startDate);
      today = isToday(startDate);
      // inRange = isInRange(startDate);

      cells.push(
        <Cell
          prefixCls={prefixCls}
          key={startDate}
          disabled={disabled}
          selected={selected}
          today={today}
          date={startDate}
          showWeek={showWeek}
          onClick={onDateChange}
        />,
      );

      startDate = addDays(startDate, 1);
      tmpDate.push(startDate);
    }

    for (let i = 1; i <= totalDays; i++) {
      disabled = isDisabled(startDate);
      selected = isSelected(startDate);
      today = isToday(startDate);
      // inRange = isInRange(startDate);
      cells.push(
        <Cell
          prefixCls={prefixCls}
          key={startDate}
          disabled={disabled}
          selected={selected}
          isToday={today}
          inView
          date={startDate}
          showWeek={showWeek}
          onClick={onDateChange}
        />,
      );

      startDate = addDays(startDate, 1);
      tmpDate.push(startDate);
    }

    end = 42 - cells.length;

    for (let i = 1; i <= end; i++) {
      disabled = isDisabled(startDate);
      selected = isSelected(startDate);
      today = isToday(startDate);
      // inRange = isInRange(startDate);

      cells.push(
        <Cell
          prefixCls={prefixCls}
          key={startDate}
          disabled={disabled}
          selected={selected}
          today={today}
          date={startDate}
          showWeek={showWeek}
          onClick={onDateChange}
        />,
      );

      startDate = addDays(startDate, 1);
      tmpDate.push(startDate);
    }

    for (let i = 0; i < 6; i++) {
      const weekDateList = tmpDate.splice(0, 7);
      let weekDisabled = true;

      if (showWeek) {
        if (min || max) {
          for (let j = 0; j < weekDateList.length; j++) {
            const item = format(weekDateList[j], formatStr);
            if (minDate && maxDate && item >= min && item <= max) {
              weekDisabled = false;
              break;
            } else if (minDate && !maxDate && item >= min) {
              weekDisabled = false;
              break;
            } else if (maxDate && !minDate && item <= max) {
              weekDisabled = false;
              break;
            }
          }
        } else {
          weekDisabled = false;
        }
      }

      rows.push(
        <tr
          className={classnames({
            week: showWeek && !weekDisabled,
            active: isSelected(weekDateList[0]),
          })}
          key={i}
          onClick={
            showWeek && !weekDisabled
              ? () => {
                  onDateChange(weekDateList[0]);
                }
              : undefined
          }
        >
          {showWeek && (
            <td className={classnames({ [`${prefixCls}__day `]: true })}>
              <span>{getWeek(weekDateList[0], { weekStartsOn })}</span>
            </td>
          )}
          {cells.splice(0, 7)}
        </tr>,
      );
    }

    return rows;
  };

  return (
    <table className={prefixCls}>
      <thead>{renderHeader()}</thead>
      <tbody>{renderContent()}</tbody>
    </table>
  );
};

export default memo(CalendarDay);
