import React, { memo } from 'react';

import { UploadDraggerProps } from './typing';

const UploadDragger = (props: UploadDraggerProps) => {
  const { children } = props;
  const prefixCls = `${props.prefixCls}-dragger`;
  return (
    <div className={prefixCls}>
      <span>{children}</span>
    </div>
  );
};

export default memo(UploadDragger);
