import React, { CSSProperties, memo, useCallback, useContext } from 'react';
import classnames from 'classnames';

import { MenuContext } from './context';
import { Icon } from '../icon';
import { Tooltip } from '../tooltip';
import { MenuItemProps } from './typing';

const MenuItem = (props: MenuItemProps) => {
  const {
    prefixCls,
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
  const { selectedKeys, onItemClick } = useContext(MenuContext);

  const onMenuItemClick = useCallback(() => {
    if (disabled) {
      return;
    }
    if (componentKey && selectedKeys && selectedKeys.indexOf(componentKey) !== -1) {
      return;
    }
    if (componentKey && parentKeys && onItemClick) {
      onItemClick(componentKey, parentKeys, true);
    }
  }, [componentKey, parentKeys, selectedKeys, onItemClick]);

  const classString = classnames({
    [`${prefixCls}-item`]: true,
    [`${prefixCls}-item--selected`]:
      componentKey && selectedKeys && selectedKeys.indexOf(componentKey) !== -1,
    [`${prefixCls}-item--disabled`]: disabled,
  });

  const _style: CSSProperties = {
    ...props.style,
    paddingLeft: mode === 'inline' ? inlineIndent : 0,
  };

  return (
    <li className={classString} style={_style} onClick={onMenuItemClick}>
      {mode === 'inlineCollapsed' && level === 1 ? (
        <Tooltip title={title || children}>{icon ? <Icon>{icon}</Icon> : children}</Tooltip>
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
