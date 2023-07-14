import React, { memo, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { AiOutlineClose, AiOutlineCalendar } from 'react-icons/ai';
import { format as dateFormat } from 'date-fns';

import { Input } from '../input';
import { Icon } from '../icon';
import { PopPanel } from '../pop-panel';
import DatePickerCalendar from './date-picker-calendar';
import { useOutsideClick, useState } from '../../hooks';
import { DatePickerProps } from './typing';

const DatePicker = (props: DatePickerProps) => {
  const {
    prefixCls = 'k-datepicker',
    format = 'yyyy-MM-dd',
    className,
    disabled,
    placeholder,
    placement = 'bottomLeft',
    size,
    showTime,
    showToday,
    minDate,
    maxDate,
    defaultValue,
    date = new Date(),
    value,
    view = 'day',
    weekStartsOn = 1,
    onChange,
  } = props;
  const [state, setState] = useState({
    show: false,
    value: value || defaultValue,
  });
  const [triggerRef] = useOutsideClick(
    {
      onClick: (e) => {
        setState({
          show: false,
        });
      },
    },
    [],
  );

  useEffect(() => {
    if (value) {
      setState({
        value,
      });
    }
  }, [value]);

  const onInputClick = useCallback(() => {
    if (disabled) {
      return;
    }
    setState({
      show: true,
    });
  }, [disabled]);

  const onClear = useCallback(() => {
    if (!('value' in props)) {
      setState({
        value: undefined,
      });
    }
    if (props.onChange) {
      props.onChange();
    }
  }, [disabled, props.onChange]);

  const onCalendarChange = useCallback(
    (date, action) => {
      if (!('value' in props) && action.view === view) {
        setState({
          value: date,
        });
      }
      if (!action.show) {
        setState({
          show: false,
        });
      }
    },
    [showTime, view, onChange],
  );

  const renderSuffix = () => {
    const { value } = state;
    if (value && !disabled) {
      return (
        <Icon onClick={onClear}>
          <AiOutlineClose className={`${prefixCls}-input__close`} />
        </Icon>
      );
    }
    return (
      <Icon
        onClick={() => {
          onInputClick();
          triggerRef.current.children[0].focus();
        }}
      >
        <AiOutlineCalendar opacity={0.6} />
      </Icon>
    );
  };

  const renderContent = () => {
    const classString = classnames(
      {
        [`${prefixCls}`]: true,
      },
      className,
    );
    return (
      <PopPanel trigger={triggerRef.current} show={state.show} placement={placement}>
        <DatePickerCalendar
          prefixCls={prefixCls}
          className={classString}
          showToday={showToday}
          showTime={showTime}
          minDate={minDate}
          maxDate={maxDate}
          view={view}
          date={state.value || date}
          value={state.value}
          weekStartsOn={weekStartsOn}
          onChange={onCalendarChange}
        />
      </PopPanel>
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
        value={state.value ? dateFormat(state.value, format, { weekStartsOn }) : ''}
        onClick={onInputClick}
        onChange={() => {}}
      />
      {renderContent()}
    </>
  );
};

export default memo(DatePicker);
