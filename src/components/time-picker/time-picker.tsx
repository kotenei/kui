import React, { memo, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { AiOutlineClose, AiOutlineClockCircle } from 'react-icons/ai';

import TimePickerSelect from './time-picker-select';
import { Input } from '../input';
import { Portal } from '../portal';
import { TimePickerProps } from './typing';
import { useOutsideClick, useState } from '../../hooks';
import { getPopoverPosition } from '../../utils';

const TimePicker = (props: TimePickerProps) => {
  const {
    prefixCls = 'k-timepicker',
    className,
    disabled,
    size,
    placeholder,
    use12Hours,
    show,
    showClearIcon = true,
    value,
    cancelText = '取消',
    okText = '确定',
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    minTime,
    maxTime,
    onChange,
  } = props;

  const [state, setState] = useState({
    show: show || false,
    value: '',
  });
  const [triggerRef] = useOutsideClick(
    {
      onClick: (e) => {
        if (!('show' in props)) {
          setState({
            show: false,
          });
        }
      },
    },
    [show],
  );

  const tmpValue = useRef('');
  const reg = /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})(\s(PM|AM))?$/i;

  useEffect(() => {
    tmpValue.current = `00:00:00${use12Hours ? ' AM' : ''}`;

    if (value && isTime(value)) {
      let val = value;
      if (use12Hours && val.indexOf('AM') === -1 && val.indexOf('PM') === -1) {
        val += ' AM';
      }
      tmpValue.current = val;
      setState({
        value: val,
      });
    }
  }, [value, use12Hours]);

  useEffect(() => {
    if ('show' in props) {
      setState({
        show,
      });
    }
  }, [show]);

  const showPicker = () => {
    if (disabled || state.show) {
      return;
    }
    setState({
      show: true,
    });
  };

  const hidePicker = () => {
    if (disabled || !state.show) {
      return;
    }
    setState({
      show: false,
    });
  };

  //是否时间格式
  const isTime = (str) => {
    let match = str.match(reg);
    if (!match) {
      return false;
    }
    if (
      match[1] < 0 ||
      match[1] > 24 ||
      match[3] < 0 ||
      match[3] > 59 ||
      match[4] < 0 ||
      match[4] > 59
    ) {
      return false;
    }
    return true;
  };

  //小时列表项
  const getHours = () => {
    let data: string[] = [],
      min = 0,
      max = use12Hours ? 12 : 23;
    if (minTime && isTime(minTime)) {
      min = parseInt(minTime.split(':')[0], 10);
    }
    if (maxTime && isTime(maxTime)) {
      max = parseInt(maxTime.split(':')[0], 10);
    }
    for (let i = min; i <= max; i += hourStep) {
      data.push(String(i).padStart(2, '0'));
    }
    return data;
  };
  //分钟列表项
  const getMinutes = () => {
    let data: string[] = [],
      min = 0,
      max = 59;
    if (minTime && isTime(minTime)) {
      min = parseInt(minTime.split(':')[1], 10);
    }
    if (maxTime && isTime(maxTime)) {
      max = parseInt(maxTime.split(':')[1], 10);
    }
    for (let i = min; i <= max; i += minuteStep) {
      data.push(String(i).padStart(2, '0'));
    }
    return data;
  };
  //秒列表项
  const getSeconds = () => {
    let data: string[] = [],
      min = 0,
      max = 59;
    if (minTime && isTime(minTime)) {
      min = parseInt(minTime.split(':')[2], 10);
    }
    if (maxTime && isTime(maxTime)) {
      max = parseInt(maxTime.split(':')[2], 10);
    }
    for (let i = min; i <= max; i += secondStep) {
      data.push(String(i).padStart(2, '0'));
    }
    return data;
  };

  const onInputClick = useCallback(() => {
    if (!('show' in props)) {
      setState({
        show: true,
      });
    }
  }, [show]);

  const onEnter = useCallback((node, isAppearing) => {
    if (triggerRef.current) {
      const position = getPopoverPosition(triggerRef.current as any, node, 'bottomLeft');
      node.style.visibility = 'visible';
      node.style.left = position.left + 'px';
      node.style.top = position.top + 'px';
      node.style.opacity = 0;
    }
  }, []);

  const onEntering = useCallback((node) => {
    node.style.opacity = 1;
    node.style.visibility = 'visible';
  }, []);

  const onExiting = useCallback((node) => {
    node.style.opacity = 0;
    node.style.visibility = 'hidden';
  }, []);

  const classString = classnames(
    {
      [`${prefixCls}`]: true,
      [`${prefixCls}--disabled`]: disabled,
    },
    className,
  );

  const renderPicker = () => {
    console.log(state.show);
    return (
      <Portal
        in={state.show}
        appear
        onEnter={onEnter}
        onEntering={onEntering}
        onExiting={onExiting}
      >
        <div className={classString}>
          <div className={`${prefixCls}-wrapper`}>
            {use12Hours ? (
              <TimePickerSelect
                prefixCls={prefixCls}
                data={['am', 'pm']}
                type="timeSlot"
                // value={timeSlot}
                // onItemClick={this.handleItemClick}
                // onScroll={this.handleItemScroll}
              />
            ) : null}
          </div>
          <div className={`${prefixCls}-bottom`}></div>
        </div>
      </Portal>
    );
  };

  const renderSuffix = () => {
    const { value } = state;
    if (value && showClearIcon && !disabled) {
      return <AiOutlineClose />;
    }
    return <AiOutlineClockCircle />;
  };

  return (
    <React.Fragment>
      <Input
        className={`${prefixCls}-input`}
        ref={triggerRef}
        size={size}
        suffix={renderSuffix()}
        placeholder={placeholder}
        disabled={disabled}
        onClick={onInputClick}
      />
      {renderPicker()}
    </React.Fragment>
  );
};

export default memo(TimePicker);
