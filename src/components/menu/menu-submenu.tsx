import React, { memo, useCallback, useContext } from 'react';
import classnames from 'classnames';

import { MenuContext } from './context';
import { Icon } from '../icon';
import { Tooltip } from '../tooltip';
import { SubMenuProps } from './typing';

const SubMenu = (props: SubMenuProps) => {
  const {
    prefixCls = 'k-menu',
    mode,
    disabled,
    componentKey,
    icon,
    level = 0,
    title,
    children,
    inlineIndent = 24,
    parentKeys = [],
  } = props;

  const { openKeys, selectedSubMenuKeys, onItemClick } = useContext(MenuContext);

  const onMenuItemClick = useCallback(() => {
    if (disabled) {
      return;
    }
    if (componentKey && selectedSubMenuKeys && selectedSubMenuKeys.indexOf(componentKey) !== -1) {
      return;
    }
    if (componentKey && parentKeys && onItemClick) {
      onItemClick(componentKey, parentKeys, false);
    }
  }, [componentKey, parentKeys, selectedSubMenuKeys, onItemClick]);

  const renderTitle = () => {
    return (
      <div
        className={`${prefixCls}-submenu-title`}
        style={{ paddingLeft: mode === 'inline' ? inlineIndent : 0 }}
        onClick={onMenuItemClick}
      >
        {mode === 'inlineCollapsed' && level === 1 ? (
          <Tooltip title={title}>{icon ? <Icon>{icon}</Icon> : title}</Tooltip>
        ) : (
          <React.Fragment>
            {icon && <Icon>{icon}</Icon>}
            {title}
          </React.Fragment>
        )}
      </div>
    );
  };

  const renderSubMenus = () => {
    const newParentKeys = [...parentKeys];
    if (componentKey && newParentKeys.indexOf(componentKey) === -1) {
      newParentKeys.push(componentKey);
    }

    const menus = React.Children.map(children, (child: any, i) => {
      if (!child) {
        return null;
      }
      return React.cloneElement(child, {
        ...child.props,
        prefixCls,
        level: level + 1,
        inlineIndent: mode === 'inline' ? inlineIndent * 2 : inlineIndent,
        mode,
        componentKey: child.key,
        parentKey: componentKey,
        parentKeys: newParentKeys,
      });
    });
    const subMenuClass = classnames({
      [prefixCls]: true,
      [`${prefixCls}--${mode}`]: !!mode,
      [`${prefixCls}-sub`]: true,
    });
    return <ul className={subMenuClass}>{menus}</ul>;
  };

  const classString = classnames({
    [`${prefixCls}-submenu`]: true,
    [`${prefixCls}-submenu--${mode}`]: true,
    [`${prefixCls}-submenu--open`]:
      openKeys && componentKey && openKeys.indexOf(componentKey) !== -1,
    [`${prefixCls}-submenu--disabled`]: disabled,
    [`${prefixCls}-submenu--selected`]:
      componentKey && selectedSubMenuKeys && selectedSubMenuKeys.indexOf(componentKey) !== -1,
  });

  return (
    <li className={classString}>
      {renderTitle()}
      {renderSubMenus()}
    </li>
  );
};

export default memo(SubMenu);
