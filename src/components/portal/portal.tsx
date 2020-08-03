import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import { PortalProps } from './typing';
import { Transition } from 'react-transition-group';
import { omit } from '../../utils';

const Portal = (props: PortalProps) => {
  const { container = document.body, timeout = 300, children, ...others } = props;

  const otherProps = omit(others, ['container']);

  return ReactDOM.createPortal(
    <Transition timeout={timeout} {...others}>
      {children}
    </Transition>,
    container,
  );
};

export default memo(Portal);
