import React, { memo } from 'react';
import classnames from 'classnames';

const TableBodyContainer = React.forwardRef((props: any, ref) => {
  const { prefixCls = 'k-table', ...others } = props;
  return <div
    ref={props.elRef}
    className={classnames(props.className, {
      [`${prefixCls}-body`]: true,
      [`${prefixCls}-body--scroll`]: props.scroll
    })}
    {...others}
    ref={ref}
  >
    {props.children}
  </div>
})

export default memo(TableBodyContainer)