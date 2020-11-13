import React, { memo, useCallback, useContext, useRef } from 'react';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';

import { MenuContext } from './context';
import { Icon } from '../icon';
import { Tooltip } from '../tooltip';
import { SubMenuProps } from './typing';
import {
  AiOutlineArrowDown,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineUp,
} from 'react-icons/ai';

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
  const contentElement = useRef(null);
  const isOpen = openKeys && componentKey && openKeys.indexOf(componentKey) !== -1;

  const onMenuItemClick = useCallback(() => {
    if (disabled) {
      return;
    }

    if (componentKey && parentKeys && onItemClick) {
      onItemClick(componentKey, parentKeys, false);
    }
  }, [componentKey, parentKeys, onItemClick]);

  const onEnter = useCallback(node => {
    node.style.height = '0px';
  }, []);

  const onEntering = useCallback(node => {
    node.style.height = getContentHeight() + 'px';
  }, []);

  const onEntered = useCallback(node => {
    node.style.height = 'auto';
    node.style.overflow = 'auto';
  }, []);

  const onExit = useCallback(node => {
    node.style.height = getContentHeight() + 'px';
    node.style.overflow = 'hidden';
    node.offsetHeight;
  }, []);

  const onExiting = useCallback(node => {
    node.style.height = '0px';
  }, []);

  const getContentHeight = () => {
    const el = contentElement.current ? (contentElement.current as any) : null;
    return el ? el.offsetHeight || el.clientHeight || el.scrollHeight : 0;
  };

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
            {renderIcon()}
          </React.Fragment>
        )}
      </div>
    );
  };

  const renderIcon = () => {
    if (!children || (mode === 'inlineCollapsed' && level === 1)) {
      return null;
    }
    if (mode === 'inline' || (mode === 'horizontal' && level === 1)) {
      return (
        <Icon
          className="direction"
          children={isOpen ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
        />
      );
    }
    return <Icon className="direction" children={<AiOutlineArrowRight />} />;
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

    return (
      <Transition
        in={isOpen}
        timeout={300}
        appear
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
      >
        {state => {
          return (
            <ul className={subMenuClass} ref={contentElement}>
              {menus}
            </ul>
          );
        }}
      </Transition>
    );
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
