import React, { memo, useRef, useEffect, useCallback, CSSProperties } from 'react';
import classnames from 'classnames';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { domHelpers } from '../../utils';

import { Icon } from '../icon';
import CarouselPanel from './carousel-panel';
import CarouselDot from './carousel-dot';
import { CarouselProps } from './typing';
import { useState } from '../../hooks';

const Carousel = (props: CarouselProps) => {
  const {
    prefixCls = 'k-carousel',
    className,
    vertical,
    autoplay,
    delay = 3000,
    ...others
  } = props;
  const [state, setState] = useState({
    activeIndex: 1,
    max: 0,
    width: 0,
    height: 0,
    totalWidth: 0,
    totalHeight: 0,
    x: 0,
    y: 0,
    transition: '',
  });
  const timer = useRef<number>();
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    run();
    return () => {
      stop();
    };
  }, [state]);

  const init = () => {
    const { children } = props;
    const length = children && children.length ? children.length : 0;
    const max = length + 2;
    const width = element.current ? domHelpers.width(element.current) : 0;
    const height = element.current ? domHelpers.height(element.current) : 0;
    const totalWidth = max * width;
    const totalHeight = max * height;
    const x = state.activeIndex * width;
    const y = state.activeIndex * height;

    setState({
      max,
      width,
      height,
      totalWidth,
      totalHeight,
      x,
      y,
      transition: '',
    });
  };

  const run = () => {
    stop();
    if (autoplay) {
      timer.current = window.setTimeout(() => {
        active(state.activeIndex + 1);
      }, delay);
    }
  };

  const active = (index: number, callback?) => {
    const { width, height, max } = state;

    let transition = 'all .3s ease',
      x,
      y;

    const newState: any = {
      activeIndex: index,
    };

    if (index === max) {
      index = 1;
      transition = '';
    }

    if (index < 0) {
      index = max - 2;
      transition = '';
    }

    if (vertical) {
      y = index * height;
      newState.y = y;
    } else {
      x = index * width;
      newState.x = x;
    }
    newState.transition = transition;

    setState(newState, () => {
      setTimeout(() => {
        if (index >= max - 1) {
          setState(
            {
              activeIndex: 1,
              x: width,
              y: height,
              transition: '',
            },
            () => {
              if (callback) {
                callback();
              }
            },
          );
        } else if (index <= 0) {
          const num = max - 2;
          setState(
            {
              activeIndex: num,
              x: num * width,
              y: num * height,
              transition: '',
            },
            () => {
              if (callback) {
                callback();
              }
            },
          );
        } else {
          if (callback) {
            callback();
          }
        }
      }, 300);
    });
  };

  const stop = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const onMouseEnter = useCallback(() => {
    stop();
  }, [state]);

  const onMouseLeave = useCallback(() => {
    run();
  }, [state]);

  const onDotClick = useCallback(
    index => {
      stop();
      active(index + 1);
    },
    [state],
  );

  const onPrev = useCallback(() => {
    active(state.activeIndex - 1);
  }, [state]);

  const onNext = useCallback(() => {
    active(state.activeIndex + 1);
  }, [state]);

  const renderContent = () => {
    const { children } = props;
    const items: any = [];
    const style: CSSProperties = { transition: state.transition };
    let key = 0;

    React.Children.forEach(children, (child, index) => {
      const panelProps = {
        prefixCls,
        index,
        width: state.width,
        height: state.height,
        vertical,
      };

      if (index === 0) {
        items.push(
          <CarouselPanel key={key} {...panelProps}>
            {children[children.length - 1]}
          </CarouselPanel>,
        );
        key++;
      }
      items.push(
        <CarouselPanel key={key} {...panelProps}>
          {child}
        </CarouselPanel>,
      );
      key++;
      if (index === children.length - 1) {
        items.push(
          <CarouselPanel key={key} {...panelProps}>
            {children[0]}
          </CarouselPanel>,
        );
      }
    });

    if (vertical) {
      style.height = state.totalHeight;
      style.transform = `translate3d(0px, -${state.y}px, 0px)`;
    } else {
      style.width = state.totalWidth;
      style.transform = `translate3d(-${state.x}px, 0px, 0px)`;
    }

    return (
      <div className={`${prefixCls}-list`} style={style}>
        {items}
      </div>
    );
  };

  const renderDotsContent = () => {
    const { children } = props;
    const items: any = [];
    const len = children.length;
    let index = state.activeIndex - 1;

    if (index >= state.max - 2) {
      index = 0;
    }
    if (index < 0) {
      index = len - 1;
    }

    for (let i = 0; i < len; i++) {
      items.push(
        <CarouselDot
          key={i}
          index={i}
          prefixCls={prefixCls}
          active={index === i}
          onClick={onDotClick}
        />,
      );
    }

    return items;
  };

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--vertical`]: !!vertical,
    },
    className,
  );

  return (
    <div
      className={classString}
      {...others}
      ref={element}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {renderContent()}
      <div className={`${prefixCls}-dots`}>{renderDotsContent()}</div>
      <span
        className={classnames({
          [`${prefixCls}-control`]: true,
          [`${prefixCls}-control-left`]: true,
        })}
        onClick={onPrev}
      >
        <Icon>{<AiOutlineLeft />}</Icon>
      </span>
      <span
        className={classnames({
          [`${prefixCls}-control`]: true,
          [`${prefixCls}-control-right`]: true,
        })}
        onClick={onNext}
      >
        <Icon>{<AiOutlineRight />}</Icon>
      </span>
    </div>
  );
};

export default memo(Carousel);
