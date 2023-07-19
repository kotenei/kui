import React, { memo } from 'react';
import classnames from 'classnames';
import { format } from 'date-fns';

import { MONTHS } from './constants';
import { CalendarMonthProps } from './typing';

const CalendarMonth = (props: CalendarMonthProps) => {
  const { date, minDate, maxDate, rangeDate, value, rangeHoverDate, onChange, onHover } = props;
  const prefixCls = `${props.prefixCls}-month`;
  const formatStr = 'yyyyMM';

  const getNewDate = (e) => {
    const { target } = e;
    let month = target.getAttribute('data-month');
    const newDate = new Date(
      date.getFullYear(),
      month,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    );
    return newDate;
  };

  const onClick = (e) => {
    const newDate = getNewDate(e);
    onChange && onChange(newDate);
  };

  const onMouseEnter = (e) => {
    const newDate = getNewDate(e);
    onHover && onHover(newDate);
  };

  const isSelected = (val) => {
    if (rangeDate && rangeDate.length) {
      return (
        (rangeDate[0] && val === format(rangeDate[0], formatStr)) ||
        (rangeDate[1] && val === format(rangeDate[1], formatStr))
      );
    }

    return value && format(value, formatStr) === val;
  };

  const isInRange = (val) => {
    if (rangeDate) {
      if (rangeDate.length === 1 && rangeHoverDate) {
        return (
          (val >= format(rangeDate[0], formatStr) && val <= format(rangeHoverDate, formatStr)) ||
          (val <= format(rangeDate[0], formatStr) && val >= format(rangeHoverDate, formatStr))
        );
      }

      if (rangeDate.length === 2) {
        return val >= format(rangeDate[0], formatStr) && val <= format(rangeDate[1], formatStr);
      }
    }
    return false;
  };

  const renderContent = () => {
    let rows: any = [],
      year = date.getFullYear(),
      flag = 0,
      min = minDate ? format(minDate, formatStr) : null,
      max = maxDate ? format(maxDate, formatStr) : null,
      disabled,
      active,
      inRange;

    for (let i = 0; i < 3; i++) {
      let cells: any = [];
      for (let j = flag, num; j < MONTHS.length; j++) {
        disabled = false;

        num = year + (j + 1).toString().padStart(2, '0');
        active = isSelected(num);
        inRange = isInRange(num);

        if ((min && num < min) || (max && num > max)) {
          disabled = true;
        }
        cells.push(
          <td
            key={`cell_${j}`}
            data-month={j}
            onMouseEnter={onMouseEnter}
            onMouseLeave={() => {
              onHover && onHover();
            }}
          >
            <a
              data-month={j}
              className={classnames({
                inRange,
                active,

                disabled,
              })}
              onClick={!disabled ? onClick : undefined}
            >
              {MONTHS[j]}
            </a>
          </td>,
        );
        flag++;
        if ((j + 1) % 4 == 0) {
          break;
        }
      }
      rows.push(<tr key={`row_${i}`}>{cells}</tr>);
    }

    return rows;
  };

  return (
    <table className={prefixCls}>
      <tbody>{renderContent()}</tbody>
    </table>
  );
};

export default memo(CalendarMonth);
