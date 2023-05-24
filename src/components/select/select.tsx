import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { AiFillCaretDown, AiOutlineClose } from 'react-icons/ai';

import { Menu, MenuItem } from '../menu';
import { Dropdown } from '../dropdown';
import { SelectProps } from './typing';
import { useOutsideClick, useState } from '../../hooks';
import { eventOmitHandler } from '../../utils';

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
  const [state, setState] = useState({
    value: value || defaultValue || [],
    inputValue: '',
    show: false,
    hoverKey: '',
  });
  const optionsMap = useRef({});
  const filter = useRef<any>([]);
  const inputRef = useRef<any>(null);
  const $elmMenu = useRef<any>(null);

  const [dropdownRef] = useOutsideClick(
    {
      onClick: (e) => {
        setState({
          show: false,
        });
      },
    },
    [state.show],
  );

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setState({
        value,
      });
    }
  }, value);

  const onDropdownClick = useCallback(
    (e) => {
      if (!disabled) {
        setState({
          show: true,
        });
      }
    },
    [disabled],
  );

  const onDropdownKeyDown = useCallback(
    (e) => {
      eventOmitHandler(e);
      switch (e.key) {
        case 'ArrowUp':
          onArrowUp(e);
          break;
        case 'ArrowDown':
          onArrowDown(e);
          break;
        case 'Enter':
          onEnter(e);
          break;
        default:
          break;
      }
    },
    [state.value, state.hoverKey, state.inputValue, onChange],
  );

  const onMenuItemSelect = (key, selectedKeys, openedKeys) => {
    const newVal = multiple ? selectedKeys : [key];
    const newState: any = { inputValue: '' };
    if (!('value' in props)) {
      newState.value = newVal;
    }
    if (!multiple) {
      newState.show = false;
    }
    setState(newState);

    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }

    if (onChange) {
      onChange(newVal);
    }
  };

  const onMenuItemRemove = (val) => {
    const newVal = [...state.value];
    const index = newVal.findIndex((item) => item === val);
    if (index > -1) {
      newVal.splice(index, 1);
    }
    if (!('value' in props)) {
      setState({
        value: newVal,
      });
    }
    if (onChange) {
      onChange(newVal);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onMenuItemHover = useCallback((val, type) => {
    if (type === 'enter') {
      setState({
        hoverKey: val,
      });
    } else {
      setState({
        hoverKey: '',
      });
    }
  }, []);

  const onInputChange = useCallback((e) => {
    setState({
      inputValue: e.target.value,
      hoverKey: '',
    });
  }, []);

  const onInputKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'Backspace':
          const value = e.target.value;
          if (state.value && state.value.length && !value.length) {
            const newVal = [...state.value];
            newVal.pop();
            if (!('value' in props)) {
              setState({
                value: newVal,
              });
            }
            if (onChange) {
              onChange(newVal);
            }
          }
          break;
        case 'ArrowUp':
          eventOmitHandler(e);
          onArrowUp(e);
          break;
        case 'ArrowDown':
          eventOmitHandler(e);
          onArrowDown(e);
          break;
        case 'Enter':
          eventOmitHandler(e);
          onEnter(e);
          break;
        default:
          break;
      }
    },
    [state.value, state.hoverKey, state.inputValue, onChange],
  );

  const onArrowUp = (e) => {
    if (!filter.current && !filter.current.length) {
      return;
    }

    let index = filter.current.findIndex((i) => i.value === state.hoverKey);
    let item;

    const getNextItem = () => {
      let nextItem;
      while (index >= 0 && !nextItem) {
        nextItem = filter.current[index];
        if (nextItem.disabled) {
          nextItem = null;
          index--;
        }
      }
      return nextItem;
    };

    if (index >= 0) {
      index--;
      item = getNextItem();
    }

    if (index <= -1 && !item) {
      index = filter.current.length - 1;
      item = getNextItem();
    }

    if (!item) {
      return;
    }

    const $elm = $elmMenu.current.querySelectorAll('li')[index];
    if ($elm) {
      $elm.scrollIntoView({ behavior: 'smooth' });
      setState({
        hoverKey: item.value,
      });
    }
  };

  const onArrowDown = (e) => {
    if (!filter.current && !filter.current.length) {
      return;
    }

    let index = filter.current.findIndex((i) => i.value === state.hoverKey);
    let item;

    const getNextItem = () => {
      let nextItem;
      while (index < filter.current.length && !nextItem) {
        nextItem = filter.current[index];
        if (nextItem.disabled) {
          nextItem = null;
          index++;
        }
      }
      return nextItem;
    };

    if (index >= -1) {
      index++;
      item = getNextItem();
    }
    if (index >= filter.current.length && !item) {
      index = 0;
      item = getNextItem();
    }

    if (!item) {
      return;
    }

    const $elm = $elmMenu.current.querySelectorAll('li')[index];
    if ($elm) {
      $elm.scrollIntoView({ behavior: 'smooth' });
      setState({
        hoverKey: item.value,
      });
    }
  };

  const onEnter = (e) => {
    if (!state.hoverKey) {
      return;
    }

    let newVal = [...state.value];
    const index = newVal.findIndex((item) => item === state.hoverKey);
    if (multiple) {
      if (index === -1) {
        newVal.push(state.hoverKey);
      } else {
        newVal.splice(index, 1);
      }
    } else {
      if (index === -1) {
        newVal = [state.hoverKey];
      }
    }

    onMenuItemSelect(state.hoverKey, newVal, []);
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
    if (!multiple) {
      return state.value ? optionsMap.current[state.value.toString()] : '';
    } else {
      return (
        <div className={`${prefixCls}-multiplelist`}>
          {state.value.map((v) => {
            const val = optionsMap.current[v.toString()];
            return (
              <div className={`${prefixCls}-multiplelist-item`} key={val}>
                {val}
                {!disabled && (
                  <AiOutlineClose
                    onClick={(e) => {
                      onMenuItemRemove(val);
                    }}
                  />
                )}
              </div>
            );
          })}
          {!disabled && (
            <div className={`${prefixCls}-multiplelist-item ${prefixCls}-multiplelist-item-suffix`}>
              <input ref={inputRef} onChange={onInputChange} onKeyDown={onInputKeyDown} />
            </div>
          )}
        </div>
      );
    }
  };

  const menus = useMemo(() => {
    const items: any = [];
    optionsMap.current = {};
    filter.current = [];
    React.Children.forEach(children, (child: any, index) => {
      if (child && child.type && child.type.type.displayName === 'SelectOption') {
        const { key: optionKey, props: optionProps } = child;
        const { children, value } = optionProps;
        const finalChildren = getChildren(children);
        const val = optionKey || value;

        optionsMap.current[val] = Array.isArray(finalChildren)
          ? finalChildren.join('')
          : finalChildren;

        if (!state.inputValue) {
          items.push(<MenuItem key={val} {...optionProps} />);
          filter.current.push({
            text: optionsMap.current[val],
            value: val,
            disabled: optionProps.disabled,
          });
        } else {
          const inputValue = state.inputValue.toLowerCase();
          const orgValue = val.toLowerCase();
          if (orgValue.indexOf(inputValue) >= 0) {
            items.push(<MenuItem key={val} {...optionProps} />);
            filter.current.push({
              text: optionsMap.current[val],
              value: val,
              disabled: optionProps.disabled,
            });
          }
        }
      }
    });
    return (
      <Menu
        ref={$elmMenu}
        selectedKeys={state.value}
        multiple={multiple}
        hoverKey={state.hoverKey}
        onClick={onMenuItemSelect}
        onHover={onMenuItemHover}
      >
        {items}
      </Menu>
    );
  }, [children, multiple, state.value, state.inputValue, state.hoverKey]);

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--multiple`]: multiple,
      [`${prefixCls}--focus`]: state.show,
    },
    className,
  );

  return (
    <Dropdown
      ref={dropdownRef}
      className={classString}
      disabled={disabled}
      menu={menus}
      trigger="manual"
      show={state.show}
      menuClassName={`${prefixCls}-menu`}
      tabIndex={-1}
      onClick={onDropdownClick}
      onKeyDown={!multiple ? onDropdownKeyDown : undefined}
    >
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
