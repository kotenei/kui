import React, { memo } from 'react';
import classnames from 'classnames';

import { ButtonGroupProps } from './typing';

const ButtonGroup = (props: ButtonGroupProps) => {
  const { prefixCls = 'k-button-group', className, children, ...others } = props;
  const classString = classnames(prefixCls, className);
  const buttons = React.Children.map(children, (child: any) => {
    if (child && child.type && child.type.type.displayName === 'Button') {
      return child;
    }
    return null;
  });

  return (
    <div className={classString} {...others}>
      {buttons}
    </div>
  );
};

export default memo(ButtonGroup);
