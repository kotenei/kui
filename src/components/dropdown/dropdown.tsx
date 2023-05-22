import React, { Children, memo, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { Portal } from '../portal';
import { DropdownProps } from './typing';
import { useState, useOutsideClick } from '../../hooks';
import { getPopoverPosition } from '../../utils';

const Dropdown = React.forwardRef((props: DropdownProps, ref) => {
  const {
    prefixCls = 'k-dropdown',
    className,
    menu,
    trigger,
    placement,
    disabled,
    children,
    show,
    menuClassName,
    ...others
  } = props;
  const [state, setState] = useState({
    show: false,
  });
  const menuRef = useRef(null);
  const classString = classnames(
    {
      [prefixCls]: true,
    },
    className,
  );

  const [triggerRef] = useOutsideClick(
    {
      orgRef: ref,
      onClick: (e) => {
        hideDropdown();
      },
    },
    [state.show],
  );

  useEffect(() => {
    if ('show' in props) {
      setState({
        show: props.show,
      });
    }
  }, [props.show]);

  const showDropdown = () => {
    if (state.show || disabled) {
      return;
    }
    if (!('show' in props)) {
      setState({
        show: true,
      });
    }
  };

  const hideDropdown = () => {
    if (!state.show || disabled) {
      return;
    }
    if (!('show' in props)) {
      setState({
        show: false,
      });
    }
  };

  const onMouseEnter = useCallback(() => {
    if (trigger === 'click' || trigger === 'manual') {
      return;
    }
    showDropdown();
  }, [trigger, state.show]);

  const onMouseLeave = useCallback(() => {
    if (trigger === 'click' || trigger === 'manual') {
      return;
    }
    hideDropdown();
  }, [trigger, state.show]);

  const onClick = useCallback(
    (e) => {
      if (trigger === 'manual' && others.onClick) {
        others.onClick(e);
      }
      if (trigger === 'hover' || trigger === 'manual') {
        return;
      }
      if (state.show) {
        hideDropdown();
      } else {
        showDropdown();
      }
    },
    [trigger, state.show, others.onClick],
  );

  const onEnter = useCallback(
    (node, isAppearing) => {
      if (triggerRef.current && menuRef.current) {
        const position = getPopoverPosition(triggerRef.current as any, node, placement);
        node.style.visibility = 'visible';
        node.style.left = position.left + 'px';
        node.style.top = position.top + 'px';
        node.style.opacity = 0;
      }
    },
    [placement],
  );

  const onEntering = useCallback((node) => {
    node.style.opacity = 1;
    node.style.visibility = 'visible';
  }, []);

  const onExiting = useCallback((node) => {
    node.style.opacity = 0;
    node.style.visibility = 'hidden';
  }, []);

  const renderMenu = () => {
    return (
      menu &&
      React.cloneElement(menu, {
        ...menu.props,
        mode: 'vertical',
        onClick: (key: string, selectedKeys: string[], openKeys: string[]) => {
          if (menu.props.onClick) {
            menu.props.onClick(key, selectedKeys, openKeys);
          }
          if (!menu.props.multiple) {
            hideDropdown();
          }
        },
      })
    );
  };

  return (
    <div
      className={classString}
      ref={triggerRef}
      {...others}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
      <Portal
        in={state.show}
        timeout={300}
        appear
        onEnter={onEnter}
        onEntering={onEntering}
        onExiting={onExiting}
      >
        <div
          ref={menuRef}
          className={classnames(
            {
              [`${prefixCls}-menu`]: true,
              [`${prefixCls}-menu--${placement}`]: !!placement,
            },
            menuClassName,
          )}
        >
          {renderMenu()}
        </div>
      </Portal>
    </div>
  );
});

Dropdown.defaultProps = {
  placement: 'bottomLeft',
  trigger: 'hover',
  disabled: false,
};

export default memo(Dropdown);
