import React, { memo } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { MaskProps } from './typing';

const Mask = (props: MaskProps) => {
  const {
    prefixCls = 'k-mask',
    className,
    style,
    show,
    zIndex,
    timeout,
    transitionName,
    ...others
  } = props;
  const _style = { zIndex, ...style };

  const classString = classnames(prefixCls, className);

  return (
    <CSSTransition in={show} timeout={timeout} classNames={transitionName} unmountOnExit>
      <div className={classString} style={_style} {...others} />
    </CSSTransition>
  );
};

Mask.defaultProps = {
  show: false,
  zIndex: 800,
  timeout: 300,
  transitionName: 'fade',
};

export default memo(Mask);
