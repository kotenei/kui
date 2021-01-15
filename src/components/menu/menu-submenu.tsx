import React, { memo, useCallback, useContext, useEffect, useRef } from 'react';
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
    parentKey,
    parentKeys = [],
  } = props;

  const { openKeys, selectedSubMenuKeys, onItemClick, onItemHover } = useContext(MenuContext);
  const contentElement = useRef(null);
  const isSet = useRef(false);
  const isOpen = openKeys && componentKey && openKeys.indexOf(componentKey) !== -1;

  const onMenuItemClick = useCallback(() => {
    if (disabled || mode !== 'inline') {
      return;
    }

    if (componentKey && parentKeys && onItemClick) {
      onItemClick(componentKey, parentKeys, false);
    }
  }, [componentKey, parentKeys, onItemClick]);

  const onMenuItemEnter = useCallback(() => {
    if (disabled || mode === 'inline') {
      return;
    }

    if (componentKey && parentKeys && onItemHover) {
      onItemHover(componentKey, parentKeys, 'enter', false);
    }
  }, [componentKey, parentKeys, onItemHover]);

  const onMenuItemLeave = useCallback(() => {
    if (disabled || mode === 'inline') {
      return;
    }

    if (componentKey && parentKeys && onItemHover) {
      onItemHover(componentKey, parentKeys, 'leave', false);
    }
  }, [componentKey, parentKeys, onItemHover]);

  const onEnter = useCallback(node => {
    if (mode === 'inline') {
      node.style.height = '0px';
    } else {
      node.style.opacity = 0;
      node.style.visibility = 'hidden';
    }
  }, []);

  const onEntering = useCallback(node => {
    if (mode === 'inline') {
      node.style.height = getContentHeight() + 'px';
    } else {
      // node.style.opacity = 0;
      // node.style.visibility = 'visible';
    }
  }, []);

  const onEntered = useCallback(node => {
    if (mode === 'inline') {
      node.style.height = 'auto';
      node.style.overflow = 'auto';
    } else {
      node.style.visibility = 'visible';
      node.style.opacity = 1;
    }
  }, []);

  const onExit = useCallback(node => {
    if (mode === 'inline') {
      node.style.height = getContentHeight() + 'px';
      node.style.overflow = 'hidden';
      node.offsetHeight;
    } else {
      // node.style.visibility = 'hidden';
      // node.style.opacity = 0;
    }
  }, []);

  const onExiting = useCallback(node => {
    if (mode === 'inline') {
      node.style.height = '0px';
    } else {
      node.style.visibility = 'hidden';
      node.style.opacity = 0;
    }
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
        onMouseEnter={onMenuItemEnter}
        onMouseLeave={onMenuItemLeave}
      >
        {mode === 'inlineCollapsed' && level === 1 ? (
          <Icon>{icon}</Icon>
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
    if (!children || ((mode === 'horizontal' || mode === 'inlineCollapsed') && level === 1)) {
      return null;
    }
    if (mode === 'inline') {
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
        timeout={mode === 'inline' ? 300 : 200}
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
