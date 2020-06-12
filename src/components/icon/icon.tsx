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
    ...others
  } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${color}`]: !!color,
      [`${prefixCls}--spin`]: spin,
    },
    className,
  );

  const _style = {
    fontSize,
    ...style,
  };

  return (
    <i className={classString} style={_style} {...others}>
      {children}
    </i>
  );
};

Icon.defaultProps = {
  viewBox: '0 0 1024 1024',
};

export default memo(Icon);
