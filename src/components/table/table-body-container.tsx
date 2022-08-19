import React, { memo } from 'react';
import classnames from 'classnames';

const TableBodyContainer = props => {
  return <div
    ref={props.elRef}
    className={classnames(props.className, {
      [`${props.prefixCls}-body`]: true,
      [`${props.prefixCls}-body--scroll`]: props.scroll
    })}
    style={props.style}
  >
    {props.children}
  </div>
}

export default memo(TableBodyContainer)