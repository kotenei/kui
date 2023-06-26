import React, { memo } from 'react';
import classnames from 'classnames';
import { format, getDaysInMonth, addMonths, lastDayOfMonth, addDays } from 'date-fns';

import { CalendarDayProps } from './typing';

const CalendarDay = (props: CalendarDayProps) => {
  const { date = new Date(), minDate, maxDate, showWeek, onChange } = props;
  const prefixCls = `${props.prefixCls}-day`;

  const getDisabled = (date) => {
    let min = minDate ? format(minDate, 'yyyyMMdd') : null,
      max = maxDate ? format(maxDate, 'yyyyMMdd') : null,
      cur = format(date, 'yyyyMMdd');
    return (min && cur < min) || (max && cur > max);
  };

  // const getSelected = (val) => {
  //   const dateStr = format(val, 'yyyyMMdd');

  //   if (rangeDate && rangeDate.length) {
  //     return (
  //       (rangeDate[0] && dateStr === format(rangeDate[0], 'yyyyMMdd')) ||
  //       (rangeDate[1] && dateStr === format(rangeDate[1], 'yyyyMMdd'))
  //     );
  //   }

  //   return value && dateStr === format(value, 'yyyyMMdd');
  // };

  // const isInRange = (date) => {
  //   if (rangeDate && rangeDate.length === 2) {
  //     return date >= rangeDate[0] && date <= rangeDate[1];
  //   }
  //   return false;
  // };

  const renderContent = () => {
    const rows: any = [];
    const cells: any = [];
    let days = getDaysInMonth(date);
    let firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let dayOfWeek = firstDate.getDay();
    let lastDayOfPrevMonth = lastDayOfMonth(addMonths(date, -1)).getDate();
    let index = 0;
    let start, startDate, end, endDate, disabled, selected, inRange;

    if (dayOfWeek === 0) {
      start = lastDayOfPrevMonth - 6;
      startDate = addDays(firstDate, -7);
    } else {
      start = lastDayOfPrevMonth - dayOfWeek + 1;
      startDate = addDays(firstDate, -dayOfWeek);
    }

    for (let i = start; i <= lastDayOfPrevMonth; i++) {
      disabled = getDisabled(startDate);
      // selected = getSelected(startDate);
      if (dayOfWeek !== 0) {
        cells.push(
          <td className={`${prefixCls}__day`} key={i}>
            {/* {i} */}
          </td>,
        );
      }
      startDate = addDays(startDate, 1);
      index++;
    }

    for (let i = 1; i <= days; i++) {
      disabled = getDisabled(startDate);
      // selected = getSelected(startDate);
      // inRange = isInRange(startDate);

      cells.push(
        <td className={`${prefixCls}__day ${inRange ? 'inRange' : ''}`} key={index}>
          <a
            className={`${selected ? 'active' : ''}`}
            // onClick={() => {
            //   onDayClick(i);
            // }}
          >
            {i}
          </a>
        </td>,
      );
      startDate = addDays(startDate, 1);
      index++;
    }

    end = 42 - cells.length;

    for (let i = 1; i <= end; i++) {
      disabled = getDisabled(startDate);
      // selected = getSelected(startDate);
      cells.push(
        <td className={`${prefixCls}__day`} key={index}>
          {/* {i} */}
        </td>,
      );
      startDate = addDays(startDate, 1);
      index++;
    }

    for (let i = 0; i < 6; i++) {
      rows.push(
        <tr className={showWeek ? 'week' : undefined} key={i}>
          {showWeek && <td></td>}
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
