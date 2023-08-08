import React, { memo } from 'react';
import classnames from 'classnames';

import { CalendarYearProps } from './typing';

const CalendarYear = (props: CalendarYearProps) => {
  const { date, value, minDate, maxDate, rangeDate, rangeHoverDate, onChange, onHover } = props;
  const prefixCls = `${props.prefixCls}-year`;

  const getNewDate = (e) => {
    const { target } = e;
    let year = target.getAttribute('data-year');
    const newDate = new Date(
      year,
      date.getMonth(),
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

  const isSelected = (year) => {
    if (rangeDate && rangeDate.length) {
      return (
        (rangeDate[0] && year === rangeDate[0].getFullYear()) ||
        (rangeDate[1] && year === rangeDate[1].getFullYear())
      );
    }

    return value && value.getFullYear().toString() === year;
  };

  const isInRange = (val) => {
    if (rangeDate) {
      if (rangeDate.length === 1 && rangeHoverDate) {
        return (
          (val >= rangeDate[0].getFullYear() && val <= rangeHoverDate.getFullYear()) ||
          (val <= rangeDate[0].getFullYear() && val >= rangeHoverDate.getFullYear())
        );
      }
      if (rangeDate.length === 2) {
        return val >= rangeDate[0].getFullYear() && val <= rangeDate[1].getFullYear();
      }
    }
    return false;
  };

  const renderContent = () => {
    let rows: any = [],
      year = date.getFullYear(),
      num = parseInt(year.toString().substr(3)),
      start = year - num,
      flag = 0,
      disabled,
      cells,
      active,
      inRange;

    for (let i = 0; i < 3; i++) {
      cells = [];
      for (let j = flag, y; j < 10; j++) {
        y = start + j;
        disabled = false;
        active = isSelected(y);
        inRange = isInRange(y);

        if ((minDate && y < minDate.getFullYear()) || (maxDate && y > maxDate.getFullYear())) {
          disabled = true;
        }
        cells.push(
          <td
            key={`cell-${j}`}
            data-year={y}
            onMouseEnter={onMouseEnter}
            onMouseLeave={() => {
              onHover && onHover();
            }}
          >
            <a
              data-year={y}
              className={classnames({
                active,
                inRange,
                disabled,
              })}
              onClick={!disabled ? onClick : undefined}
            >
              {y}
            </a>
          </td>,
        );
        flag++;
        if ((j + 1) % 4 === 0) {
          break;
        }
      }

      if (i === 2) {
        cells.push(<td key={`cell-empty1-${i}`} />);
        cells.push(<td key={`cell-empty2-${i}`} />);
      }

      rows.push(<tr key={`row-${i}`}>{cells}</tr>);
    }

    return rows;
  };

  return (
    <table className={prefixCls}>
      <tbody>{renderContent()}</tbody>
    </table>
  );
};

export default memo(CalendarYear);
