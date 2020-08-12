import React, { PureComponent, memo, useMemo } from 'react';
import classnames from 'classnames';

import ProgressLine from './progress-line';
import ProgressCircle from './progress-circle';
import { ProgressProps } from './typing';

const Progress = (props: ProgressProps) => {
  const { prefixCls = 'k-progress', className, type, textInside, color } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--textInside`]: textInside,
      [`${prefixCls}--${type}`]: !!type,
      [`${prefixCls}--${color}`]: !!color,
    },
    className,
  );

  const content = useMemo(() => {
    switch (type) {
      case 'line':
        return <ProgressLine prefixCls={prefixCls} {...props} />;
      case 'circle':
        return <ProgressCircle prefixCls={prefixCls} {...props} />;
      default:
        return null;
    }
  }, [type]);

  return <div className={classString}>{content}</div>;
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
