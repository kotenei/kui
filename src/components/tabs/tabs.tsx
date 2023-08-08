import React, { memo, useCallback, useEffect } from 'react';
import classnames from 'classnames';

import { useState } from '../../hooks';
import TabNav from './tab-nav';
import TabContent from './tab-content';
import { TabsProps } from './typing';
import { omit } from '../../utils';

const Tabs = (props: TabsProps) => {
  const {
    prefixCls,
    className,
    children,
    type,
    tabPosition,
    activeIndex,
    defaultActiveIndex = 0,
    editable = false,
    hideAdd = false,
    ...others
  } = props;

  const [state, setState] = useState({
    activeIndex: activeIndex || defaultActiveIndex || 0,
  });

  useEffect(() => {
    if ('activeIndex' in props && activeIndex !== state.activeIndex) {
      setState({
        activeIndex: props.activeIndex,
      });
    }
  }, [props, state]);

  const onTabClick = useCallback(
    (e, index) => {
      if (!('activeIndex' in props)) {
        setState({
          activeIndex: index,
        });
      }
      if (props.onTabClick) {
        props.onTabClick(e, index);
      }
    },
    [props.onTabClick, props.activeIndex],
  );

  const renderTabNav = key => {
    if (!children) {
      return null;
    }

    return (
      <TabNav
        key={key}
        prefixCls={prefixCls}
        {...props}
        activeIndex={state.activeIndex}
        onTabClick={onTabClick}
      />
    );
  };

  const renderTabContent = key => {
    if (!children) {
      return null;
    }

    return (
      <TabContent
        key={key}
        prefixCls={prefixCls}
        activeIndex={state.activeIndex}
        tabPosition={tabPosition}
      >
        {children}
      </TabContent>
    );
  };

  const renderContent = () => {
    const items: any = [];
    let key = -1;
    if (tabPosition === 'bottom') {
      items.push(renderTabContent(key++));
      items.push(renderTabNav(key++));
    } else {
      items.push(renderTabNav(key++));
      items.push(renderTabContent(key++));
    }
    return items;
  };

  const classString = classnames(
    prefixCls,
    {
      [`${prefixCls}--line`]: type === 'line',
      [`${prefixCls}--card`]: type === 'card',
      [`${prefixCls}--${tabPosition}`]: !!tabPosition,
      [`${prefixCls}--vertical`]: tabPosition === 'left' || tabPosition === 'right',
    },
    className,
  );

  const _otherProps = omit(others, ['extraContent', 'onTabClick', 'onEdit']);

  return (
    <div className={classString} {..._otherProps}>
      {renderContent()}
    </div>
  );
};

Tabs.defaultProps = {
  prefixCls: 'k-tabs',
  type: 'line',
  tabPosition: 'top',
};

export default memo(Tabs);
