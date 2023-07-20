import React, { memo, useCallback, useRef } from 'react';
import classnames from 'classnames';

import { Input } from '../input';
import { Menu, MenuItem } from '../menu';
import { PopPanel } from '../pop-panel';
import { useOutsideClick, useState } from '../../hooks';
import { eventOmitHandler, domHelpers } from '../../utils';
import { AutoCompleteProps } from './typing';

const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  TAB: 9,
  ENTER: 13,
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
    ...others
  } = props;

  const [state, setState] = useState({
    show: false,
    inputVal: '',
    focus: false,
    selectedKeys: [],
  });
  const $menu = useRef<any>(null);
  const active = useRef(-1);
  const timer = useRef<any>(null);

  const [triggerRef] = useOutsideClick(
    {
      onClick: (e) => {
        setState({
          show: false,
        });
      },
    },
    [],
  );

  const onInputClick = useCallback((e) => {
    setState({
      show: true,
    });
  }, []);

  const onInputChange = useCallback(
    (e) => {
      active.current = -1;
      setState({
        inputVal: e.target.value,
      });
      onSearch && onSearch(e.target.value);
    },
    [onSearch],
  );

  const onMenuItemHover = useCallback((val, type) => {
    active.current = -1;
    console.log('asdf')
    if (type === 'enter') {
      setState({
        selectedKeys: [val],
      });
    } else {
      setState({
        selectedKeys: [],
      });
    }
  }, []);

  const onKeyUp = (e) => {
    const { target, keyCode } = e;
    let val = target.value.trim();
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
        // this.select();
        break;
      default:
        // this.search(val);
        break;
    }
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

  const getHighlight = (text) => {
    const { inputVal } = state;
    if (!inputVal) {
      return text;
    }
    const reg = new RegExp(`(${inputVal})`, 'ig');
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
        value={state.inputVal}
        onClick={onInputClick}
        onKeyUp={onKeyUp}
        onChange={onInputChange}
      />
      {renderContent()}
    </>
  );
};

export default memo(AutoComplete);
