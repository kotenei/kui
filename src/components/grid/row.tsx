import React, { memo, useMemo } from 'react';
import classnames from 'classnames';

import { RowProps } from './typing';

const Row = (props: RowProps) => {
  const { prefixCls = 'k-row', className, style, align, gutter, justify, children } = props;

  const _style = useMemo(() => {
    const gutterStyle = gutter
      ? {
          marginLeft: -gutter / 2,
          marginRight: -gutter / 2,
        }
      : null;
    return { ...style, ...gutterStyle };
  }, [gutter, style]);

  const classString = useMemo(() => {
    return classnames(prefixCls, className, {
      [`${prefixCls}--${justify}`]: !!justify,
      [`${prefixCls}--${align}`]: !!align,
    });
  }, [className, justify, align]);

  const cols = useMemo(() => {
    const ret = React.Children.map(children, (child: any) => {
      if (child && child.type && child.type.type && child.type.type.displayName === 'Col') {
        if (child.props && gutter !== undefined && gutter > 0) {
          return React.cloneElement(child, {
            style: {
              paddingLeft: gutter / 2,
              paddingRight: gutter / 2,
              ...child.props.style,
            },
          });
        }
        return child;
      }
      return null;
    });
    return ret;
  }, [children, gutter]);

  return (
    <div className={classString} style={_style}>
      {cols}
    </div>
  );
};

Row.defaultProps = {
  align: 'top',
  gutter: 0,
  justify: 'start',
};

export default memo(Row);
