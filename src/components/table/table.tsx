import React, { memo, useEffect, useMemo } from "react";
import classnames from 'classnames';
import TableHeaderContainer from "./table-header-container";
import TableBodyContainer from "./table-body-container";

import { TableProps } from "./typing";

const Table = (props: TableProps) => {
  const { prefixCls = 'k-table', className, bordered, dataSource } = props;

  useEffect(() => {

  }, [dataSource])

  const renderHeader = () => { }

  const renderBody = () => { }

  let classString = classnames({
    [prefixCls]: true,
    [`${prefixCls}-bordered`]: bordered
  }, className);

  return <div className={classString}>
    <div className={`${prefixCls}-middle`}>
      <div className={`${prefixCls}-scroller`}></div>
    </div>
    <div className={`${prefixCls}-bottom`}></div>
  </div>
}

export default memo(Table)