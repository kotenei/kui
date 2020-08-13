import React, { memo, useMemo } from 'react';
import classnames from 'classnames';

import { TimelineProps } from './typing';

const Timeline = (props: TimelineProps) => {
  const { prefixCls = 'k-timeline', children, className, ...others } = props;

  const content = useMemo(() => {
    return React.Children.map(children, (child: any, index) => {
      if (!child || !child.type || child.type.type.displayName !== 'TimelineItem') {
        return ;
      }
      return React.cloneElement(child, {
        ...child.props,
        prefixCls,
      });
    });
  }, [children]);

  const classString = classnames(prefixCls, className);

  return (
    <ul className={classString} {...others}>
      {content}
    </ul>
  );
};

export default memo(Timeline);
