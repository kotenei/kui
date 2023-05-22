import React, { CSSProperties, memo, useCallback, useContext, useEffect } from 'react';
import classnames from 'classnames';

import { MenuContext } from './context';
import { Icon } from '../icon';
import { Tooltip } from '../tooltip';
import { MenuItemProps } from './typing';
import { eventOmitHandler } from '../../utils';

const MenuItem = (props: MenuItemProps) => {
  const {
    prefixCls = 'k-menu',
    componentKey,
    disabled,
    inlineIndent = 24,
    icon,
    children,
    mode,
    level,
    title,
    parentKeys,
  } = props;
  const { selectedKeys, hoverKey, onItemClick, onItemHover } = useContext(MenuContext);

  const onMenuItemClick = useCallback(
    (e) => {
      eventOmitHandler(e);
      if (disabled) {
        return;
      }

      if (componentKey && parentKeys && onItemClick) {
        onItemClick(componentKey, parentKeys, true);
      }
    },
    [componentKey, parentKeys, selectedKeys, onItemClick],
  );

  const onMenuItemEnter = useCallback(() => {
    if (disabled || mode === 'inline') {
      return;
    }

    if (componentKey && parentKeys && onItemHover) {
      onItemHover(componentKey, parentKeys, 'enter', true);
    }
  }, [componentKey, parentKeys, onItemHover]);

  const onMenuItemLeave = useCallback(() => {
    if (disabled || mode === 'inline') {
      return;
    }
    if (componentKey && parentKeys && onItemHover) {
      onItemHover(componentKey, parentKeys, 'leave', true);
    }
  }, [componentKey, parentKeys, onItemHover]);

  const classString = classnames({
    [`${prefixCls}-item`]: true,
    [`${prefixCls}-item--selected`]:
      componentKey && selectedKeys && selectedKeys.indexOf(componentKey) !== -1,
    [`${prefixCls}-item--disabled`]: disabled,
    [`${prefixCls}-item--hover`]: hoverKey===componentKey,
  });

  const _style: CSSProperties = {
    ...props.style,
    paddingLeft: mode === 'inline' ? inlineIndent : 0,
  };

  return (
    <li
      className={classString}
      style={_style}
      onClick={onMenuItemClick}
      onMouseEnter={onMenuItemEnter}
      onMouseLeave={onMenuItemLeave}
    >
      {mode === 'inlineCollapsed' && level === 1 ? (
        <Tooltip title={title || children} placement="right">
          {icon ? (
            <div>
              <Icon>{icon}</Icon>
            </div>
          ) : (
            children
          )}
        </Tooltip>
      ) : (
        <React.Fragment>
          {icon && <Icon>{icon}</Icon>}
          {children}
        </React.Fragment>
      )}
    </li>
  );
};

export default memo(MenuItem);
