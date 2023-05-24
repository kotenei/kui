import React, { memo, useCallback, useEffect, useRef, useMemo } from 'react';
import classnames from 'classnames';
import { AiOutlineClose, AiOutlineClockCircle } from 'react-icons/ai';

import TimePickerSelect from './time-picker-select';
import { Input } from '../input';
import { Button } from '../button';
import { Portal } from '../portal';
import { TimePickerProps } from './typing';
import { useOutsideClick, useState } from '../../hooks';
import { eventOmitHandler, getPopoverPosition } from '../../utils';

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
    defaultValue,
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

  const mounted = useRef(false);
  const tmpValue = useRef('');
  const reg = /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})(\s(PM|AM|am|pm))?$/i;

  useEffect(() => {
    let val = value || (defaultValue && !mounted.current ? defaultValue : '');
    tmpValue.current = `00:00:00${use12Hours ? ' AM' : ''}`;

    if (val && isTime(val)) {
      val = val.toUpperCase();
      if (use12Hours && val.indexOf('AM') === -1 && val.indexOf('PM') === -1) {
        val += ' AM';
      }
      tmpValue.current = val;
      setState({
        value: val,
      });
    } else if ('value' in props && !value) {
      setState({
        value: '',
      });
    }
    mounted.current = true;
  }, [value, use12Hours]);

  useEffect(() => {
    if ('show' in props) {
      setState({
        show,
      });
    }
  }, [show]);

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
  const hours = useMemo(() => {
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
  }, []);

  //分钟列表项
  const minutes = useMemo(() => {
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
  }, []);

  //秒列表项
  const seconds = useMemo(() => {
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
  }, []);

  const onInputClick = useCallback(() => {
    if (disabled) {
      return;
    }
    if (!('show' in props)) {
      setState({
        show: true,
      });
    }
  }, [disabled, show]);

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

  const onSelected = useCallback(
    (type, val, index) => {
      let arrTime: any = [],
        timeSlot;

      if (tmpValue.current) {
        const match = tmpValue.current.match(reg);
        if (match) {
          arrTime.push(match[1], match[3], match[4]);
          timeSlot = match[6];
        }
      }

      if (arrTime.length) {
        switch (type) {
          case 'hour':
            arrTime[0] = val;
            break;
          case 'minute':
            arrTime[1] = val;
            break;
          case 'second':
            arrTime[2] = val;
            break;
          case 'timeSlot':
            timeSlot = val;
            break;
          default:
            break;
        }
        tmpValue.current = arrTime.join(':');
        if (use12Hours && timeSlot) {
          tmpValue.current += ' ' + timeSlot;
        }
      }
    },
    [use12Hours],
  );

  const onCancel = useCallback(() => {
    const { value } = state;
    tmpValue.current = value || '00:00:00';
    if (!('show' in props)) {
      setState({
        show: false,
      });
    }
  }, [state.value]);

  const onOK = useCallback(() => {
    const value = tmpValue.current;
    if (!('show' in props)) {
      setState({
        show: false,
      });
    }
    if (!('value' in props)) {
      setState({
        value,
      });
    }

    if (props.onChange && value != state.value) {
      props.onChange(value);
    }
  }, [state.value, props.onChange]);

  const onClear = useCallback(() => {
    if (!('value' in props)) {
      tmpValue.current = '00:00:00';
      if (use12Hours) {
        tmpValue.current += ' am';
      }
      setState({
        value: '',
      });
    }

    if (props.onChange) {
      props.onChange('');
    }
  }, [use12Hours, disabled, props.onChange]);

  const classString = classnames(
    {
      [`${prefixCls}`]: true,
      [`${prefixCls}--disabled`]: disabled,
    },
    className,
  );

  const renderPicker = () => {
    const { value, show } = state;
    let arrTime = [],
      hour,
      minute,
      second,
      timeSlot;

    if (value) {
      let match = value.match(reg);
      hour = match[1];
      minute = match[3];
      second = match[4];
      timeSlot = match[6];
    }

    return (
      <Portal
        in={state.show}
        onEnter={onEnter}
        onEntering={onEntering}
        onExiting={onExiting}
        unmountOnExit
      >
        <div className={classString} onClick={(e) => eventOmitHandler(e)}>
          <div className={`${prefixCls}-wrapper`}>
            <TimePickerSelect
              prefixCls={prefixCls}
              data={hours}
              value={hour}
              type="hour"
              onItemClick={onSelected}
              onScroll={onSelected}
            />
            <TimePickerSelect
              prefixCls={prefixCls}
              data={minutes}
              value={minute}
              type="minute"
              onItemClick={onSelected}
              onScroll={onSelected}
            />
            <TimePickerSelect
              prefixCls={prefixCls}
              data={seconds}
              value={second}
              type="second"
              onItemClick={onSelected}
              onScroll={onSelected}
            />
            {use12Hours ? (
              <TimePickerSelect
                prefixCls={prefixCls}
                data={['AM', 'PM']}
                type="timeSlot"
                value={timeSlot}
                onItemClick={onSelected}
                onScroll={onSelected}
              />
            ) : null}
          </div>
          <div className={`${prefixCls}-bottom`}>
            <Button size="sm" onClick={onCancel}>
              {cancelText}
            </Button>
            <Button size="sm" color="primary" onClick={onOK}>
              {okText}
            </Button>
          </div>
        </div>
      </Portal>
    );
  };

  const renderSuffix = () => {
    const { value } = state;
    if (value && showClearIcon && !disabled) {
      return <AiOutlineClose className={`${prefixCls}-input-close`} onClick={onClear} />;
    }
    return (
      <AiOutlineClockCircle
        opacity={0.6}
        onClick={() => {
          onInputClick();
          triggerRef.current.children[0].focus();
        }}
      />
    );
  };

  return (
    <>
      <Input
        ref={triggerRef}
        className={classnames({
          [`${prefixCls}-input`]: true,
          [`${prefixCls}-input--disabled`]: disabled,
        })}
        size={size}
        suffix={renderSuffix()}
        placeholder={placeholder}
        disabled={disabled}
        value={state.value}
        onClick={onInputClick}
        onChange={() => {}}
      />
      {renderPicker()}
    </>
  );
};

export default memo(TimePicker);
