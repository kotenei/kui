import React, { memo, CSSProperties } from 'react';

import { CarouselPanelProps } from './typing';

const CarouselPanel = (props: CarouselPanelProps) => {
  const { prefixCls, children, width, height, vertical } = props;
  const style: CSSProperties = {};
  if (vertical) {
    style.height = height;
  } else {
    style.width = width;
  }

  return (
    <div className={`${prefixCls}-panel`} style={style}>
      {children}
    </div>
  );
};

export default memo(CarouselPanel);
