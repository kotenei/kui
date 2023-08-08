import React, { memo, useCallback } from 'react';
import classnames from 'classnames';

import { RateItemProps } from './typing';

const RateItem = (props: RateItemProps) => {
  const { prefixCls, current, allowHalf, value, character, onHover, onClick } = props;
  const halfNum = 0.5;

  const onFirstChange = useCallback(
    e => {
      change(e, allowHalf ? value - halfNum : value);
    },
    [allowHalf, value],
  );

  const onSecondChange = useCallback(
    e => {
      change(e, value);
    },
    [allowHalf, value],
  );

  const change = (e, val) => {
    if (e.type === 'mouseover') {
      if (onHover) {
        onHover(val);
      }
    } else {
      if (onClick) {
        onClick(val);
      }
    }
  };

  const classString = classnames({
    [`${prefixCls}-star`]: true,
    [`${prefixCls}-star--half`]: current === value - halfNum && allowHalf,
    [`${prefixCls}-star--full`]: current >= value && value.toString().indexOf('.') === -1,
  });
  return (
    <li className={classString}>
      <div
        className={`${prefixCls}-star-first`}
        onMouseOver={onFirstChange}
        onClick={onFirstChange}
      >
        {character}
      </div>
      <div
        className={`${prefixCls}-star-second`}
        onMouseOver={onSecondChange}
        onClick={onSecondChange}
      >
        {character}
      </div>
    </li>
  );
};

RateItem.defaultProps = {
  value: -1,
  current: -1,
};

export default memo(RateItem);
