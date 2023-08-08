import React, { memo, useMemo, useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';

import SliderHandle from './slider-handle';
import { SliderProps } from './typing';
import { useState } from '../../hooks';
import { getMouseCoord, uuid } from '../../utils';
import dom from '../../utils/dom';

const Slider = (props: SliderProps) => {
  const {
    prefixCls = 'k-slider',
    className,
    disabled,
    vertical,
    min = 1,
    max = 100,
    step = 1,
    defaultValue = 1,
    range,
    value,
    marks,
    tipFormatter = (value) => value,
  } = props;

  const [state, setState] = useState({
    value: 1,
    activeValue: -1,
  });
  const mounted = useRef(false);
  const isEnter = useRef(false);
  const isMoving = useRef(false);
  const tmpValue = useRef<any>(null);
  const tmpDragIndex = useRef(-1);
  const elmSlider = useRef<any>(null);

  useEffect(() => {
    let val: any = props.value || defaultValue;
    let stepArr: number[] = [],
      stepRange;

    for (let i = min; i <= max; i += step) {
      stepArr.push(i);
    }

    if (stepArr[stepArr.length - 1] < max) {
      stepArr.push(max);
    }

    stepRange = getValueRange(stepArr);

    if (range && Array.isArray(val)) {
      let arrVal: number[] = [];
      val = val.sort((a, b) => {
        return a - b;
      });
      val.forEach((item) => {
        if (item <= min) {
          arrVal.push(min);
        } else if (item >= max) {
          arrVal.push(max);
        } else {
          for (let k in stepRange) {
            if (item >= stepRange[k][0] && item <= stepRange[k][1]) {
              arrVal.push(stepArr[k]);
              break;
            }
          }
        }
      });
      val = arrVal;
    } else if (typeof val === 'number') {
      if (val <= min) {
        val = min;
      }
      if (val >= max) {
        val = max;
      }
      for (let k in stepRange) {
        if (val >= stepRange[k][0] && val <= stepRange[k][1]) {
          val = stepArr[k];
          break;
        }
      }
      val = range ? [val] : val;
    }

    setState({
      value: val,
    });

    mounted.current = true;
  }, [value, min, max, range]);

  const onMouseEnter = (value) => {
    isEnter.current = true;
    setState({
      activeValue: value,
    });
  };

  const onMouseLeave = (value) => {
    isEnter.current = false;
    setState({
      activeValue: -1,
    });
  };

  const onDragStart = (e, index) => {
    tmpDragIndex.current = index;
    isMoving.current = true;
    if (props.onDragStart) {
      props.onDragStart(state.value[index]);
    }
  };

  const onChange = (e) => {
    let activeValue = getValue(e);
    let val: number | number[] = activeValue;
    if (range) {
      let newValue = [...state.value];
      newValue[tmpDragIndex.current] = activeValue;
      val = newValue.sort((a, b) => {
        return a - b;
      });
    }
    tmpValue.current = val;

    setState({
      value: val,
      activeValue,
    });

    if (props.onChange) {
      props.onChange(tmpValue.current);
    }
  };

  const onDragStop = (e) => {
    if (!tmpValue.current) {
      return;
    }

    const newState: any = { value: tmpValue.current };

    if (!isEnter.current) {
      newState.activeValue = -1;
    }

    setState(newState);

    if (props.onDragStop) {
      props.onDragStop(tmpValue.current);
    }

    tmpDragIndex.current = -1;
    tmpValue.current = null;
  };

  const getValue = (mouseEvent) => {
    let sliderInfo = getSliderInfo();
    let mouseCoord = getMouseCoord(mouseEvent);
    let percentage = getPercentage(mouseCoord, sliderInfo);
    let value = toValue(percentage);
    return value;
  };

  const getSliderInfo = () => {
    let position = dom.position(elmSlider.current);
    let offset = dom.offset(elmSlider.current);
    return {
      left: position.left,
      top: position.top,
      offsetLeft: offset.left,
      offsetTop: offset.top,
      width: dom.outerWidth(elmSlider.current),
      height: dom.outerHeight(elmSlider.current),
    };
  };

  const getPercentage = (mouseCoord, sliderInfo) => {
    let distanceToSlide, percentage;

    if (vertical) {
      distanceToSlide = mouseCoord.y - sliderInfo.offsetTop;
      percentage = (distanceToSlide / sliderInfo.height) * 100;
    } else {
      distanceToSlide = mouseCoord.x - sliderInfo.offsetLeft;
      percentage = (distanceToSlide / sliderInfo.width) * 100;
    }
    if (vertical) {
      percentage = 100 - percentage;
    }
    percentage = Math.max(0, Math.min(100, percentage));

    return percentage;
  };

  const getValueRange = (value: number[]) => {
    let range = {},
      prev,
      next,
      mid;

    for (let i = 0; i < value.length; i++) {
      const first = value[i];
      const second = i + 1 === value.length ? max : value[i + 1];
      mid = parseInt(((second - first) / 2).toString());
      next = first + mid;

      if (i === 0) {
        range[i] = [min, next];
      } else {
        range[i] = [range[i - 1][1] + 1, next];
      }

      if (i === value.length - 1) {
        range[i][1] = max;
      }
    }
    return range;
  };

  const toValue = (percentage) => {
    let value = (percentage / 100) * (max - min);
    value = min + Math.round(value / step) * step;
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    return value;
  };

  const toPercentage = (value) => {
    return (100 * (value - min)) / (max - min);
  };

  const getSliderHandle = (value, index, activeIndex?) => {
    let title = tipFormatter && typeof tipFormatter === 'function' ? tipFormatter(value) : null,
      percentage = toPercentage(value),
      style = vertical ? { bottom: `${percentage}%` } : { left: `${percentage}%` };

    return (
      <SliderHandle
        index={index}
        key={index}
        vertical={vertical}
        disabled={disabled}
        title={title}
        style={style}
        value={value}
        showTooltip={activeIndex === index ? true : false}
        onDragStart={onDragStart}
        onChange={onChange}
        onDragStop={onDragStop}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  };

  const trackStyle = useMemo(() => {
    const { value } = state;
    let minNum, maxNum, num1, num2;
    if (Array.isArray(value)) {
      minNum = Math.min(...value);
      maxNum = Math.max(...value);
      if (value.length === 1) {
        minNum = min;
      }
    } else {
      minNum = min;
      maxNum = value;
    }
    num1 = toPercentage(minNum) + '%';
    num2 = toPercentage(maxNum) - toPercentage(minNum) + '%';

    return vertical
      ? {
          bottom: num1,
          height: num2,
        }
      : {
          left: num1,
          width: num2,
        };
  }, [state.value, vertical, min]);

  const marksInfo = useMemo(() => {
    const { value } = state;
    const ret: any = {
      dots: [],
      marks: [],
    };
    if (marks) {
      for (let i = min; i <= max; i++) {
        let percentage = toPercentage(i),
          dotStyle = vertical ? { bottom: `${percentage}%` } : { left: `${percentage}%` },
          mark = marks[i],
          active = false;

        let max = Array.isArray(value) ? Math.max(...value) : value;

        if (mark) {
          active = max >= i;
          let isObj = typeof mark === 'object';
          let markStyle = isObj ? { ...dotStyle, ...mark.style } : dotStyle;

          ret.dots.push(
            <span
              key={`slider-dot-${i}`}
              className={classnames({
                [`${prefixCls}-step-dot`]: true,
                [`${prefixCls}-step-dot--active`]: active,
              })}
              style={dotStyle}
            />,
          );
          ret.marks.push(
            <span
              key={`slider-mark-${i}`}
              className={classnames({
                [`${prefixCls}-marks-mark`]: true,
                [`${prefixCls}-marks-mark--active`]: active,
              })}
              style={markStyle}
            >
              {isObj ? mark.label : mark}
            </span>,
          );
        }
      }
    }
    return ret;
  }, [marks, vertical, min, max, step, state.value]);

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--vertical`]: vertical,
      [`${prefixCls}--disabled`]: disabled,
    },
    className,
  );

  const renderHandles = () => {
    const { activeValue } = state;
    if (range && Array.isArray(state.value)) {
      const activeIndex = state.value.findIndex((val) => val === activeValue);
      return state.value.map((val, index) => {
        return getSliderHandle(val, index, activeIndex);
      });
    } else {
      return getSliderHandle(state.value, 0, activeValue !== -1 ? 0 : -1);
    }
  };

  return (
    <div className={classString} ref={elmSlider}>
      <div className={`${prefixCls}-rail`} />
      <div className={`${prefixCls}-track`} style={trackStyle} />
      <div className={`${prefixCls}-step`}>{marksInfo.dots}</div>
      <div className={`${prefixCls}-marks`}>{marksInfo.marks}</div>
      {renderHandles()}
    </div>
  );
};

export default memo(Slider);
