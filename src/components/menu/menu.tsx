import React, { memo, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { MenuContext } from './context';
import { MenuProps } from './typing';
import { useStateCallback } from '../../hooks';
import { generateTree } from '../../utils';

const Menu = (props: MenuProps) => {
  const {
    prefixCls = 'k-menu',
    className,
    mode,
    defaultOpenKeys,
    openKeys,
    defaultSelectedKeys,
    selectedKeys,
    children,
    inlineIndent,
    multiple,
    onClick,
    ...others
  } = props;

  const [state, setState] = useStateCallback({
    openKeys: openKeys || defaultOpenKeys || [],
    selectedKeys: selectedKeys || defaultSelectedKeys || [],
    selectedSubMenuKeys: [],
  });
  const timer = useRef<number>();
  const treeInfo = useRef<any>();
  const level = 1;

  useEffect(() => {
    if (selectedKeys) {
      setState({
        selectedKeys,
      });
    }
    if (openKeys) {
      setState({
        openKeys,
      });
    }
  }, [selectedKeys, openKeys]);

  useEffect(() => {
    treeInfo.current = generateTree(props.children);
  }, []);

  const onItemClick = (componentKey, parentKeys, isLeaf) => {
    let newSelectedKeys = [...state.selectedKeys];
    let newOpenKeys = [...state.openKeys];
    const newSelectedSubMenuKeys: any = [];
    let index = -1;
    const newState: any = {};

    if (isLeaf) {
      index = newSelectedKeys.indexOf(componentKey);
      if (multiple) {
        if (index === -1) {
          newSelectedKeys.push(componentKey);
        } else {
          newSelectedKeys.splice(index, 1);
        }
      } else {
        newSelectedKeys = [componentKey];
      }
    } else {
      index = newOpenKeys.indexOf(componentKey);
      if (index === -1) {
        newOpenKeys.push(componentKey);
      } else {
        newOpenKeys.splice(index, 1);
      }
    }

    if (isLeaf) {
      const tmp: any = {};
      newSelectedKeys.forEach(key => {
        const node = treeInfo.current.dicNode[key];
        node.parentKeys.forEach(p => {
          if (!tmp[p]) {
            tmp[p] = p;
            newSelectedSubMenuKeys.push(p);
          }
        });
      });

      newState.selectedSubMenuKeys = newSelectedSubMenuKeys;
    }

    if (!('selectedKeys' in props)) {
      newState.selectedKeys = newSelectedKeys;
    }

    if (!('openKeys' in props)) {
      if (!multiple && isLeaf && mode !== "inline") {
        newOpenKeys = [];
      }
      newState.openKeys = newOpenKeys;
    }

    setState(newState);

    if (onClick) {
      onClick(componentKey, newSelectedKeys, newOpenKeys);
    }
  };

  const onItemHover = (componentKey, parentKeys, type, isLeaf) => {
    let newOpenKeys: string[] = [];
    const newState: any = { openKeys: [] };

    if (type === 'enter') {
      if (parentKeys.length) {
        newOpenKeys = parentKeys;
      }

      if (!isLeaf) {
        newOpenKeys.push(componentKey);
      }
    }

    if (!('openKeys' in props)) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      newState.openKeys = newOpenKeys;
      timer.current = window.setTimeout(() => {
        setState(newState);
      }, 50);
    }
  };

  const renderContent = () => {
    return React.Children.map(children, (child: any, i) => {
      if (!child) {
        return null;
      }

      return React.cloneElement(child, {
        ...child.props,
        prefixCls,
        level,
        parentKeys: [],
        parentKey: '',
        componentKey: child.key,
        mode,
        inlineIndent,
      });
    });
  };

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${mode}`]: !!mode,
      root: true,
    },
    className,
  );

  const contextValue = {
    ...state,
    onItemClick,
    onItemHover,
  };

  return (
    <MenuContext.Provider value={contextValue}>
      <ul className={classString} {...others}>
        {renderContent()}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  inlineIndent: 16,
  mode: 'inline',
  multiple: false,
};

export default memo(Menu);
