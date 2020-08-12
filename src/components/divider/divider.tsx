import React, { memo } from 'react';
import classnames from 'classnames';

import { DividerProps } from './typing';

const Divider = (props: DividerProps) => {
  const {
    prefixCls = 'k-divider',
    className,
    component: Component = 'hr',
    color,
    direction = 'horizontal',
    ...others
  } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${color}`]: !!color,
      [`${prefixCls}--${direction}`]: !!direction,
    },
    className,
  );

  return <Component className={classString} {...others} />;
};

export default memo(Divider);
