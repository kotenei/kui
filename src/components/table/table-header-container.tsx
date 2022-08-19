import React, { memo } from 'react';
import classnames from 'classnames';

const TableHeaderContainer = props => {
  return <div className={classnames(props.className, {
    [`${props.prefixCls}-header`]: true
  })}
    style={props.style}
  >
    {props.children}
  </div>
}

export default memo(TableHeaderContainer)