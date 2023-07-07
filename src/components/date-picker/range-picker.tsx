import React, { memo, useCallback } from 'react';
import classnames from 'classnames';
import { format } from 'date-fns';
import { AiOutlineClose, AiOutlineCalendar } from 'react-icons/ai';

import { Button } from '../button';
import { Icon } from '../icon';
import { PopPanel } from '../pop-panel';
import DatePickerCalendar from './date-picker-calendar';
import { useOutsideClick, useState } from '../../hooks';
import { RangePickerProps } from './typing';
import { eventOmitHandler } from '../../utils';

const RangePicker = (props: RangePickerProps) => {
  const {
    prefixCls = 'k-range-picker',
    className,
    trigger,
    defaultValue,
    value,
    startPlaceholder = '开始日期',
    endPlaceholder = '结束日期',
    separator = '-',
    disabled,
    placement = 'bottomLeft',
    size,
    showTime,
    minDate,
    maxDate,
    weekStartsOn = 1,
    view = 'day',
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

  const onClick = useCallback((e) => {
    if (disabled) {
      return;
    }
    setState({
      show: true,
    });
  }, []);

  const renderTrigger = () => {
    const { value } = state;
    return (
      <div ref={triggerRef} className={`${prefixCls}-control`} onClick={onClick}>
        {trigger ? (
          trigger
        ) : (
          <div
            className={classnames({
              [`${prefixCls}-control-input`]: true,
              [`${prefixCls}-control-input--${size}`]: !!size,
            })}
          >
            <div className={`${prefixCls}-control-input__wrapper`}>
              <input
                type="text"
                placeholder={startPlaceholder}
                readOnly
                //   value={value && value[0] ? formatter(value[0], format) : ''}
                //   onChange={() => {}}
                //   onFocus={onFocus}
                //   onBlur={onBlur}
              />
              <span className={`${prefixCls}-control-input__separator`}>{separator}</span>
              <input
                type="text"
                placeholder={endPlaceholder}
                readOnly
                //   value={value && value[1] ? formatter(value[1], format) : ''}
                //   onChange={() => {}}
                //   onFocus={onFocus}
                //   onBlur={onBlur}
              />
            </div>
            <Icon className={`${prefixCls}-control-input__icon`}>
              {value && !disabled ? (
                <AiOutlineClose />
              ) : (
                <AiOutlineCalendar
                  opacity={0.6}
                  onClick={(e) => {
                    onClick(e);
                    triggerRef.current.children[0].focus();
                  }}
                />
              )}
            </Icon>
          </div>
        )}
      </div>
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
        <div className={classString}>
          <div className={`${prefixCls}-body`}>
            <DatePickerCalendar
              prefixCls={prefixCls}
              showTime={showTime}
              showNextMonth={false}
              showNextYear={false}
              minDate={minDate}
              maxDate={maxDate}
              view={view}
              // value={state.value}
              weekStartsOn={weekStartsOn}
              // onChange={onCalendarChange}
            />
            <DatePickerCalendar
              prefixCls={prefixCls}
              showTime={showTime}
              showPrevMonth={false}
              showPrevYear={false}
              minDate={minDate}
              maxDate={maxDate}
              view={view}
              // value={state.value}
              weekStartsOn={weekStartsOn}
              // onChange={onCalendarChange}
            />
          </div>
          <div className={`${prefixCls}-footer`}>
            <Button color="primary" size="sm">
              确定
            </Button>
          </div>
        </div>
      </PopPanel>
    );
  };

  return (
    <>
      {renderTrigger()}
      {renderContent()}
    </>
  );
};

export default memo(RangePicker);
