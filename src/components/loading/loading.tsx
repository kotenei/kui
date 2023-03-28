import React, { memo } from 'react';
import classnames from 'classnames';

import { LoadingProps } from './typing';

const Loading = (props: LoadingProps) => {
  const { prefixCls = 'k-loading', className, color, tip, vertical, size, ...others } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${color}`]: !!color,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--vertical`]: !!vertical,
    },
    className,
  );

  return (
    <div className={classString} {...others}>
      <span className={`${prefixCls}__circle`}>
        <svg viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20" fill="none" />
        </svg>
      </span>
      <span className={`${prefixCls}__tip`}>{tip}</span>
    </div>
  );
};

export default memo(Loading);
