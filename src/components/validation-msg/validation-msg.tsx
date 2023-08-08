import React, { memo } from 'react';
import classnames from 'classnames';
import {
  AiOutlineInfoCircle,
  AiOutlineClose,
  AiOutlineCheck,
  AiOutlineWarning,
} from 'react-icons/ai';

import { ValidationMsgProps } from './typing';

const ValidationMsg = (props: ValidationMsgProps) => {
  const {
    prefixCls = 'k-validation-msg',
    className,
    show = true,
    showIcon = true,
    message,
    description,
    icon,
    type = 'warning',
    ...others
  } = props;

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${type}`]: !!type,
    },
    className,
  );

  const renderIcon = () => {
    if (icon) {
      return icon;
    }
    switch (type) {
      case 'success':
        return <AiOutlineCheck />;
      case 'info':
        return <AiOutlineInfoCircle />;
      case 'warning':
        return <AiOutlineWarning />;
      case 'error':
        return <AiOutlineClose />;
      default:
        return null;
    }
  };

  return show ? (
    <div className={classString} {...others}>
      {showIcon === false ? null : (
        <div
          className={classnames({ [`${prefixCls}-icon`]: true, [`${prefixCls}-icon--${type}`]: !!type })}
        >
          {renderIcon()}
        </div>
      )}
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-message`}>{message}</div>
        <div className={`${prefixCls}-description`}>{description}</div>
      </div>
    </div>
  ) : null;
};

export default memo(ValidationMsg);
