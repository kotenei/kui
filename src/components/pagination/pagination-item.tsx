import React, { memo, useCallback } from 'react';
import classnames from 'classnames';

import { PaginationItemProps } from './typing';

const PaginationItem = (props: PaginationItemProps) => {
  const { prefixCls = 'k-pagination-item', className, children, num, onItemClick, ...others } = props;

  const handleClick = useCallback(() => {
    if (onItemClick) {
      onItemClick(num);
    }
  }, [num, onItemClick]);

  const classString = classnames(
    {
      [prefixCls]: true,
    },
    className,
  );

  return (
    <li className={classString} {...others}>
      <span onClick={handleClick}>{children}</span>
    </li>
  );
};

export default memo(PaginationItem);
