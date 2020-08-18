import React, { memo, useMemo, useCallback } from 'react';
import classnames from 'classnames';

import { Button } from '../button';
import { Icon } from '../icon';
import { Tooltip } from '../tooltip';
import { PopconfirmProps } from './typing';
import { AiFillExclamationCircle } from 'react-icons/ai';

const Popconfirm = (props: PopconfirmProps) => {
  const {
    prefixCls = 'k-popconfirm',
    title,
    className,
    children,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
    ...others
  } = props;

  const popConfirmContent = useMemo(() => {
    return (
      <React.Fragment>
        <div className={`${prefixCls}-message`}>
          <Icon color="warning">
            <AiFillExclamationCircle />
          </Icon>
          <div className={`${prefixCls}-message-title`}>{title}</div>
        </div>
        <div className={`${prefixCls}-buttons`}>
          <Button size="sm" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button size="sm" color="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </React.Fragment>
    );
  }, [title, cancelText, confirmText]);

  const classString = classnames(prefixCls, className);

  return (
    <Tooltip
      prefixCls={'k-popover'}
      className={classString}
      title={popConfirmContent}
      {...others}
      trigger="click"
    >
      {children}
    </Tooltip>
  );
};

Popconfirm.defaultProps = {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
};

export default memo(Popconfirm);
