import React, { memo, useEffect, useMemo, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';

import TableHeaderContainer from './table-header-container';
import TableBodyContainer from './table-body-container';
import { Checkbox } from '../checkbox';
import { TableProps } from './typing';
import { omit, uuid, domHelpers } from '../../utils';
import { useState } from '../../hooks';
import { Icon } from '../icon';

const FLEX_WIDTH = 50;

const Table = (props: TableProps) => {
  const {
    prefixCls = 'k-table',
    className,
    bordered,
    dataSource,
    stripe,
    scrollHeight,
    rowExpansion,
    rowSelection,
  } = props;
  const columns = useRef<any>(null);
  const fixedLeft = useRef<any>(null);
  const fixedRight = useRef<any>(null);
  const theadRows = useRef<any>(null);
  const elmTable = useRef<any>(null);
  const elmHeader = useRef<any>(null);
  const elmBody = useRef<any>(null);
  const elmScroller = useRef<any>(null);
  const timer = useRef<any>(null);

  const [state, setState] = useState({
    columnsWidth: {},
    heightInfo: {
      header: 0,
      body: 0,
    },
    scrollLeft: 0,
  });

  useEffect(() => {
    initNode();
    initSize();
    setTimeout(() => {
      initSize();
    }, 100);
  }, [props.children]);

  useEffect(() => {
    window.addEventListener('resize', initSize);
    return () => {
      window.removeEventListener('resize', initSize);
    };
  }, []);

  const initNode = () => {
    let maxLevel = 1,
      nodes: any = [],
      rows: any = [],
      tmpColumns: any = [],
      tmpFixedLeft: any = [],
      tmpFixedRight: any = [];

    const initNode = function (node, parentNode?) {
      node.id = uuid();
      node.level = parentNode ? parentNode.level + 1 : 1;
      node.parentIds = parentNode
        ? parentNode.parentIds.length > 0
          ? [parentNode.id, ...parentNode.parentIds]
          : [parentNode.id]
        : [];
      node.path = parentNode ? parentNode.path + node.id + '/' : `/${node.id}/`;
      node.parentId = parentNode ? parentNode.id : '';
    };

    const loop = function (child, curNode) {
      if (maxLevel < curNode.level) {
        maxLevel = curNode.level;
      }
      if (child.props.children) {
        let colSpan = 0;
        React.Children.map(child.props.children, (subChild) => {
          const subNode: any = omit(subChild.props, ['children']);
          initNode(subNode, curNode);
          nodes.push(subNode);
          loop(subChild, subNode);
          colSpan += subNode.colSpan ? parseInt(subNode.colSpan, 10) : 0;
        });
        curNode.hasChild = true;
        curNode.colSpan = colSpan;
      } else {
        const { width, style } = child.props;
        curNode.hasChild = false;
        curNode.colSpan = 1;
        if (width !== undefined) {
          curNode.width = width;
        }
        if (style && typeof style.width === 'number') {
          curNode.width = style.width;
        }
        tmpColumns.push(curNode);
      }
    };

    React.Children.map(props.children, (child: any) => {
      let node = omit(child.props, ['children']);
      initNode(node);
      nodes.push(node);
      loop(child, node);
    });

    for (let i = 0; i < maxLevel; i++) {
      rows.push([]);
      tmpFixedLeft.push([]);
      tmpFixedRight.push([]);
    }

    let fixed;
    nodes.forEach((node) => {
      let rowIndex = node.level - 1;

      if (!node.hasChild) {
        node.rowSpan = maxLevel - node.level + 1;
      } else {
        node.rowSpan = 1;
      }

      if (!node.fixed && !node.parentId) {
        fixed = '';
      }

      if ((node.fixed && !node.parentId) || fixed) {
        if (!fixed || !node.parentId) {
          fixed = node.fixed;
        }
        if (fixed === 'left' || fixed === true) {
          tmpFixedLeft[rowIndex].push(node);
          node.fixed = 'left';
        } else {
          tmpFixedRight[rowIndex].push(node);
          node.fixed = 'right';
        }
      } else {
        rows[rowIndex].push(node);
      }
    });

    columns.current = tmpColumns;
    fixedLeft.current = tmpFixedLeft;
    fixedRight.current = tmpFixedRight;
    theadRows.current = rows;
  };

  const initSize = () => {
    const columnsWidth: any = {};
    const totalWidth = domHelpers.width(elmTable.current);
    const tableHeaderHeight = domHelpers.width(elmHeader.current);
    const tableBodyHeight = domHelpers.height(elmBody.current);

    let tmpWidth = 0;
    let count = 0;

    if (rowSelection) {
      tmpWidth += FLEX_WIDTH;
      columnsWidth['checkbox'] = FLEX_WIDTH;
    }

    if (rowExpansion) {
      tmpWidth += FLEX_WIDTH;
      columnsWidth['expand'] = FLEX_WIDTH;
    }

    if (columns.current) {
      columns.current.forEach((item) => {
        if (item.width) {
          tmpWidth += item.width;
          columnsWidth[item.id] = item.width;
        } else {
          columnsWidth[item.id] = 0;
          count++;
        }
      });
    }

    const diff = Math.abs(totalWidth - tmpWidth);
    const width = count == 0 ? 0 : parseInt(String(diff / count), 10);

    for (let key in columnsWidth) {
      if (columnsWidth[key] === 0) {
        columnsWidth[key] = width;
      }
    }

    setState({
      columnsWidth,
      heightInfo: {
        header: tableHeaderHeight,
        body: tableBodyHeight,
      },
    });
  };

  const getColGroupInfo = () => {
    const { columnsWidth } = state;
    const colGroup: any = [];
    let key = 0;
    let totalWidth = 0;

    if (columns.current) {
      if (rowSelection) {
        colGroup.push(<col key={key++} style={{ width: columnsWidth['checkbox'] }} />);
        totalWidth += columnsWidth['checkbox'];
      }

      if (rowExpansion) {
        colGroup.push(<col key={key++} style={{ width: columnsWidth['expand'] }} />);
        totalWidth += columnsWidth['expand'];
      }
      columns.current.forEach((column) => {
        const colStyle = { width: columnsWidth[column.id] || 'auto' };
        colGroup.push(<col key={key++} style={colStyle} />);
        totalWidth += columnsWidth[column.id] || 0;
      });
    }

    return { colGroup, totalWidth: totalWidth || 'auto' };
  };

  const onScroll = useCallback((e) => {
    const { target } = e;
    const scrollLeft = target.scrollLeft;
    elmHeader.current.scrollLeft = scrollLeft;
  }, []);

  const onExpanded = useCallback(
    (e, key) => {
      if (!rowExpansion) {
        return;
      }
      const { expandedRowKeys = [], onChange } = rowExpansion;
      const newExpandedKeys = [...expandedRowKeys];
      const index = newExpandedKeys.indexOf(key);

      if (index > -1) {
        newExpandedKeys.splice(index, 1);
      } else {
        newExpandedKeys.push(key);
      }

      if (onChange) {
        onChange(newExpandedKeys, e);
      }

      setState(
        {
          expandedKeys: newExpandedKeys,
        },
        () => {
          initSize();
        },
      );
    },
    [rowExpansion],
  );

  const onCheckAll = useCallback(
    (e, checked) => {
      if (!rowSelection) {
        return;
      }
      const newSelectedRowKeys: any = [];
      if (dataSource && dataSource.length && checked) {
        dataSource.forEach((item) => {
          newSelectedRowKeys.push(item.id || item.key);
        });
      }
      if (rowSelection.onChange) {
        rowSelection.onChange(newSelectedRowKeys, e);
      }
    },
    [dataSource, rowSelection],
  );

  const onCheck = useCallback(
    (e, checked) => {
      if (rowSelection) {
        const { selectedRowKeys = [], onChange, onSelect } = rowSelection;
        const newSelectedRowKeys = [...selectedRowKeys];
        const checkedValue = e.target.value;
        const arrVal = checkedValue.split('|');
        const index = selectedRowKeys.indexOf(arrVal[0]);

        if (index > -1) {
          newSelectedRowKeys.splice(index, 1);
        } else {
          newSelectedRowKeys.push(arrVal[0]);
        }

        if (onChange) {
          onChange(newSelectedRowKeys, e);
        }

        if (onSelect) {
          onSelect(dataSource[arrVal[1]], checked, newSelectedRowKeys, e);
        }
      }
    },
    [dataSource, rowSelection],
  );

  const scrollInfo = useMemo(() => {
    const info = {
      scrollX: false,
      scrollY: false,
    };

    if (
      !elmTable.current ||
      !state.columnsWidth ||
      !Object.keys(state.columnsWidth).length ||
      !state.heightInfo.body
    ) {
      return info;
    }

    const width = domHelpers.width(elmTable.current);
    let tableWidth = 0;

    for (let key in state.columnsWidth) {
      tableWidth += state.columnsWidth[key];
    }
    info.scrollX = tableWidth > width;

    if (scrollHeight && scrollHeight < state.heightInfo.body) {
      info.scrollY = true;
    }

    return info;
  }, [scrollHeight, state]);

  const tableHeader = useMemo(() => {
    const colGroupInfo = getColGroupInfo();
    const content: any = [];
    let checkedCount = 0;

    if (dataSource && dataSource.length > 0) {
      dataSource.forEach((item) => {
        if (
          rowSelection &&
          rowSelection.selectedRowKeys &&
          rowSelection.selectedRowKeys.indexOf(item.id || item.key) > -1
        ) {
          checkedCount++;
        }
      });
    }

    if (theadRows.current) {
      theadRows.current.forEach((row, rowIndex) => {
        const cells: any = [];
        row.forEach((cell, cellIndex) => {
          if (rowIndex === 0 && cellIndex === 0) {
            if (rowSelection) {
              cells.push(
                <th
                  className="checkbox-cell"
                  key={`thCell-checkbox-${cellIndex}`}
                  rowSpan={theadRows.current.length}
                >
                  <Checkbox
                    color="primary"
                    indeterminate={checkedCount > 0}
                    checked={checkedCount === dataSource.length}
                    disabled={!dataSource || dataSource.length === 0}
                    onChange={onCheckAll}
                  />
                </th>,
              );
            }

            if (rowExpansion) {
              cells.push(
                <th
                  className="expand-cell"
                  key={`thCell-expand-${cellIndex}`}
                  rowSpan={theadRows.current.length}
                />,
              );
            }
          }

          cells.push(
            <th
              key={`tbRow-${cellIndex}`}
              colSpan={cell.colSpan === 1 ? null : cell.colSpan}
              rowSpan={cell.rowSpan === 1 ? null : cell.rowSpan}
              style={{ textAlign: cell.align }}
            >
              <div className={`${prefixCls}-thead-content`}>
                <div className={`${prefixCls}-thead-content__title`}>{cell.title}</div>
              </div>
            </th>,
          );
        });
        content.push(<tr key={rowIndex}>{cells}</tr>);
      });
    }

    return (
      <table className={`${prefixCls}-fixed`} style={{ width: colGroupInfo.totalWidth }}>
        <colgroup>{colGroupInfo.colGroup}</colgroup>
        <thead className={`${prefixCls}-thead`}>{content}</thead>
      </table>
    );
  }, [state.columnsWidth, rowExpansion, rowSelection, dataSource]);

  const tableBody = useMemo(() => {
    const colGroupInfo = getColGroupInfo();
    const tbodyRows: any = [];

    if (dataSource && dataSource.length) {
      dataSource.forEach((item, index) => {
        let cells: any = [];
        const isEven = index % 2 == 0;
        const expanded =
          rowExpansion &&
          rowExpansion.expandedRowKeys &&
          rowExpansion.expandedRowKeys.indexOf(item.key || item.id) > -1;

        if (columns.current) {
          columns.current.forEach((column, cellIndex) => {
            if (cellIndex === 0) {
              if (rowSelection) {
                const { selectedRowKeys = [] } = rowSelection;
                const checked = selectedRowKeys.indexOf(item.id || item.key) > -1;

                cells.push(
                  <td key={`tbCell-checkbox-${cellIndex}`} className="checkbox-cell">
                    <Checkbox
                      color="primary"
                      checked={checked}
                      value={`${item.id || item.key}|${index}`}
                      onChange={onCheck}
                    />
                  </td>,
                );
              }

              if (rowExpansion) {
                cells.push(
                  <td key={`tbCell-expand-${cellIndex}`} className="expand-cell">
                    <Icon onClick={(e) => onExpanded(e, item.key || item.id)}>
                      {expanded ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />}
                    </Icon>
                  </td>,
                );
              }
            }

            cells.push(
              <td key={`tbCell-${cellIndex}`}>
                {column.render ? column.render(item[column.field], item) : item[column.field]}
              </td>,
            );
          });
        }

        tbodyRows.push(
          <tr
            key={`tbRow-${index}`}
            className={classnames({
              'stripe-row': !isEven && stripe,
            })}
          >
            {cells}
          </tr>,
        );

        if (rowExpansion && columns.current) {
          cells = [];
          if (rowSelection) {
            cells.push(<td key={uuid()} />);
          }
          cells.push(<td key={uuid()} />);
          cells.push(
            <td key={`tbCell-expand-${index}`} colSpan={columns.current.length}>
              {rowExpansion &&
                rowExpansion.expandedRowRender &&
                rowExpansion.expandedRowRender(item, index, expanded)}
            </td>,
          );
          tbodyRows.push(
            <tr
              key={`tbRow-expand-${index}`}
              className={classnames({
                [`expand-row`]: true,
                [`expand-row--show`]: expanded,
              })}
            >
              {cells}
            </tr>,
          );
        }
      });
    }

    return (
      <table className={`${prefixCls}-fixed`} style={{ width: colGroupInfo.totalWidth }}>
        <colgroup>{colGroupInfo.colGroup}</colgroup>
        <tbody className={`${prefixCls}-tbody`}>{tbodyRows}</tbody>
      </table>
    );
  }, [state.columnsWidth, dataSource, stripe, rowExpansion, rowSelection]);

  let classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--bordered`]: bordered,
    },
    className,
  );

  return (
    <div className={classString} ref={elmTable}>
      <div className={`${prefixCls}-middle`}>
        <div className={`${prefixCls}-scroller`} ref={elmScroller}>
          <TableHeaderContainer
            ref={elmHeader}
            style={{
              overflowX: !scrollInfo.scrollX ? 'hidden' : undefined,
              overflowY: !scrollInfo.scrollY ? 'hidden' : undefined,
              marginBottom: !scrollInfo.scrollX ? 0 : undefined,
            }}
          >
            {tableHeader}
          </TableHeaderContainer>
          <TableBodyContainer
            ref={elmBody}
            style={{
              maxHeight: scrollInfo.scrollY ? scrollHeight : undefined,
              overflowX: scrollInfo.scrollX ? 'scroll' : 'hidden',
              overflowY: scrollInfo.scrollY ? 'scroll' : 'hidden',
            }}
            onScroll={onScroll}
          >
            {tableBody}
          </TableBodyContainer>
        </div>
      </div>
      <div className={`${prefixCls}-bottom`}></div>
    </div>
  );
};

export default memo(Table);
