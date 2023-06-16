import React, { memo } from 'react';
import classnames from 'classnames';

import { UploadDraggerProps } from './typing';
import { useState } from '../../hooks';

const UploadDragger = (props: UploadDraggerProps) => {
  const { children, disabled } = props;
  const prefixCls = `${props.prefixCls}-dragger`;
  const [state, setState] = useState({
    dragOver: false,
  });

  const onDragOver = (e) => {
    e.preventDefault();
    if (state.dragOver || disabled) {
      return;
    }
    setState({
      dragOver: true,
    });
    if (props.onDragOver) {
      props.onDragOver(e);
    }
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    if (!state.dragOver || disabled) {
      return;
    }
    setState({
      dragOver: false,
    });
    if (props.onDragLeave) {
      props.onDragLeave(e);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setState({
      dragOver: false,
    });
    if (props.onDrop) {
      props.onDrop(e);
    }
  };

  return (
    <div
      className={classnames({
        [prefixCls]: true,
        [`${prefixCls}--over`]: state.dragOver,
      })}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <span>{children}</span>
    </div>
  );
};

export default memo(UploadDragger);
