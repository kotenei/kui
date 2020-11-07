import React, { memo, useCallback } from 'react';
import classnames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';

import { Icon } from '../icon';
import { TabNavItemProps } from './typing';

const TabNavItem = (props: TabNavItemProps) => {
  const { prefixCls, children, index, isActive, disabled, editable, onClick, onClose } = props;

  const handleClick = useCallback(
    e => {
      if (disabled) {
        return;
      }
      if (onClick) {
        onClick(e, index);
      }
    },
    [index, disabled, onClick],
  );

  const handleClose = useCallback(
    e => {
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
      if (disabled) {
        return;
      }
      if (onClose) {
        onClose(e, index);
      }
    },
    [index, disabled, onClose],
  );

  return (
    <li
      className={classnames({
        [`${prefixCls}-nav`]: true,
        active: isActive,
        disabled,
      })}
      onClick={handleClick}
    >
      {children}
      {!disabled && editable ? (
        <Icon className="icon-close" onClick={handleClose}>
          <AiOutlineClose />
        </Icon>
      ) : null}
    </li>
  );
};

export default memo(TabNavItem);
