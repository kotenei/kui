import React, { memo } from 'react';
import classnames from 'classnames';

import { Icon } from '../icon';
import { Loading } from '../loading';
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
    loading,
    ...others
  } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${color}`]: !!color,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--active`]: !!active,
      [`${prefixCls}--full`]: !!full,
      [`${prefixCls}--loading`]: !!loading,
    },
    className,
  );

  return (
    <button type={type} className={classString} disabled={disabled} {...others}>
      {icon && !loading && <Icon className={`${prefixCls}__icon`}>{icon}</Icon>}
      {loading && <Loading size={size === 'lg' ? 'sm' : 'xs'} />}
      <span className={`${prefixCls}__content`}>{children}</span>
    </button>
  );
};

Button.displayName = 'Button';

export default memo(Button);
