import React, { memo } from 'react';
import classnames from 'classnames';

import { BadgeProps } from './typing';

const Badge = (props: BadgeProps) => {
  const { prefixCls = 'k-badge', children, className, color, dot, overflowCount, text } = props;

  const renderBadgeText = () => {
    if (dot) {
      return <sup className={`${prefixCls}__sup ${prefixCls}__dot`} />;
    }
    if (text !== undefined && text !== null) {
      let content = text;
      if (typeof text === 'number') {
        if (overflowCount !== undefined && text > overflowCount) {
          content = overflowCount + '+';
        }
      }
      return <sup className={`${prefixCls}__sup ${prefixCls}__text`}>{content}</sup>;
    }
    return null;
  };

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${color}`]: !!color,
      [`${prefixCls}--notwrap`]: !children,
    },
    className,
  );

  return (
    <span className={classString}>
      {children}
      {renderBadgeText()}
    </span>
  );
};

Badge.defaultProps = {
  color: 'primary',
  dot: false,
  overflowCount: 99,
};

export default memo(Badge);
