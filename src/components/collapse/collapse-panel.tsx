import React, { memo, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';

import { CollapsePanelProps } from './typing';
import { Icon } from '../icon';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai';

const CollapsePanel = (props: CollapsePanelProps) => {
  const {
    prefixCls,
    id,
    className,
    activeIds = [],
    disabled,
    border,
    children,
    header,
    onClick,
    ...others
  } = props;

  const contentElement = useRef(null);

  const onHeaderClick = useCallback(() => {
    if (disabled) {
      return;
    }
    if (onClick) {
      onClick(id);
    }
  }, [disabled, onClick, id]);

  const onEnter = useCallback(node => {
    node.style.height = '0px';
  }, []);

  const onEntering = useCallback(node => {
    node.style.height = getContentHeight() + 'px';
  }, []);

  const onEntered = useCallback(node => {
    node.style.height = 'auto';
  }, []);

  const onExit = useCallback(node => {
    node.style.height = getContentHeight() + 'px';
    node.offsetHeight;
  }, []);

  const onExiting = useCallback(node => {
    node.style.height = '0px';
  }, []);

  const getContentHeight = useCallback(() => {
    const el = contentElement.current ? (contentElement.current as any) : null;
    return el ? el.offsetHeight || el.clientHeight || el.scrollHeight : 0;
  }, []);

  const classString = classnames(
    {
      [`${prefixCls}-panel`]: true,
    },
    className,
  );

  const isShow = activeIds ? activeIds.indexOf(id) > -1 : false;

  return (
    <div className={classString} {...others}>
      <div
        className={classnames({
          [`${prefixCls}-panel-header`]: true,
          [`${prefixCls}-panel-header--disabled`]: disabled,
        })}
        onClick={onHeaderClick}
      >
        {header}
        <Icon className={`${prefixCls}-panel-header__icon`}>
          {isShow ? <AiOutlineDown /> : <AiOutlineRight />}
        </Icon>
      </div>
      <Transition
        in={isShow}
        timeout={300}
        appear
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
      >
        {state => {
          return (
            <div className={`${prefixCls}-panel-body`} ref={contentElement}>
              {children}
            </div>
          );
        }}
      </Transition>
    </div>
  );
};

CollapsePanel.displayName = 'CollapsePanel';

export default memo(CollapsePanel);
