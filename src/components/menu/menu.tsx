import React, { memo, useEffect } from 'react';
import classnames from 'classnames';

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

  const renderContent = () => {
    return React.Children.map(children, (child: any, i) => {
      if (!child) {
        return null;
      }
      return React.cloneElement(child, {
        ...child.props,
        prefixCls,
        level,
        parentIds: [],
        parentId: '',
        openKeys: state.openKeys,
        selectedKeys: state.selectedKeys,
        mode,
        inlineIndent
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

  return (
    <ul className={classString} {...others}>
      {renderContent()}
    </ul>
  );
};

Menu.defaultProps = {
  inlineIndent: 24,
  inlineCollapsed: false,
  mode: 'inline',
  selectable: true,
  multiple: false,
};

export default memo(Menu);
