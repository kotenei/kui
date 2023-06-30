import React, { memo, useCallback } from 'react';

import { Portal } from '../portal';
import { PopPanelProps } from './typing';
import { getPopoverPosition } from '../../utils';

const PopPanel = (props: PopPanelProps) => {
  const { show, trigger, placement="bottomLeft", children, appear, unmountOnExit, timeout = 300 } = props;

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

  return (
    <Portal
      in={show}
      timeout={timeout}
      appear={appear}
      onEnter={onEnter}
      onEntering={onEntering}
      onExiting={onExiting}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </Portal>
  );
};

export default memo(PopPanel);
