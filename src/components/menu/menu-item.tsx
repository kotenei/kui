import React, { CSSProperties, memo } from 'react';
import classnames from 'classnames';

import { Icon } from '../icon';
import { Tooltip } from '../tooltip';
import { MenuItemProps } from './typing';

const MenuItem = (props: MenuItemProps) => {
  const {
    prefixCls,
    key,
    disabled,
    selectedKeys,
    inlineIndent = 24,
    icon,
    children,
    mode,
    level,
    title,
  } = props;

  const classString = classnames({
    [`${prefixCls}-item`]: true,
    [`${prefixCls}-item--active`]: key && selectedKeys && selectedKeys.indexOf(key) !== -1,
    [`${prefixCls}-item--disabled`]: disabled,
  });

  const _style: CSSProperties = {
    ...props.style,
    paddingLeft: mode === 'inline' ? inlineIndent : 0,
  };

  return (
    <li className={classString} style={_style}>
      {mode === 'inlineCollapsed' && level === 1 ? (
        <Tooltip title={title}>
          {icon ? (
            <div className={`${prefixCls}-item-icon`}>
              <Icon>{icon}</Icon>
            </div>
          ) : (
            <div className={`${prefixCls}-item-content`}>{children}</div>
          )}
        </Tooltip>
      ) : (
        <React.Fragment>
          {icon && (
            <div className={`${prefixCls}-item-icon`}>
              <Icon>{icon}</Icon>
            </div>
          )}
          <div className={`${prefixCls}-item-content`}>{children}</div>
        </React.Fragment>
      )}
    </li>
  );
};

export default memo(MenuItem);
