import React, { memo, useEffect, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { AiFillCaretDown, AiOutlineClose } from 'react-icons/ai';

import { Menu, MenuItem } from '../menu';
import { Dropdown } from '../dropdown';
import { SelectProps } from './typing';
import { useStateCallback } from '../../hooks';

const Select = (props: SelectProps) => {
  const {
    prefixCls = 'k-select',
    className,
    value,
    defaultValue,
    multiple,
    disabled,
    children,
    size,
    placeholder,
    onChange,
  } = props;
  const [state, setState] = useStateCallback({
    value: value || defaultValue || [],
  });
  const optionsMap = useRef({});

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setState({
        value,
      });
    }
  }, value);

  const onMenuItemClick = (key, selectedKeys, openedKeys) => {
    const newVal = multiple ? selectedKeys : [key];
    if (!('value' in props)) {
      setState({
        value: newVal,
      });
    }
    if (onChange) {
      onChange(newVal);
    }
  };

  const getChildren = (comp: any) => {
    if (comp && comp.props && comp.props.children) {
      if (Array.isArray(comp.props.children)) {
        return Array.from(comp.props.children).map((item) => getChildren(item));
      } else {
        return getChildren(comp.props.children);
      }
    } else {
      if (Array.isArray(comp)) {
        return Array.from(comp).map((item) => getChildren(item));
      } else {
        return comp;
      }
    }
  };

  const renderContent = () => {
    let val;
    if (!multiple) {
      val = state.value ? optionsMap.current[state.value.toString()] : '';
      return val;
    } else {
      return (
        <div className={`${prefixCls}-multiplelist`}>
          {state.value.map((v) => {
            val = optionsMap.current[v.toString()];
            return (
              <div className={`${prefixCls}-multiplelist-item`}>
                {val}
                <AiOutlineClose />
              </div>
            );
          })}
        </div>
      );
    }
  };

  const menus = useMemo(() => {
    const items: any = [];
    optionsMap.current = {};
    React.Children.forEach(children, (child: any, index) => {
      if (child && child.type && child.type.type.displayName === 'SelectOption') {
        const { key: optionKey, props: optionProps } = child;
        const { children, value } = optionProps;
        const finalChildren = getChildren(children);
        optionsMap.current[value] = Array.isArray(finalChildren)
          ? finalChildren.join('')
          : finalChildren;
        items.push(<MenuItem key={optionKey || value} {...optionProps} />);
      }
    });
    return (
      <Menu
        className={`${prefixCls}-menu`}
        selectedKeys={state.value}
        multiple={multiple}
        onClick={onMenuItemClick}
      >
        {items}
      </Menu>
    );
  }, [children, multiple, state.value]);

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--${disabled}`]: disabled,
      [`${prefixCls}--multiple`]: multiple,
    },
    className,
  );

  const val = useMemo(() => {
    let ret = state.value ? optionsMap.current[state.value.toString()] : '';
  }, [state.value]);

  return (
    <Dropdown className={classString} disabled={disabled} menu={menus} trigger="click">
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-container__content`}>
          {!state.value ? (
            <span className={`${prefixCls}-placeholder`}>{placeholder}</span>
          ) : (
            renderContent()
          )}
        </div>
        <AiFillCaretDown />
      </div>
    </Dropdown>
  );
};

export default memo(Select);
