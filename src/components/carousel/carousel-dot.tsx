import React, { memo, useCallback } from 'react';
import classnames from 'classnames';

const CarouselDot = props => {
  const { prefixCls, active, index } = props;

  const onClick = useCallback(() => {
    if (props.onClick) {
      props.onClick(index);
    }
  }, [index, props.onClick]);

  return (
    <span
      className={classnames({
        [`${prefixCls}-dots__dot`]: true,
        active,
      })}
      onClick={onClick}
    />
  );
};

export default memo(CarouselDot);
