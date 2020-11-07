import React, { memo, useCallback } from 'react';
import classnames from 'classnames';

import { RateItemProps } from './typing';

const RateItem = (props: RateItemProps) => {
  const { prefixCls, current, allowHalf, value, character } = props;

  const onFirstClick = useCallback(e => {}, []);

  const onFirstOver = useCallback(e => {}, []);

  const onSecondClick = useCallback(e => {}, []);

  const onSecondOver = useCallback(e => {}, []);

  const classString = classnames({
    [`${prefixCls}-star`]: true,
    [`${prefixCls}-star-half`]: current === value - 0.5 && allowHalf,
    [`${prefixCls}-star-full`]: current >= value && value.toString().indexOf('.') === -1,
  });
  return (
    <li className={classString}>
      <div className={`${prefixCls}-star-first`} onMouseOver={onFirstOver} onClick={onFirstClick}>
        {character}
      </div>
      <div
        className={`${prefixCls}-star-second`}
        onMouseOver={onSecondOver}
        onClick={onSecondClick}
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
