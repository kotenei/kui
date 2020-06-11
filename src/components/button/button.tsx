import React, { memo } from 'react';
import classnames from 'classnames';

import { ButtonProps } from './typing';

const Button = (props: ButtonProps) => {
  const {
    prefixCls = 'k-button',
    color,
    icon,
    active,
    disabled,
    type,
    className,
    children,
    size,
    full,
    ...others
  } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${color}`]: !!color,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--active`]: !!active,
      // [`${prefixCls}--disabled`]: !!disabled,
      [`${prefixCls}--full`]: !!full,
    },
    className,
  );

  return (
    <button type={type} className={classString} disabled={disabled} {...others}>
      {icon && <span className={`${prefixCls}__icon`}>{icon}</span>}
      <span className={`${prefixCls}__content`}>{children}</span>
    </button>
  );
};

export default memo(Button);
