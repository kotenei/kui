import React, { Children, memo, useCallback, useRef } from 'react';
import classnames from 'classnames';

import { Portal } from '../portal';
import { DropdownProps } from './typing';
import { useStateCallback } from '../../hooks';
import { getPopoverPosition } from '../../utils';

const Dropdown = (props: DropdownProps) => {
  const {
    prefixCls = 'k-dropdown',
    className,
    menu,
    trigger,
    placement,
    disabled,
    children,
    ...others
  } = props;
  const [state, setState] = useStateCallback({
    show: false,
  });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const classString = classnames(prefixCls, className);

  const show = () => {
    if (state.show) {
      return;
    }
    setState({
      show: true,
    });
  };

  const hide = () => {
    if (!state.show) {
      return;
    }
    setState({
      show: false,
    });
  };

  const onMouseEnter = useCallback(() => {
    if (trigger === 'click' || trigger === 'manual') {
      return;
    }
    show();
  }, [trigger, state.show]);

  const onMouseLeave = useCallback(() => {
    if (trigger === 'click' || trigger === 'manual') {
      return;
    }
    hide();
  }, [trigger, state.show]);

  const onClick = useCallback(() => {
    if (trigger === 'hover' || trigger === 'manual') {
      return;
    }
    if (state.show) {
      hide();
    } else {
      show();
    }
  }, [trigger, state.show]);

  const onEnter = useCallback(
    (node, isAppearing) => {
      if (triggerRef.current && menuRef.current) {
        const position = getPopoverPosition(triggerRef.current as any, node, placement);
        node.style.visibility = 'visible';
        node.style.left = position.left + 'px';
        node.style.top = position.top + 'px';
        node.style.opacity = 1;
        console.log(position);
      }
    },
    [placement],
  );

  const onExiting = useCallback(node => {
    node.style.opacity = 0;
  }, []);

  const renderMenu = () => {
    return (
      menu &&
      React.cloneElement(menu, {
        ...menu.props,
        // multiple,
        // selectedIds,
        mode: 'vertical',
        // className: classnames(menu.props.className, {
        //   [`${prefixCls}-menu`]: true,
        // }),
        // onMouseEnter: this.handleMenuEnter,
        // onMouseLeave: this.handleMenuLeave,
        // onSelect: this.handleMenuSelect,
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
        onExiting={onExiting}
        // onExited={onExited}
      >
        <div ref={menuRef} className={`${prefixCls}-menu`}>{renderMenu()}</div>
      </Portal>
    </div>
  );
};

Dropdown.defaultProps = {
  placement: 'bottomLeft',
  trigger: 'hover',
  disabled: false,
};

export default memo(Dropdown);
