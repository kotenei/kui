import React, { memo } from 'react';
import classnames from 'classnames';
import { format, getDaysInMonth, addMonths, lastDayOfMonth, addDays, isToday } from 'date-fns';

import { CalendarDayProps } from './typing';
import { getWeek } from './utils';

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
  const { date = new Date(), minDate, maxDate, showWeek, value, onChange } = props;
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

  const renderContent = () => {
    const rows: any = [];
    const cells: any = [];
    const tmpDate: any = [];
    const min = minDate ? format(minDate, formatStr) : '';
    const max = maxDate ? format(maxDate, formatStr) : '';
    let days = getDaysInMonth(date);
    let firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let dayOfWeek = firstDate.getDay();
    let lastDayOfPrevMonth = lastDayOfMonth(addMonths(date, -1)).getDate();
    let index = 0;
    let start, startDate, end, endDate, disabled, selected, inRange, today;

    if (dayOfWeek === 0) {
      start = lastDayOfPrevMonth - 6;
      startDate = addDays(firstDate, -7);
    } else {
      start = lastDayOfPrevMonth - dayOfWeek + 1;
      startDate = addDays(firstDate, -dayOfWeek);
    }

    tmpDate.push(startDate);

    for (let i = start; i <= lastDayOfPrevMonth; i++) {
      disabled = isDisabled(startDate);
      selected = isSelected(startDate);
      today = isToday(startDate);
      // inRange = isInRange(startDate);

      if (dayOfWeek !== 0) {
        cells.push(
          <Cell
            prefixCls={prefixCls}
            key={index}
            disabled={disabled}
            selected={selected}
            today={today}
            date={startDate}
            showWeek={showWeek}
            onClick={onDateChange}
          />,
        );
      }
      startDate = addDays(startDate, 1);
      index++;
      tmpDate.push(startDate);
    }

    for (let i = 1; i <= days; i++) {
      disabled = isDisabled(startDate);
      selected = isSelected(startDate);
      today = isToday(startDate);
      // inRange = isInRange(startDate);

      cells.push(
        <Cell
          prefixCls={prefixCls}
          key={index}
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
      index++;
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
          key={index}
          disabled={disabled}
          selected={selected}
          today={today}
          date={startDate}
          showWeek={showWeek}
          onClick={onDateChange}
        />,
      );

      startDate = addDays(startDate, 1);
      index++;
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
              <span>{getWeek(weekDateList[0])}</span>
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
      <thead>
        <tr>
          {showWeek && <th></th>}
          <th>日</th>
          <th>一</th>
          <th>二</th>
          <th>三</th>
          <th>四</th>
          <th>五</th>
          <th>六</th>
        </tr>
      </thead>
      <tbody>{renderContent()}</tbody>
    </table>
  );
};

export default memo(CalendarDay);
