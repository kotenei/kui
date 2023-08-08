import React, { memo, useContext, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';
import {
  AiOutlineCaretRight,
  AiOutlineCaretDown,
  AiOutlineFile,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineLoading,
} from 'react-icons/ai';

import { Checkbox } from '../checkbox';
import { Icon } from '../icon';
import TreeNodeContent from './tree-node-content';
import { TreeContext } from './tree.context';
import { TreeNodeProps } from './typing';
import { uuid } from '../../utils';
import { useState } from '../../hooks';

const TreeNode = (props: TreeNodeProps) => {
  const { className, children, disabled, componentKey, parentKeys = [], isLeaf } = props;
  const prefixCls = `${props.prefixCls}-node`;
  const treeContext = useContext(TreeContext);
  const {
    checkedKeys,
    expandedKeys,
    checkable,
    showLine,
    initNodes,
    initCheckedKey,
    onTreeNodeExpand,
    onTreeNodeCheck,
    loadData,
  } = treeContext;
  const contentElement = useRef(null);
  const expanded = expandedKeys && expandedKeys.indexOf(componentKey) > -1;
  const [state, setState] = useState({
    loading: false,
  });

  const onExpaned = () => {
    onTreeNodeExpand && onTreeNodeExpand(componentKey);

    if (!children && loadData && !state.loading && !isLeaf) {
      setState(
        {
          loading: true,
        },
        () => {
          loadData(componentKey, children).then(() => {
            setState({
              loading: false,
            });
          });
        },
      );
    }
  };

  const onEnter = useCallback((node) => {
    node.style.height = '0px';
  }, []);

  const onEntering = useCallback((node) => {
    node.style.height = getContentHeight() + 'px';
  }, []);

  const onEntered = useCallback((node) => {
    node.style.height = 'auto';
  }, []);

  const onExit = useCallback((node) => {
    node.style.height = getContentHeight() + 'px';
    node.offsetHeight;
  }, []);

  const onExiting = useCallback((node) => {
    node.style.height = '0px';
  }, []);

  const getContentHeight = () => {
    const el = contentElement.current ? (contentElement.current as any) : null;
    return el ? el.offsetHeight || el.clientHeight || el.scrollHeight : 0;
  };

  const loopChildrenChecked = (checkedKeys, children, info) => {
    let childCount: number = 0;
    if (children) {
      React.Children.forEach(children, (child) => {
        if (child && child.type && child.type.type.displayName === 'TreeNode') {
          if (checkedKeys.indexOf(child.key) > -1) {
            childCount++;
          }

          if (child.props.children) {
            loopChildrenChecked(checkedKeys, child.props.children, info);
          }
        }
      });

      if (childCount > 0) {
        info.type = childCount === children.length ? 'all' : 'indeterminate';
      }
    }
  };

  const getCheckInfo = (checkedKeys, children) => {
    const info = { type: 'none' };
    loopChildrenChecked(checkedKeys, children, info);
    return info;
  };

  const renderSwitcher = () => {
    let icon = expanded ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />;
    if (showLine) {
      icon = expanded ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />;
      if (!children || isLeaf) {
        icon = <AiOutlineFile />;
      }
    }

    return (
      <span className={`${prefixCls}-switcher`}>
        {state.loading && (
          <Icon spin>
            <AiOutlineLoading />
          </Icon>
        )}
        {(children || (loadData && !isLeaf) || (!children && showLine)) && !state.loading ? (
          <Icon
            className={children ? `${prefixCls}-switcher__expand` : ''}
            onClick={children || loadData ? onExpaned : undefined}
          >
            {icon}
          </Icon>
        ) : null}
      </span>
    );
  };

  const renderCheckbox = () => {
    if (!checkable) {
      return null;
    }

    const parentKey = parentKeys[parentKeys.length - 1];
    const checkInfo = getCheckInfo(checkedKeys, children);
    const allSelected = checkInfo.type === 'all';
    const indeterminate = checkInfo.type === 'indeterminate';
    let checked = checkedKeys.indexOf(componentKey) > -1;
    let parentChecked = checkedKeys.indexOf(parentKey) > -1;

    if (!checked && (allSelected || parentChecked) && !disabled) {
      checked = true;
    }

    if (checked) {
      initCheckedKey(componentKey);
    }

    const onCheckboxChange = (e) => {
      onTreeNodeCheck(componentKey, parentKeys);
    };

    return (
      checkable && (
        <Checkbox
          className={`${prefixCls}-checkbox`}
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          onChange={onCheckboxChange}
        />
      )
    );
  };

  const renderChildren = () => {
    const content = React.Children.map(children, (child: any, index) => {
      if (child && child.type && child.type.type.displayName === 'TreeNode') {
        const key: string = child.key ? String(child.key) : uuid();
        const newParentKeys = [...parentKeys, componentKey];
        initNodes(key, newParentKeys, child.props && child.props.disabled);

        return React.cloneElement(child, {
          ...child.props,
          prefixCls: props.prefixCls,
          key,
          componentKey: key,
          parentKeys: newParentKeys,
        });
      }
      return null;
    });
    return content ? (
      <Transition
        in={expanded}
        timeout={300}
        appear
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
      >
        {(state) => {
          return (
            <ul ref={contentElement} className={`${prefixCls}-sub`}>
              {content}
            </ul>
          );
        }}
      </Transition>
    ) : null;
  };

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--disabled`]: disabled,
    },
    className,
  );

  return (
    <li className={classString}>
      {renderSwitcher()}
      {renderCheckbox()}
      <TreeNodeContent {...props} prefixCls={prefixCls} />
      {renderChildren()}
    </li>
  );
};

TreeNode.displayName = 'TreeNode';

export default memo(TreeNode);
