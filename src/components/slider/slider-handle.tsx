import React, { memo, useCallback } from 'react';

import { Tooltip } from '../tooltip';
import { SliderHandleProps } from './typing';
import { eventOmitHandler } from '../../utils';

const SliderHandle = (props: SliderHandleProps) => {
  const {
    index = 0,
    prefixCls = 'k-slider',
    title,
    showTooltip,
    style,
    disabled,
    value = 0,
    onDragStart,
    onDragStop,
    onChange,
  } = props;

  const onMouseDown = (e) => {
    eventOmitHandler(e);
    start(e);
    //禁止文档选择事件
    document.onselectstart = function () {
      return false;
    };
    return false;
  };

  const onMouseMove = (e) => {
    move(e);
    return false;
  };

  const onMouseUp = (e) => {
    stop(e);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    return false;
  };

  const onMouseEnter = (e) => {
    if (props.onMouseEnter) {
      props.onMouseEnter(value);
    }
  };

  const onMouseLeave = (e) => {
    if (props.onMouseLeave) {
      props.onMouseLeave(value);
    }
  };

  const start = (e) => {
    const { target } = e;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    if (target.setCapture) {
      target.setCapture();
    }
    if (onDragStart) {
      onDragStart(e, index);
    }
  };

  const move = (e) => {
    if (onChange) {
      onChange(e, index);
    }
  };

  const stop = (e) => {
    if (onDragStop) {
      onDragStop(e);
    }
  };

  return (
    <Tooltip
      className={`${prefixCls}-tooltip`}
      title={title}
      show={showTooltip}
      style={{ zIndex: showTooltip ? 2 : 1 }}
    >
      <div
        className={`${prefixCls}-handle`}
        style={{ ...style, zIndex: showTooltip ? 2 : 1 }}
        onMouseDown={disabled ? undefined : onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </Tooltip>
  );
};

export default memo(SliderHandle);
