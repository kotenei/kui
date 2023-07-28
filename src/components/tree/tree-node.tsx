import React, { memo, useContext, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';
import {
  AiOutlineCaretRight,
  AiOutlineCaretDown,
  AiOutlineFile,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from 'react-icons/ai';

import { Checkbox } from '../checkbox';
import { Icon } from '../icon';
import TreeNodeContent from './tree-node-content';
import { TreeContext } from './tree.context';
import { TreeNodeProps } from './typing';
import { uuid } from '../../utils';

const TreeNode = (props: TreeNodeProps) => {
  const { className, children, disabled, componentKey, parentKeys = [] } = props;
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
  } = treeContext;
  const contentElement = useRef(null);
  const expanded = expandedKeys && expandedKeys.indexOf(componentKey) > -1;

  const onExpaned = () => {
    if (!children) {
      return;
    }
    onTreeNodeExpand && onTreeNodeExpand(componentKey);
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
          if (checkedKeys.indexOf(child.key as string) > -1) {
            childCount++;
            info.type = childCount === (children as any).length ? 'all' : 'indeterminate';
          }

          if (child.props.children) {
            info.type = info.type !== 'none' ? 'indeterminate' : 'none';
            loopChildrenChecked(checkedKeys, child.props.children, info);
          }
        }
      });
    }
  };

  const getCheckInfo = (checkedKeys, children) => {
    const info = { type: 'none', checkedKeys: [] };
    loopChildrenChecked(checkedKeys, children, info);
    return info;
  };

  const renderSwitcher = () => {
    let icon = expanded ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />;
    if (showLine) {
      icon = expanded ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />;
      if (!children) {
        icon = <AiOutlineFile />;
      }
    }

    return (
      <span className={`${prefixCls}-switcher`}>
        {children || (!children && showLine) ? (
          <Icon
            className={children ? `${prefixCls}-switcher__expand` : ''}
            onClick={children ? onExpaned : undefined}
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

    if (!checked && (allSelected || parentChecked)) {
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
        initNodes(key, newParentKeys);

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
