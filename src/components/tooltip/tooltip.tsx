import React, { memo, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { PopPanel } from '../pop-panel';
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
  const [show, setShow] = React.useState(false);
  const triggerRef = useRef<any>(null);
  const tooltipRef = useRef<any>(null);
  const timer = useRef<any>(null);

  useEffect(() => {
    if ('show' in props && props.show !== undefined) {
      setShow(props.show);
    }
  }, [props.show]);

  useEffect(() => {
    if (show) {
      setPosition();
    }
  }, [show, title]);

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
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
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
    (e) => {
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

  const resize = () => {
    if (show) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => {
        setPosition();
      }, 300);
    }
  };

  const setPosition = () => {
    if (!triggerRef.current || !tooltipRef.current) {
      return;
    }
    const elTrigger = triggerRef.current as any;
    const elTooltip = tooltipRef.current as any;
    const position = getPopoverPosition(elTrigger.firstChild, elTooltip, placement);
    elTooltip.style.left = position.left + 'px';
    elTooltip.style.top = position.top + 'px';
  };

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
      <PopPanel trigger={triggerRef.current} show={show} appear placement={placement}>
        <div ref={tooltipRef} className={classString} {...others}>
          <div className={`${prefixCls}__arrow`} />
          <div className={`${prefixCls}__inner`}>{title}</div>
        </div>
      </PopPanel>
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
