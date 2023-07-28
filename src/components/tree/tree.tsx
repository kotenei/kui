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
    onCheck,
    onExpand,
    onSelect,
  } = props;

  const [state, setState] = useState({
    checkedKeys: checkedKeys || defaultCheckedKeys || [],
    expandedKeys: expandedKeys || defaultExpandedKeys || [],
    selectedKeys: selectedKeys || defaultSelectedKeys || [],
    halfCheckedKeys: [],
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
    let newSelectedKeys = [...state.selectedKeys];
    const index = newSelectedKeys.indexOf(key);
    if (index > -1) {
      newSelectedKeys.splice(index, 1);
    } else {
      if (multiple) {
        newSelectedKeys.push(key);
      } else {
        newSelectedKeys = [key];
      }
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
    const index = newCheckedKeys.indexOf(key);
    const children = nodes.current
      .filter((item) => {
        return item.parentKeys.indexOf(key) > -1;
      })
      .map((item) => item.key);
    const siblings = nodes.current
      .filter((item) => {
        return isEqual(item.parentKeys, parentkeys);
      })
      .map((item) => item.key);

    if (index === -1) {
      newCheckedKeys.push(key, ...children);
      console.log(siblings);
    } else {
      newCheckedKeys = newCheckedKeys.filter((k) => {
        return k !== key && children.indexOf(k) === -1 && parentkeys.indexOf(k) === -1;
      });
    }

    if (!('checkedKeys' in props)) {
      setState({
        checkedKeys: newCheckedKeys,
      });
    }

    onCheck && onCheck(newCheckedKeys);
  };

  const initNodes = (key, parentKeys) => {
    if (!dicNode.current[key]) {
      const item = { key, parentKeys };
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
        initNodes(key, []);
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
    onTreeNodeSelect,
    onTreeNodeExpand,
    onTreeNodeCheck,
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
