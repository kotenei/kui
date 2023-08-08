import React, { memo } from 'react';
import classnames from 'classnames';

import { Icon } from '../icon';
import { NoticeContentProps } from './typing';
import { getStateIcon } from '../../utils/getStateIcon';
import { AiOutlineClose } from 'react-icons/ai';

const NoticeContent = (props: NoticeContentProps) => {
  const { prefixCls = 'k-notice', title, content, className, state, onClose, ...others } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${state}`]: !!state,
    },
    className,
  );

  const icon = state && getStateIcon(state);

  return (
    <div className={classString} {...others}>
      {icon}
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-content__title`}>{title}</div>
        <div className={`${prefixCls}-content__description`}>{content}</div>
      </div>
      <Icon className={`${prefixCls}-close`} onClick={onClose}>
        <AiOutlineClose />
      </Icon>
    </div>
  );
};

export default memo(NoticeContent);
