import React, { memo, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { Input } from '../input';
import { Menu, MenuItem } from '../menu';
import { PopPanel } from '../pop-panel';
import { useOutsideClick, useState, useMousePosition } from '../../hooks';
import { eventOmitHandler, domHelpers } from '../../utils';
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
    onBlur,
    onFocus,
    ...others
  } = props;

  const [state, setState] = useState({
    show: false,
    inputValue: value || defaultValue || '',
    focus: false,
    selectedKeys: [],
  });
  const $menu = useRef<any>(null);
  const active = useRef(-1);
  const timer = useRef<any>(null);
  const flag = useRef(false);
  const mounted = useRef(false);

  const [triggerRef] = useOutsideClick(
    {
      onClick: (e) => {
        setState({
          show: false,
          focus: false,
        });
      },
    },
    [],
  );

  useEffect(() => {
    if ('value' in props) {
      setState({
        inputValue: value,
      });
    }
  }, [value]);

  // useEffect(() => {
  //   onSearch && onSearch(state.inputValue);
  // }, [state.inputValue, onSearch]);

  // useEffect(() => {
  //   console.log('dd');
  //   const val = !mounted.current ? defaultValue || value : value;
  //   init(val);
  //   mounted.current = true;
  // }, [dataSource, value]);

  const init = (value) => {
    if (!dataSource || !dataSource.length || !value) {
      return;
    }
    const index = dataSource.findIndex((item) => item.value === value);
    const item = index === -1 ? null : dataSource[index];
    if (item) {
      setState({
        inputValue: item.text,
        selectedKeys: [item.value],
      });
      active.current = index;
    }
  };

  const onInputFocus = useCallback(
    (e) => {
      // setState(
      //   {
      //     show: true,
      //   },
      //   () => {
      //     if (state.inputValue && onSearch) {
      //       onSearch(state.inputValue);
      //     }
      //   },
      // );

      // if (dataSource && dataSource.length && dataSource.find((item) => item.value === '')) {
      //   setState({
      //     show: true,
      //   });
      // }

      onFocus && onFocus(e);
    },
    [state.inputValue, dataSource, onSearch, onFocus],
  );

  const onInputBlur = useCallback(
    (e) => {
      setState({
        focus: false,
      });
      onBlur && onBlur(e);
    },
    [onBlur],
  );

  const onInputChange = useCallback(
    (e) => {
      onChange && onChange(e);
      if ('value' in props) {
        return;
      }
      active.current = -1;
      setState({
        inputValue: e.target.value,
        selectedKeys: [],
        show: true,
      });
    },
    [onSearch],
  );

  const onMenuItemHover = useCallback(
    (val, type) => {
      if (!dataSource || flag.current) {
        return;
      }
      const index = dataSource.findIndex((item) => item.value === val);
      active.current = index;
      if (type === 'enter') {
        setState({
          selectedKeys: [val],
        });
      } else {
        setState({
          selectedKeys: [],
        });
      }
    },
    [dataSource],
  );

  const onMenuItemSelect = useCallback(
    (key, selectedKeys, openedKeys) => {
      if (!dataSource || !dataSource.length) {
        return;
      }

      const item = dataSource.find((i) => i.value === key);
      if (!item) {
        return;
      }

      setState({
        inputValue: item.text,
        show: false,
        selectedKeys: [key],
      });
      active.current = -1;

      onChange && onChange(item.value);
    },
    [dataSource, onChange],
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
        onSearch && onSearch(e.target.value);
        break;
    }

    timer.current = setTimeout(() => {
      flag.current = false;
    }, 300);
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
      if (item) {
        setState({
          inputValue: item.text,
          selectedKeys: [item.value],
          show: false,
        });
        return;
      }
    }

    active.current = -1;
    setState({
      show: false,
      selectedKeys: [],
    });
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
        onBlur={onInputBlur}
        onKeyUp={onKeyUp}
        onChange={onInputChange}
      />
      {renderContent()}
    </>
  );
};

export default memo(AutoComplete);
