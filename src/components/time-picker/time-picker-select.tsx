import React, { memo, useCallback, useRef, useEffect } from 'react';
import classnames from 'classnames';

import { TimePickerSelectProps } from './typing';
import classNames from 'classnames';
import { useState } from '../../hooks';
import dom from '../../utils/dom';

const SelectItem = (props) => {
  const { className, value, index } = props;

  const onClick = useCallback(
    (e) => {
      if (props.onClick) {
        props.onClick(value, index);
      }
    },
    [index, props.onClick],
  );

  return (
    <li className={className} onClick={value ? onClick : undefined}>
      {value}
    </li>
  );
};

const TimePickerSelect = (props: TimePickerSelectProps) => {
  const { prefixCls, data, value, type, disabled, onItemClick } = props;
  const [state, setState] = useState({ activeIndex: 0 });
  const canScroll = useRef(true);
  const scroller = useRef<any>(null);
  const itemHeight = useRef(0);
  const arrHeight = useRef<number[]>([]);

  useEffect(() => {
    if (scroller.current) {
      const li = scroller.current.querySelector('li');
      itemHeight.current = dom.height(li);
    }
    scrollTo();
    arrHeight.current = [];
    data.forEach((item, index) => {
      arrHeight.current.push((index + 1) * itemHeight.current);
    });
  }, [data]);

  const getScrollTop = (index?: number) => {
    if (index === undefined) {
      index = data.findIndex((item) => {
        return item === value;
      });
    }
    if (index === -1) {
      return 0;
    }
    return index * itemHeight.current;
  };

  const scrollTo = (index?: number) => {
    const scrollTop = getScrollTop(index);
    scroller.current.scrollTop = scrollTop;
  };

  const onSelectItemClick = useCallback(
    (value, index) => {
      if (disabled) {
        return;
      }
      if (onItemClick) {
        onItemClick(type, value, index);
      }
      canScroll.current = false;

      setState(
        {
          activeIndex: index,
        },
        () => {
          scrollTo(index);
          setTimeout(() => {
            canScroll.current = true;
          }, 50);
        },
      );
    },
    [disabled, onItemClick],
  );

  const onScroll = useCallback(
    (e) => {
      const scrollTop = scroller.current.scrollTop;
      let activeIndex = 0;
      const half = itemHeight.current / 2;
      for (let i = 0; i < arrHeight.current.length; i++) {
        const height = arrHeight.current[i];
        if (height - scrollTop >= half) {
          activeIndex = i;
          break;
        }
      }
      if (props.onScroll && canScroll.current) {
        props.onScroll(type, data[activeIndex], activeIndex);
      }
      setState({
        activeIndex,
      });
    },
    [data, props.onScroll],
  );

  const renderList = () => {
    const { activeIndex } = state;
    const items: any = [];
    let flag = -2;
    items.push(<SelectItem key={flag} />);
    items.push(<SelectItem key={++flag} />);
    data.forEach((item, index) => {
      items.push(
        <SelectItem
          key={index}
          className={classnames({
            active: index == activeIndex,
          })}
          index={index}
          value={item}
          onClick={onSelectItemClick}
        >
          {item}
        </SelectItem>,
      );
      flag++;
    });
    items.push(<SelectItem key={++flag} />);
    items.push(<SelectItem key={++flag} />);
    return items;
  };

  const classString = classNames({
    [`${prefixCls}-select`]: true,
  });

  return (
    <div ref={scroller} className={classString} onScroll={onScroll}>
      <ul>{renderList()}</ul>
    </div>
  );
};

export default memo(TimePickerSelect);
