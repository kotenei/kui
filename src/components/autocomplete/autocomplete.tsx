import React, { memo, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { Input } from '../input';
import { Menu, MenuItem } from '../menu';
import { PopPanel } from '../pop-panel';
import { useOutsideClick, useState } from '../../hooks';
import { AutoCompleteProps } from './typing';

const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  TAB: 9,
  ENTER: 13,
  Backspace: 8,
};

const AutoComplete = (props: AutoCompleteProps) => {
  const {
    prefixCls = 'k-autocomplete',
    className,
    placement = 'bottomLeft',
    dataSource,
    highlight,
    defaultValue,
    value,
    max = 10,
    onChange,
    onSearch,
    onFocus,
    onSelect,
    ...others
  } = props;

  const [state, setState] = useState({
    show: false,
    inputValue: value || defaultValue || '',
    selectedKeys: value || defaultValue ? value || defaultValue : [],
  });
  const $menu = useRef<any>(null);
  const active = useRef(-1);
  const timer = useRef<any>(null);
  const flag = useRef(false);
  const tmpSelectedKeys = useRef(state.selectedKeys);

  const [triggerRef] = useOutsideClick(
    {
      onClick: () => {
        setState({
          show: false,
          selectedKeys: tmpSelectedKeys.current,
        });
      },
    },
    [],
  );

  useEffect(() => {
    if ('value' in props) {
      tmpSelectedKeys.current = value ? [value] : [];
      setState({
        inputValue: value,
        selectedKeys: tmpSelectedKeys.current,
      });
    }
  }, [value]);

  useEffect(() => {
    if (
      state.show &&
      dataSource &&
      dataSource.length &&
      tmpSelectedKeys.current &&
      tmpSelectedKeys.current.length
    ) {
      active.current = dataSource.findIndex((item) => item.value === tmpSelectedKeys.current[0]);
    } else {
      active.current = -1;
    }
  }, [state.show, dataSource]);

  const onInputFocus = useCallback(
    (e) => {
      setState({
        show: true,
      });
      onFocus && onFocus(e);
    },
    [onFocus],
  );

  const onInputChange = useCallback(
    (e) => {
      tmpSelectedKeys.current = [e.target.value];

      onChange && onChange(e.target.value);
      onSearch && onSearch(e.target.value);

      if ('value' in props) {
        return;
      }

      setState({
        inputValue: e.target.value,
        selectedKeys: [e.target.value],
        show: true,
      });
    },
    [onSearch, onChange],
  );

  const onMenuItemHover = useCallback(
    (val, type) => {
      if (!dataSource || flag.current) {
        return;
      }
      if (type === 'enter') {
        setState({
          selectedKeys: [val],
        });
      } else {
        setState({
          selectedKeys: tmpSelectedKeys.current,
        });
      }
    },
    [dataSource],
  );

  const onMenuItemSelect = useCallback(
    (key, selectedKeys) => {
      if (!dataSource || !dataSource.length) {
        return;
      }

      const item = dataSource.find((i) => i.value === key);

      if (!item) {
        return;
      }

      const newState: any = {
        show: false,
      };

      if (!('value' in props)) {
        newState.inputValue = item.value;
        newState.selectedKeys = selectedKeys;
        tmpSelectedKeys.current = selectedKeys;
      }
      setState(newState);
      onSelect && onSelect(item.value, item);
      onChange && onChange(item.value);
    },
    [dataSource, onChange, onSelect],
  );

  const onKeyUp = (e) => {
    const { keyCode } = e;
    if (timer.current) {
      clearTimeout(timer.current);
    }
    flag.current = true;

    switch (keyCode) {
      case KEY.UP:
      case KEY.LEFT:
        move(-1);
        break;
      case KEY.DOWN:
      case KEY.RIGHT:
        move(1);
        break;
      case KEY.ENTER:
      case KEY.TAB:
        select();
        break;
      default:
        break;
    }

    timer.current = setTimeout(() => {
      flag.current = false;
    }, 200);
  };

  const move = (step) => {
    const { show } = state;
    if (!dataSource || dataSource.length === 0 || !show || !$menu.current) {
      return;
    }
    let len = dataSource.length - 1;
    if (max && max <= len) {
      len = max - 1;
    }

    active.current += step;
    if (active.current < 0) {
      active.current = len;
    } else if (active.current > len) {
      active.current = 0;
    }

    const $elmMenuItems = $menu.current.querySelectorAll('li');
    let curDataItem = dataSource[active.current],
      selectedKeys = [curDataItem.value],
      $curMenuItem = $elmMenuItems[active.current];

    setState(
      {
        selectedKeys,
      },
      () => {
        $curMenuItem.scrollIntoView({ block: 'end' });
      },
    );
  };

  const select = () => {
    if (dataSource && dataSource.length) {
      const item = dataSource[active.current];

      if (!item) {
        return;
      }

      const newState: any = {
        show: false,
      };

      if (!('value' in props)) {
        tmpSelectedKeys.current = [item.value];
        newState.inputValue = item.value;
        newState.selectedKeys = tmpSelectedKeys.current;
      }
      setState(newState);
      onChange && onChange(item.value);
    }
  };

  const getHighlight = (text) => {
    const { inputValue } = state;
    if (!inputValue) {
      return text;
    }
    const reg = new RegExp(`(${inputValue})`, 'ig');
    text = text.replace(reg, `<strong>$1</strong>`);
    return text;
  };

  const getMenus = () => {
    if (!dataSource || dataSource.length === 0) {
      return null;
    }
    const { selectedKeys } = state;
    let menus: any = [];
    for (let i = 0; i < dataSource.length; i++) {
      const item = dataSource[i];
      let text = item.text;
      if (highlight) {
        text = getHighlight(item.text);
      }
      menus.push(
        <MenuItem key={item.value}>
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </MenuItem>,
      );
      if (max && i == max - 1) {
        break;
      }
    }

    if (!menus.length) {
      return null;
    }

    const classString = classnames(
      {
        [`${prefixCls}-menu`]: true,
      },
      className,
    );

    return (
      <Menu
        ref={$menu}
        className={classString}
        mode="vertical"
        selectedKeys={selectedKeys}
        onHover={onMenuItemHover}
        onClick={onMenuItemSelect}
      >
        {menus}
      </Menu>
    );
  };

  const renderContent = () => {
    const menus = getMenus();

    return (
      <PopPanel
        className={`${prefixCls}`}
        trigger={triggerRef.current}
        show={state.show && menus !== null}
        placement={placement}
      >
        {menus}
      </PopPanel>
    );
  };

  return (
    <>
      <Input
        ref={triggerRef}
        className={`${prefixCls}-input`}
        {...others}
        value={state.inputValue}
        onFocus={onInputFocus}
        onKeyUp={onKeyUp}
        onChange={onInputChange}
      />
      {renderContent()}
    </>
  );
};

export default memo(AutoComplete);
