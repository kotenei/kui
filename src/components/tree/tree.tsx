import React, { memo, useEffect, useRef, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import isEqual from 'fast-deep-equal';

import { useState } from '../../hooks';
import { TreeContext } from './tree.context';
import { TreeProps } from './typing';
import { uuid } from '../../utils';

const Tree = (props: TreeProps) => {
  const {
    prefixCls = 'k-tree',
    className,
    showLine,
    children,
    checkedKeys,
    expandedKeys,
    selectedKeys,
    defaultCheckedKeys,
    defaultExpandedKeys,
    defaultSelectedKeys,
    checkable,
    selectable,
    dragable,
    multiple,
    loadData,
    onCheck,
    onExpand,
    onSelect,
    onDragOver,
    onDragEnd,
  } = props;

  const [state, setState] = useState({
    checkedKeys: checkedKeys || defaultCheckedKeys || [],
    expandedKeys: expandedKeys || defaultExpandedKeys || [],
    selectedKeys: selectedKeys || defaultSelectedKeys || [],
    dropInfo: null,
  });
  const tmpCheckedKeys = useRef<any>([]);
  const nodes = useRef<any>([]);
  const dicNode = useRef<any>({});

  useEffect(() => {
    if ('checkedKeys' in props) {
      setState({
        checkedKeys,
      });
    }
  }, [checkedKeys]);

  useEffect(() => {
    if ('expandedKeys' in props) {
      setState({
        expandedKeys,
      });
    }
  }, [expandedKeys]);

  useEffect(() => {
    if ('selectedKeys' in props) {
      setState({
        selectedKeys,
      });
    }
  }, [selectedKeys]);

  const onTreeNodeExpand = (key) => {
    const newExpandedKeys = [...state.expandedKeys];
    const index = newExpandedKeys.findIndex((item) => item === key);
    if (index >= 0) {
      newExpandedKeys.splice(index, 1);
    } else {
      newExpandedKeys.push(key);
    }

    if (!('expandedKeys' in props)) {
      setState({
        expandedKeys: newExpandedKeys,
      });
    }

    onExpand && onExpand(newExpandedKeys);
  };

  const onTreeNodeSelect = (key) => {
    if (!selectable) {
      return;
    }
    let newSelectedKeys = [...state.selectedKeys];

    if (multiple) {
      const index = newSelectedKeys.indexOf(key);
      if (index > -1) {
        newSelectedKeys.splice(index, 1);
      } else {
        newSelectedKeys.push(key);
      }
    } else {
      newSelectedKeys = [key];
    }

    if (!('selectedKeys' in props)) {
      setState({
        selectedKeys: newSelectedKeys,
      });
    }

    onSelect && onSelect(newSelectedKeys);
  };

  const onTreeNodeCheck = (key, parentkeys) => {
    let newCheckedKeys = [...tmpCheckedKeys.current];
    let tmpCount = 0;
    let index = newCheckedKeys.indexOf(key);
    let childNodes;

    const childrenKeys = nodes.current
      .filter((item) => {
        return item.parentKeys.indexOf(key) > -1 && !item.disabled;
      })
      .map((item) => item.key);

    parentkeys.reverse();

    if (index === -1) {
      newCheckedKeys.push(key);

      childrenKeys.forEach((k) => {
        if (newCheckedKeys.indexOf(k) === -1) {
          newCheckedKeys.push(k);
        }
      });

      parentkeys.forEach((parentKey) => {
        const node = dicNode.current[parentKey];
        if (node.disabled) {
          return false;
        }
        tmpCount = 0;

        childNodes = nodes.current.filter((item) => {
          return item.parentKeys.indexOf(parentKey) > -1 && !item.disabled;
        });

        childNodes.forEach((item) => {
          index = newCheckedKeys.indexOf(item.key);
          if (index !== -1) {
            tmpCount++;
          }
        });

        if (tmpCount === childNodes.length && newCheckedKeys.indexOf(parentKey) === -1) {
          newCheckedKeys.push(parentKey);
        }

        return true;
      });
    } else {
      newCheckedKeys = newCheckedKeys.filter((k) => {
        return k !== key && childrenKeys.indexOf(k) === -1 && parentkeys.indexOf(k) === -1;
      });
    }

    if (!('checkedKeys' in props)) {
      setState({
        checkedKeys: newCheckedKeys,
      });
    }

    onCheck && onCheck(newCheckedKeys);
  };

  const onTreeNodeDropOver = (info) => {
    setState({
      dropInfo: info,
    });
    onDragOver && onDragOver(info);
  };

  const onTreeNodeDropEnd = (result) => {
    result && onDragEnd && onDragEnd(state.dropInfo);
  };

  const initNodes = (key, parentKeys, disabled) => {
    if (!dicNode.current[key]) {
      const item = { key, parentKeys, disabled };
      nodes.current.push(item);
      dicNode.current[key] = item;
    }
  };

  const initCheckedKey = (key) => {
    if (tmpCheckedKeys.current.indexOf(key) === -1) {
      tmpCheckedKeys.current.push(key);
    }
  };

  const content = useMemo(() => {
    tmpCheckedKeys.current = [];
    nodes.current = [];
    dicNode.current = {};
    const ret = React.Children.map(children, (child: any, index) => {
      if (child && child.type && child.type.type.displayName === 'TreeNode') {
        const key: string = child.key ? String(child.key) : uuid();
        initNodes(key, [], child.props && child.props.disabled);
        return React.cloneElement(child, {
          ...child.props,
          prefixCls,
          key,
          componentKey: key,
          parentKeys: [],
        });
      }
      return null;
    });

    return ret;
  }, [children, state.checkedKeys]);

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--line`]: showLine,
    },
    className,
  );

  const contextValue = {
    ...state,
    checkable,
    selectable,
    dragable,
    showLine,
    initNodes,
    initCheckedKey,
    loadData,
    onTreeNodeSelect,
    onTreeNodeExpand,
    onTreeNodeCheck,
    onTreeNodeDropOver,
    onTreeNodeDropEnd,
  };

  return (
    <TreeContext.Provider value={contextValue}>
      <DndProvider backend={HTML5Backend}>
        <ul className={classString}>{content}</ul>
      </DndProvider>
    </TreeContext.Provider>
  );
};

export default memo(Tree);
