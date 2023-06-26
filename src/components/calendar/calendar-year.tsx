import React, { memo } from 'react';
import classnames from 'classnames';

import { CalendarYearProps } from './typing';

const CalendarYear = (props: CalendarYearProps) => {
  const { date = new Date(), minDate, maxDate, onChange } = props;
  const prefixCls = `${props.prefixCls}-year`;

  const onClick = (e) => {
    const { target } = e;
    let year = target.getAttribute('data-year');
    if (onChange) {
      onChange(year);
    }
  };

  const renderContent = () => {
    let rows: any = [],
      year = date.getFullYear(),
      num = parseInt(year.toString().substr(3)),
      start = year - num,
      flag = 0,
      disabled,
      cells;

    for (let i = 0; i < 3; i++) {
      cells = [];
      for (let j = flag, y; j < 10; j++) {
        y = start + j;
        disabled = false;
        if ((minDate && y < minDate.getFullYear()) || (maxDate && y > maxDate.getFullYear())) {
          disabled = true;
        }
        cells.push(
          <td key={`cell-${j}`}>
            <a
              data-year={y}
              className={classnames({
                active: y === year,
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
