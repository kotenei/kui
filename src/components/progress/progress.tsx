import React, { memo } from 'react';
import classnames from 'classnames';

import ProgressLine from './progress-line';
import ProgressCircle from './progress-circle';
import { ProgressProps } from './typing';

const Progress = (props: ProgressProps) => {
  const { prefixCls = 'k-progress', className, type, textInside, color } = props;

  const renderContent = () => {
    switch (type) {
      case 'line':
        return <ProgressLine prefixCls={prefixCls} {...props} />;
      case 'circle':
        return <ProgressCircle prefixCls={prefixCls} {...props} />;
      default:
        return null;
    }
  };

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--textInside`]: textInside,
      [`${prefixCls}--${type}`]: !!type,
      [`${prefixCls}--${color}`]: !!color,
    },
    className,
  );

  return <div className={classString}>{renderContent()}</div>;
};

Progress.defaultProps = {
  percent: 0,
  type: 'line',
  strokeWidth: 6,
  textInside: false,
  showText: true,
  width: 100,
  indeterminate: false,
};

export default memo(Progress);
