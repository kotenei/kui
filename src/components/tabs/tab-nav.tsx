import React, { memo, useCallback, useRef, useEffect } from 'react';
import classnames from 'classnames';
import {
  AiOutlinePlusSquare,
  AiOutlineUp,
  AiOutlineLeft,
  AiOutlineDown,
  AiOutlineRight,
} from 'react-icons/ai';
import { domHelpers } from '../../utils';

import TabNavItem from './tab-nav-item';
import { Icon } from '../icon';
import { TabNavProps } from './typing';
import { useStateCallback } from '../../hooks';

const initState = {
  scrollTop: 0,
  scrollLeft: 0,
  inkWidth: 0,
  inkHeight: 0,
  inkLeft: 0,
  inkTop: 0,
  scrolling: false,
};

const TabNav = (props: TabNavProps) => {
  const {
    prefixCls,
    tabPosition,
    editable,
    hideAdd,
    extraContent,
    type,
    children,
    activeIndex,
    onTabClick,
    onEdit,
  } = props;

  const [state, setState] = useStateCallback(initState);
  const tabsInfo = useRef<any>({
    arrHeight: [],
    arrWidth: [],
    arrLeft: [],
    arrTop: [],
    count: 0,
    tabs: [],
    totalWidth: 0,
    totalHeight: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    scrollOffset: null,
  });

  const elmScroll = useRef<HTMLDivElement>(null);
  const isVertical = useRef(false);

  useEffect(() => {
    isVertical.current = tabPosition === 'left' || tabPosition === 'right';
    setTabsInfo();
    setScrolling();
  }, [tabPosition, children]);

  useEffect(() => {
    setTabsInfo();
    scrollTo(activeIndex);
  }, [activeIndex, state.scrolling]);

  const setTabsInfo = () => {
    const tabs: any =
      elmScroll.current && elmScroll.current.getElementsByClassName(`${prefixCls}-nav`);

    const arrHeight: any = [];
    const arrWidth: any = [];
    const arrLeft: any = [];
    const arrTop: any = [];
    const count = tabs && tabs.length;
    const scrollWidth = elmScroll.current ? domHelpers.width(elmScroll.current) : 0;
    const scrollHeight = elmScroll.current ? domHelpers.height(elmScroll.current) : 0;

    let left = 0;
    let top = 0;
    let totalWidth = 0;
    let totalHeight = 0;

    if (tabs) {
      for (let i = 0, w, h; i < tabs.length; i++) {
        w = domHelpers.outerWidth(tabs[i]);
        h = domHelpers.outerHeight(tabs[i]);
        totalWidth += w;
        totalHeight += h;
        arrWidth.push(w);
        arrHeight.push(h);
        arrLeft.push(left);
        arrTop.push(top);
        left += w;
        top += h;
      }
    }

    tabsInfo.current = {
      arrHeight,
      arrWidth,
      arrLeft,
      arrTop,
      count,
      tabs,
      totalWidth,
      totalHeight,
      scrollWidth,
      scrollHeight,
      scrollOffset: elmScroll.current ? domHelpers.offset(elmScroll.current) : null,
    };
  };

  const setScrolling = () => {
    const tmpState: any = {};

    if (
      (!isVertical.current && tabsInfo.current.totalWidth > tabsInfo.current.scrollWidth) ||
      (isVertical.current && tabsInfo.current.totalHeight > tabsInfo.current.scrollHeight)
    ) {
      tmpState.scrolling = true;
    } else {
      tmpState.scrolling = false;
      tmpState.scrollLeft = 0;
      tmpState.scrollTop = 0;
    }

    setState(tmpState);
  };

  const scrollTo = (index = activeIndex || 0) => {
    const max = children && children.length ? children.length - 1 : 0;

    if (index < 0) {
      index = 0;
    }
    if (index > max) {
      index = max;
    }

    const tmpState: any = {};

    if (
      (!isVertical.current && tabsInfo.current.totalWidth > tabsInfo.current.scrollWidth) ||
      (isVertical.current && tabsInfo.current.totalHeight > tabsInfo.current.scrollHeight)
    ) {
      tmpState.scrolling = true;
    } else {
      tmpState.scrolling = false;
      tmpState.scrollLeft = 0;
      tmpState.scrollTop = 0;
    }

    if (isVertical.current) {
      verticalScroll(index, tmpState);
    } else {
      horizontalScroll(index, tmpState);
    }
  };

  // 垂直滚动
  const verticalScroll = (index, newState) => {
    const { scrollTop } = state;
    const el = tabsInfo.current.tabs[index],
      offset = domHelpers.offset(el),
      position = domHelpers.position(el),
      marginBottom = domHelpers.style(el, 'marginBottom'),
      eh = tabsInfo.current.arrHeight[index] - (marginBottom ? parseFloat(marginBottom) : 0),
      th = offset.top + tabsInfo.current.arrHeight[index],
      nh = tabsInfo.current.scrollOffset.top + tabsInfo.current.scrollHeight;

    let top;

    if (offset.top < tabsInfo.current.scrollOffset.top) {
      top = tabsInfo.current.arrTop[index];
    }
    if (th > nh) {
      top = th - nh - (marginBottom ? parseFloat(marginBottom) : 0) + scrollTop;
    }

    const tmpState: any = {
      ...newState,
      inkTop: position.top,
      inkHeight: eh,
    };

    if (top !== undefined) {
      tmpState.scrollTop = top;
    }

    setState(tmpState);
  };

  // 水平滚动
  const horizontalScroll = (index, newState) => {
    const { scrollLeft } = state;

    const el = tabsInfo.current.tabs[index],
      offset = domHelpers.offset(el),
      position = domHelpers.position(el),
      marginRight = domHelpers.style(el, 'margin-right'),
      ew = tabsInfo.current.arrWidth[index] - (marginRight ? parseFloat(marginRight) : 0),
      tw = offset.left + tabsInfo.current.arrWidth[index],
      nw = tabsInfo.current.scrollOffset.left + tabsInfo.current.scrollWidth;

    let left;

    if (offset.left < tabsInfo.current.scrollOffset.left) {
      left = tabsInfo.current.arrLeft[index];
    }
    if (tw > nw) {
      left = tw - nw - (marginRight ? parseFloat(marginRight) : 0) + scrollLeft;
    }

    const tmpState: any = { ...newState, inkLeft: position.left, inkWidth: ew };

    if (left !== undefined) {
      tmpState.scrollLeft = left;
    }

    setState(tmpState);
  };

  const handleTabAdd = useCallback(
    e => {
      if (onEdit) {
        onEdit(e, 'add');
      }
    },
    [onEdit],
  );

  const handleTabRemove = useCallback(
    (e, index) => {
      if (onEdit) {
        onEdit(e, 'remove', index);
      }
    },
    [onEdit],
  );

  const handlePrevClick = useCallback(
    e => {
      let { scrollLeft, scrollTop } = state;

      if (isVertical.current) {
        scrollTop -= tabsInfo.current.scrollHeight;
        if (scrollTop <= 0) {
          scrollTop = 0;
        }
        setState({
          scrollTop,
        });
      } else {
        scrollLeft -= tabsInfo.current.scrollWidth;
        if (scrollLeft <= 0) {
          scrollLeft = 0;
        }
        setState({
          scrollLeft,
        });
      }
    },
    [state],
  );

  const handleNextClick = useCallback(
    e => {
      let { scrollLeft, scrollTop } = state;
      let maxLeft = 0,
        maxTop = 0;
      if (isVertical.current) {
        scrollTop += tabsInfo.current.scrollHeight;
        maxTop = tabsInfo.current.totalHeight - tabsInfo.current.scrollHeight;
        if (scrollTop >= maxTop) {
          scrollTop = maxTop;
        }
        setState({
          scrollTop,
        });
      } else {
        scrollLeft += tabsInfo.current.scrollWidth;
        maxLeft = tabsInfo.current.totalWidth - tabsInfo.current.scrollWidth;
        if (scrollLeft >= maxLeft) {
          scrollLeft = maxLeft;
        }
        setState({
          scrollLeft,
        });
      }
    },
    [state],
  );

  const renderExtraContent = () => {
    return (
      <div className={`${prefixCls}-bar__extra`}>
        {editable && !hideAdd ? (
          <Icon className={`${prefixCls}-bar__add`} onClick={handleTabAdd}>
            <AiOutlinePlusSquare />
          </Icon>
        ) : null}
        {extraContent}
      </div>
    );
  };

  const renderTabsContainer = () => {
    const { inkTop, inkLeft, inkWidth, inkHeight, scrollLeft, scrolling, scrollTop } = state;
    let navStyle, inkStyle;

    if (isVertical.current) {
      navStyle = { transform: `translate3d(0px, -${scrollTop}px, 0px)` };
      inkStyle = { height: inkHeight, transform: `translate3d(0px, ${inkTop}px, 0px)` };
    } else {
      navStyle = { transform: `translate3d(-${scrollLeft}px, 0px, 0px)` };
      inkStyle = { width: inkWidth, transform: `translate3d(${inkLeft}px, 0px, 0px)` };
    }

    return (
      <div className={classnames(`${prefixCls}-bar__content`, { scrolling })}>
        <span
          className={classnames(`${prefixCls}-bar__prev`, { disabled: !scrolling })}
          onClick={handlePrevClick}
        >
          <Icon>{isVertical.current ? <AiOutlineUp /> : <AiOutlineLeft />}</Icon>
        </span>
        <span
          className={classnames(`${prefixCls}-bar__next`, { disabled: !scrolling })}
          onClick={handleNextClick}
        >
          <Icon>{isVertical.current ? <AiOutlineDown /> : <AiOutlineRight />}</Icon>
        </span>
        <div className={`${prefixCls}-bar__scroll`} ref={elmScroll}>
          <ul className={`${prefixCls}-bar__navs`} style={navStyle}>
            {type === 'line' ? <li className={`${prefixCls}-ink`} style={inkStyle}></li> : null}
            {getTabs()}
          </ul>
        </div>
      </div>
    );
  };

  const getTabs = () => {
    const items: any = [];

    React.Children.forEach(children, (child: any, index) => {
      if (!child || !child.props) {
        return;
      }

      const { tab, disabled } = child.props;

      items.push(
        <TabNavItem
          key={index}
          index={index}
          prefixCls={prefixCls}
          disabled={disabled}
          editable={editable && children && children.length > 1}
          isActive={activeIndex === index}
          onClick={onTabClick}
          onClose={handleTabRemove}
        >
          {tab}
        </TabNavItem>,
      );
    });

    return items;
  };

  return (
    <div className={`${prefixCls}-bar`}>
      {isVertical.current ? null : renderExtraContent()}
      {renderTabsContainer()}
      {isVertical.current ? renderExtraContent() : null}
    </div>
  );
};

export default memo(TabNav);
