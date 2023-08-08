import React, { memo } from 'react';
import classnames from 'classnames';

import { Icon } from '../icon';
import { AvatarProps } from './typing';

const Avatar = (props: AvatarProps) => {
  const { prefixCls = 'k-avatar', color, children, icon, square, size, src, ...others } = props;

  const classString = classnames({
    [prefixCls]: true,
    [`${prefixCls}--${color}`]: !!color,
    [`${prefixCls}--${size}`]: !!size,
    [`${prefixCls}--square`]: !!square,
  });

  return (
    <div className={classString} {...others}>
      {src ? <img src={src} /> : children}
      {icon && <Icon>{icon}</Icon>}
    </div>
  );
};

Avatar.defaultProps = {
  size: 'md',
  square: false,
};

export default memo(Avatar);
