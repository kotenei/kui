import React, { memo } from 'react';
import classnames from 'classnames';
import { format } from 'date-fns';

import { CalendarMonthProps } from './typing';

const months = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
];

const CalendarMonth = (props: CalendarMonthProps) => {
  const { date = new Date(), minDate, maxDate, onChange } = props;
  const prefixCls = `${props.prefixCls}-month`;

  const onClick = (e) => {
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
    onChange && onChange(newDate);
  };

  const renderContent = () => {
    let rows: any = [],
      year = date.getFullYear(),
      month = date.getMonth(),
      flag = 0,
      min = minDate ? format(minDate, 'yyyyMM') : null,
      max = maxDate ? format(maxDate, 'yyyyMM') : null,
      disabled;

    for (let i = 0; i < 3; i++) {
      let cells: any = [];
      for (let j = flag, num; j < months.length; j++) {
        disabled = false;
        num = year + (j + 1).toString().padStart(2, '0');
        if ((min && num < min) || (max && num > max)) {
          disabled = true;
        }
        cells.push(
          <td key={`cell_${j}`}>
            <a
              data-month={j}
              className={classnames({
                active: month == j,
                disabled,
              })}
              onClick={!disabled ? onClick : undefined}
            >
              {months[j]}
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
