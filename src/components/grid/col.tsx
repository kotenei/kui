import React, { memo, useMemo } from 'react';
import classnames from 'classnames';

import { ColProps } from './typing';

const prefixCls = 'k-col';

const Col = (props: ColProps) => {
  const { className, style, children, span, offset } = props;
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

  const classString = useMemo(() => {
    let responsiveClasses;

    sizes.forEach((size: string) => {
      let sizeSpan;
      if (typeof props[size] === 'number') {
        sizeSpan = props[size];
      }
      responsiveClasses = {
        ...responsiveClasses,
        [`${prefixCls}-${size}-${sizeSpan}`]: sizeSpan !== undefined,
      };
    });

    return classnames(
      {
        [`${prefixCls}`]: true,
        [`${prefixCls}-${span}`]: span !== undefined,
        [`${prefixCls}-offset-${offset}`]: offset !== undefined,
      },
      className,
      responsiveClasses,
    );
  }, [props]);

  return (
    <div className={classString} style={style}>
      {children}
    </div>
  );
};

Col.displayName = 'Col';
Col.defaultProps = {
  offset: 0,
};

export default memo(Col);
