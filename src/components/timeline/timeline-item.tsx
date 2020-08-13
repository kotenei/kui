import React, { memo } from 'react';
import classnames from 'classnames';

import { TimelineItemProps } from './typing';

const TimelineItem = (props: TimelineItemProps) => {
  const { prefixCls, children, className, dot, color, ...others } = props;
  const classString = classnames(
    {
      [`${prefixCls}__item`]: true,
    },
    className,
  );
  const headClassString = classnames({
    [`${prefixCls}__head`]: true,
    [`${prefixCls}__head--${color}`]: !!color,
    [`${prefixCls}__head--dot`]: !!dot,
  });
  return (
    <li className={classString} {...others}>
      <div className={`${prefixCls}__tail`} />
      <div className={headClassString}>{dot}</div>
      <div className={`${prefixCls}__content`}>{children}</div>
    </li>
  );
};

TimelineItem.displayName = 'TimelineItem';

export default memo(TimelineItem);
