import React, { memo } from 'react';
import classnames from 'classnames';

import { MessageContentProps } from './typing';
import { getStateIcon } from '../../utils/getStateIcon';

const MessageContent = (props: MessageContentProps) => {
  const { prefixCls = 'k-message', className, state, content, ...others } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${state}`]: !!state,
    },
    className,
  );

  const icon = state && getStateIcon(state, state === 'loading' && { size: 'xs' });

  return (
    <div className={classString} {...others}>
      {icon}
      <div className={`${prefixCls}-content`}>{content}</div>
    </div>
  );
};

export default memo(MessageContent);
