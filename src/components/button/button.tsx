import React, { memo } from 'react';
import classnames from 'classnames';

import { Icon } from '../icon';
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
      [`${prefixCls}--full`]: !!full,
    },
    className,
  );

  return (
    <button type={type} className={classString} disabled={disabled} {...others}>
      {icon && <Icon className={`${prefixCls}__icon`}>{icon}</Icon>}
      <span className={`${prefixCls}__content`}>{children}</span>
    </button>
  );
};

export default memo(Button);
