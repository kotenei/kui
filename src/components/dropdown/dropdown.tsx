import React, { memo, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { PopPanel } from '../pop-panel';
import { DropdownProps } from './typing';
import { useState, useOutsideClick } from '../../hooks';

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
      <PopPanel className={`${prefixCls}-menu-wrapper`} trigger={triggerRef.current} show={state.show} appear placement={placement}>
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
      </PopPanel>
    </div>
  );
});

Dropdown.defaultProps = {
  placement: 'bottomLeft',
  trigger: 'hover',
  disabled: false,
};

export default memo(Dropdown);
