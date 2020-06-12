import React, { memo } from 'react';
import classnames from 'classnames';

import { SvgIconProps } from './typing';

const SvgIcon = (props: SvgIconProps) => {
  const {
    prefixCls = 'k-icon-svg',
    children,
    className,
    fontSize,
    viewBox,
    title,
    color,
    nativeColor,
    style,
    ...others
  } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${color}`]: !!color,
    },
    className,
  );

  const _style = {
    fontSize,
    ...style,
  };

  return (
    <svg
      className={classString}
      focusable="false"
      viewBox={viewBox}
      color={nativeColor}
      aria-hidden={title ? 'false' : 'true'}
      style={_style}
      {...others}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};

SvgIcon.defaultProps = {
  viewBox: '0 0 1024 1024',
};

export default memo(SvgIcon);
