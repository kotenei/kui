import React, { memo } from 'react';
import classnames from 'classnames';

import { IconProps } from './typing';

const Icon = (props: IconProps) => {
  const {
    prefixCls = 'k-icon',
    children,
    className,
    spin,
    color,
    style,
    fontSize,
    disabled = false,
    ...others
  } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${color}`]: !!color,
      [`${prefixCls}--spin`]: spin,
      [`${prefixCls}--disabled`]: disabled,
    },
    className,
  );

  const _style = {
    fontSize,
    cursor: others.onClick && !disabled ? 'pointer' : undefined,
    ...style,
  };

  return (
    <i
      className={classString}
      style={_style}
      {...others}
      onClick={others.onClick && !disabled ? others.onClick : undefined}
    >
      {children}
    </i>
  );
};

Icon.defaultProps = {
  viewBox: '0 0 1024 1024',
};

export default memo(Icon);
