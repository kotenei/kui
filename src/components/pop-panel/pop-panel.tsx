import React, { memo, useCallback, useEffect } from 'react';

import { Portal } from '../portal';
import { PopPanelProps } from './typing';
import { getPopoverPosition } from '../../utils';
import classNames from 'classnames';

const PopPanel = React.forwardRef((props: PopPanelProps, ref: any) => {
  const {
    prefixCls = 'k-poppanel',
    className,
    show,
    trigger,
    placement = 'bottomLeft',
    children,
    appear = true,
    mountOnEnter,
    unmountOnExit = true,
    timeout = 300,
    style,
  } = props;

  useEffect(() => {}, []);

  const onEnter = useCallback(
    (node, isAppearing) => {
      if (trigger) {
        const position = getPopoverPosition(trigger as any, node, placement);
        node.style.visibility = 'visible';
        node.style.left = position.left + 'px';
        node.style.top = position.top + 'px';
        node.style.opacity = 0;
      }
    },
    [trigger, placement],
  );

  const onEntering = useCallback((node) => {
    node.style.opacity = 1;
    node.style.visibility = 'visible';
  }, []);

  const onExiting = useCallback((node) => {
    node.style.opacity = 0;
    node.style.visibility = 'hidden';
  }, []);

  const classString = classNames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${placement}`]: !!placement,
    },
    className,
  );

  return (
    <Portal
      in={show}
      timeout={timeout}
      appear={appear}
      onEnter={onEnter}
      onEntering={onEntering}
      onExiting={onExiting}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      <div ref={ref} className={classString} style={style}>
        {children}
      </div>
    </Portal>
  );
});

export default memo(PopPanel);
