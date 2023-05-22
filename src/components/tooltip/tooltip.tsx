import React, { memo, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { Portal } from '../portal';
import { TooltipProps } from './typing';
import { getPopoverPosition } from '../../utils';

const Tooltip = (props: TooltipProps) => {
  const {
    prefixCls = 'k-tooltip',
    className,
    children,
    color,
    title,
    placement,
    trigger,
    ...others
  } = props;
  const [show, setShow] = React.useState(props.show);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timer = useRef<any>(null);

  useEffect(() => {
    if (show !== undefined) {
      setShow(show);
    }
  }, [show]);

  useEffect(() => {
    if (trigger === 'click') {
      document.addEventListener('click', hideTooltip);
    }

    return () => {
      if (trigger === 'click') {
        document.removeEventListener('click', hideTooltip);
      }
    };
  }, [trigger]);

  useEffect(() => {
    window.addEventListener('resize', setPosition);
    return () => {
      window.removeEventListener('resize', setPosition);
    };
  }, [show, placement]);

  const onTriggerMouseEnter = useCallback(() => {
    if (trigger !== 'hover') {
      return;
    }

    showTooltip();
  }, [trigger]);

  const onTriggerMouseLeave = useCallback(() => {
    if (trigger !== 'hover') {
      return;
    }

    hideTooltip();
  }, [trigger]);

  const onTriggerClick = useCallback(
    e => {
      if (trigger !== 'click') {
        return;
      }

      setTimeout(() => {
        if (!show) {
          showTooltip();
        } else {
          hideTooltip();
        }
      });
    },
    [trigger, show],
  );

  const showTooltip = useCallback(() => {
    if ('show' in props) {
      return;
    }
    setShow(true);
  }, []);

  const hideTooltip = useCallback(() => {
    if ('show' in props) {
      return;
    }
    setShow(false);
  }, []);

  const setPosition = () => {
    if (show) {
      if (triggerRef.current && tooltipRef.current) {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = window.setTimeout(() => {
          const elTrigger = triggerRef.current as any;
          const elTooltip = tooltipRef.current as any;
          const position = getPopoverPosition(elTrigger.firstChild, elTooltip, placement);
          elTooltip.style.left = position.left + 'px';
          elTooltip.style.top = position.top + 'px';
        }, 300);
      }
    }
  };

  const onEnter = useCallback(
    (node, isAppearing) => {
      if (triggerRef.current && tooltipRef.current) {
        const position = getPopoverPosition(
          (triggerRef.current as any).firstChild,
          node,
          placement,
        );
        node.style.visibility = 'visible';
        node.style.left = position.left + 'px';
        node.style.top = position.top + 'px';
        node.style.opacity = 1;
      }
    },
    [placement],
  );

  const onExiting = useCallback(node => {
    node.style.opacity = 0;
  }, []);

  const onExited = useCallback(node => {
    node.style.visibility = 'hidden';
  }, []);

  const renderTooltip = () => {
    const classString = classnames(
      {
        [prefixCls]: true,
        [`${prefixCls}--${color}`]: !!color,
        [`${prefixCls}--${placement}`]: !!placement,
      },
      className,
    );

    return (
      <Portal
        in={show}
        timeout={300}
        appear
        onEnter={onEnter}
        onExiting={onExiting}
        onExited={onExited}
      >
        {state => {
          return (
            <div ref={tooltipRef} className={classString} {...others}>
              <div className={`${prefixCls}__arrow`} />
              <div className={`${prefixCls}__inner`}>{title}</div>
            </div>
          );
        }}
      </Portal>
    );
  };

  return (
    <React.Fragment>
      <span
        className={`${prefixCls}-handle`}
        ref={triggerRef}
        onMouseEnter={onTriggerMouseEnter}
        onMouseLeave={onTriggerMouseLeave}
        onClick={onTriggerClick}
      >
        {children}
      </span>
      {renderTooltip()}
    </React.Fragment>
  );
};

Tooltip.defaultProps = {
  placement: 'top',
  trigger: 'hover',
  delay: 100,
};

export default memo(Tooltip);
