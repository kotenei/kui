import React, { memo, useMemo, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { domHelpers } from '../../utils';

import { TabContentProps } from './typing';
import { useStateCallback } from '../../hooks';

const TabContent = (props: TabContentProps) => {
  const { prefixCls, activeIndex, children, tabPosition } = props;
  const [state, setState] = useStateCallback({
    scrollLeft: 0,
  });
  const element = useRef<HTMLDivElement>(null);
  const isVertical = useRef(false);

  useEffect(() => {
    isVertical.current = tabPosition === 'left' || tabPosition === 'right';
    scrollTo(activeIndex);
  }, [activeIndex, tabPosition]);

  const getTabInfo = () => {
    const width = element.current ? domHelpers.width(element.current) : 0;
    const totalWidth = children && children.length ? children.length * width : 0;
    return {
      width,
      totalWidth,
    };
  };

  const scrollTo = (index?) => {
    const max = children && children.length ? children.length - 1 : 0;
    const tabInfo = getTabInfo();
    let scrollLeft = 0;
    index = index !== undefined ? index : activeIndex;
    if (index < 0) {
      index = 0;
    }
    if (index > max) {
      index = max;
    }
    scrollLeft = index * tabInfo.width;

    if (isVertical.current) {
      setState({
        scrollLeft: 0,
      });
    } else {
      setState({
        scrollLeft,
      });
    }
  };

  const renderContent = () => {
    const items: any = [];
    React.Children.forEach(children, (child: any, index) => {
      if (!child || !child.props) {
        return;
      }

      const classString = classnames({
        [`${prefixCls}-panel`]: true,
        active: activeIndex === index,
      });

      items.push(
        <div key={index} className={classString} style={child.props.style}>
          {child.props.children}
        </div>,
      );
    });

    return items;
  };

  return (
    <div className={`${prefixCls}-content`} ref={element} style={{ marginLeft: -state.scrollLeft }}>
      {renderContent()}
    </div>
  );
};

export default memo(TabContent);
