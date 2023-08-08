import React, { memo } from 'react';
import classnames from 'classnames';

import { StepsProps } from './typing';

const Steps = (props: StepsProps) => {
  const {
    prefixCls = 'k-steps',
    direction,
    alignCenter,
    className,
    children,
    size,
    current = 0,
    status,
    iconInner,
    ...others
  } = props;

  const renderContent = () => {
    const items: any = [];
    const nextErrs: any = [];

    React.Children.forEach(children, (child: any, index: number) => {
      if (!child || !child.type || child.type.type.displayName !== 'Step') {
        return;
      }
      let newStatus = 'wait';

      if (index < current) {
        newStatus = 'finish';
      }
      if (index === current) {
        newStatus = 'process';
      }
      if (status && index === current) {
        newStatus = status;
      }
      if (status === 'error' && current === index && index > 0) {
        nextErrs.push(index - 1);
      }

      items.push(
        React.cloneElement(child, {
          key: index,
          index,
          iconInner,
          ...child.props,
          status: newStatus,
        }),
      );
    });

    if (nextErrs.length > 0) {
      nextErrs.forEach(index => {
        const child = items[index];
        items[index] = React.cloneElement(child, {
          ...child.props,
        });
      });
    }

    return items;
  };

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${direction}`]: true,
      [`${prefixCls}--center`]: alignCenter && direction !== 'vertical',
      [`${prefixCls}--${size}`]: !!size,
    },
    className,
  );

  return (
    <div className={classString} {...others}>
      {renderContent()}
    </div>
  );
};

Steps.defaultProps = {
  alignCenter: false,
  current: 0,
  direction: 'horizontal',
};

export default memo(Steps);
