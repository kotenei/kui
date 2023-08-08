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
    disabled,
    ...others
  } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${color}`]: !!color,
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
    <svg
      className={classString}
      focusable="false"
      viewBox={viewBox}
      color={nativeColor}
      aria-hidden={title ? 'false' : 'true'}
      style={_style}
      {...others}
      onClick={others.onClick && !disabled ? others.onClick : undefined}
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
