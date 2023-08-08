import React, { memo } from 'react';
import classnames from 'classnames';

const TableHeaderContainer = React.forwardRef((props: any, ref) => {
  const { prefixCls = 'k-table', ...others } = props;
  return <div className={classnames(props.className, {
    [`${prefixCls}-header`]: true
  })}
    {...others}
    ref={ref}
  >
    {props.children}
  </div>
})

export default memo(TableHeaderContainer)