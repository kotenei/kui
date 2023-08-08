import React, { memo } from 'react';
import classnames from 'classnames';

const TableBodyContainer = React.forwardRef((props: any, ref) => {
  const { prefixCls = 'k-table', ...others } = props;
  return <div
    ref={ref}
    className={classnames(props.className, {
      [`${prefixCls}-body`]: true,
      [`${prefixCls}-body--scroll`]: props.scroll
    })}
    {...others}
  >
    {props.children}
  </div>
})

export default memo(TableBodyContainer)