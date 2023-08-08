import React, { memo } from 'react';
import classnames from 'classnames';

import { TimelineProps } from './typing';

const Timeline = (props: TimelineProps) => {
  const { prefixCls = 'k-timeline', children, className, ...others } = props;

  const renderContent = () => {
    return React.Children.map(children, (child: any, index) => {
      if (!child || !child.type || child.type.type.displayName !== 'TimelineItem') {
        return;
      }
      return React.cloneElement(child, {
        ...child.props,
        prefixCls,
      });
    });
  };

  const classString = classnames(prefixCls, className);

  return (
    <ul className={classString} {...others}>
      {renderContent()}
    </ul>
  );
};

export default memo(Timeline);
