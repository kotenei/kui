import React, { memo, useEffect } from 'react';
import classnames from 'classnames';

import { MenuContext } from './context';
import { MenuProps } from './typing';
import { useStateCallback } from '../../hooks';

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
    inlineCollapsed,
    selectable,
    multiple,
    onClick,
    onSelected,
    onOpened,
    ...others
  } = props;

  const [state, setState] = useStateCallback({
    openKeys: openKeys || defaultOpenKeys || [],
    selectedKeys: selectedKeys || defaultSelectedKeys || [],
    selectedSubMenuKeys: [],
  });
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

  const onItemClick = (componentKey, parentKeys, isLeaf) => {
    let newSelectedKeys = [...state.selectedKeys];
    const newOpenKeys = [...state.openKeys];
    let index = -1;

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

    setState({
      selectedSubMenuKeys: parentKeys,
    });

    if (!('selectedKeys' in props)) {
      setState({
        selectedKeys: newSelectedKeys,
      });
    }

    if (!('openKeys' in props)) {
      setState({
        openKeys: newOpenKeys,
      });
    }

    if (onClick) {
      onClick(componentKey, newSelectedKeys);
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
    },
    className,
  );

  const contextValue = {
    ...state,
    onItemClick,
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
  inlineCollapsed: false,
  mode: 'inline',
  selectable: true,
  multiple: false,
};

export default memo(Menu);
