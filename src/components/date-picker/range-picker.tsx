import React, { memo, useCallback, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { format, addYears, addMonths, differenceInCalendarMonths } from 'date-fns';
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
  const now = new Date();

  const [state, setState] = useState({
    show: false,
    rangeDate: value ||
      defaultValue || [now, view === 'year' ? addYears(now, 10) : addMonths(now, 1)],
    tmpValue: value || defaultValue || [],
    showCalendarIndex: -1,
  });

  useEffect(() => {
    if ('value' in props && value && value.length === 2) {
      // const tmpValue = [
      //   new Date(value[0].getFullYear(), value[0].getMonth(), 1, 0, 0, 0),
      //   new Date(value[1].getFullYear(), value[1].getMonth(), 1, 0, 0, 0),
      // ];
      // if (
      //   tmpValue &&
      //   tmpValue.length === 2 &&
      //   format(tmpValue[0], 'yyyymm') === format(tmpValue[1], 'yyyymm')
      // ) {
      //   tmpValue[1] = view === 'year' ? addYears(tmpValue[0], 10) : addMonths(tmpValue[0], 1);
      // }
      // setState({
      //   rangeDate: value,
      //   tmpValue,
      // });
    }
  }, [view, value]);

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

  const onStartViewChange = useCallback((view) => {
    setState({
      showCalendarIndex: 0,
    });
  }, []);

  const onEndViewChange = useCallback((view) => {
    setState({
      showCalendarIndex: 1,
    });
  }, []);

  const onStartPrevNextChange = useCallback(
    (date, type) => {
      const newRangeDate: any = [];
      switch (type) {
        case 'prevYear':
        case 'nextYear':
          newRangeDate[0] = date;
          newRangeDate[1] = view === 'year' ? addYears(date, 10) : addMonths(date, 1);
          break;
        case 'prevMonth':
        case 'nextMonth':
          newRangeDate[0] = date;
          newRangeDate[1] = addMonths(date, 1);
          break;
        default:
          break;
      }
      setState({
        rangeDate: newRangeDate,
      });
    },
    [view, state.rangeDate],
  );

  const onEndPrevNextChange = useCallback(
    (date, type) => {
      const newRangeDate: any = [];
      switch (type) {
        case 'prevYear':
        case 'nextYear':
          newRangeDate[0] = view === 'year' ? addYears(date, -10) : addMonths(date, -1);
          newRangeDate[1] = date;
          break;
        case 'prevMonth':
        case 'nextMonth':
          newRangeDate[0] = addMonths(date, -1);
          newRangeDate[1] = date;
          break;
        default:
          break;
      }
      setState({
        rangeDate: newRangeDate,
      });
    },
    [view, state.rangeDate],
  );

  const onStartCalendarChange = useCallback(
    (date, info) => {
      const val = getVal(date, 0);
      console.log(val);
      setState({
        showCalendarIndex: -1,
        rangeDate: [date, view === 'year' ? addYears(date, 10) : addMonths(date, 1)],
        tmpValue: val,
      });
    },
    [view, state],
  );

  const onEndCalendarChange = useCallback(
    (date, info) => {
      const val = getVal(date, 1);
      console.log(val);
      setState({
        showCalendarIndex: -1,
        rangeDate: [view === 'year' ? addYears(date, -10) : addMonths(date, -1), date],
        tmpValue: val,
      });
    },
    [view, state],
  );

  const getVal = (date, index) => {
    let newTmpValue = [...state.tmpValue];

    if (newTmpValue[0] && newTmpValue[1]) {
      newTmpValue = [];
      newTmpValue[index] = date;
    } else {
      const tmpDate = newTmpValue[0] || newTmpValue[1];
      if (tmpDate) {
        if (tmpDate.getTime() > date.getTime()) {
          newTmpValue = [date, tmpDate];
        } else {
          newTmpValue = [tmpDate, date];
        }
      } else {
        newTmpValue[index] = date;
      }
    }

    return newTmpValue;
  };

  const arrowInfo = useMemo(() => {
    const { tmpValue } = state;
    let showStartNext = true;
    let showEndPrev = true;

    let diff =
      tmpValue && tmpValue.length && tmpValue.length === 2
        ? differenceInCalendarMonths(tmpValue[1], tmpValue[0])
        : 0;

    if (diff <= 1) {
      showStartNext = false;
      showEndPrev = false;
    }

    return { showStartNext, showEndPrev };
  }, [state.tmpValue]);

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
            {(state.showCalendarIndex === -1 || state.showCalendarIndex === 0) && (
              <DatePickerCalendar
                prefixCls={prefixCls}
                showTime={showTime}
                showNextMonth={state.showCalendarIndex === 0}
                showNextYear={state.showCalendarIndex === 0}
                minDate={minDate}
                maxDate={maxDate}
                view={view}
                rangeDate={state.rangeDate}
                date={state.rangeDate[0]}
                value={state.tmpValue[0]}
                weekStartsOn={weekStartsOn}
                onViewChange={onStartViewChange}
                onPrevNextChange={onStartPrevNextChange}
                onChange={onStartCalendarChange}
              />
            )}

            {(state.showCalendarIndex === -1 || state.showCalendarIndex === 1) && (
              <DatePickerCalendar
                prefixCls={prefixCls}
                showTime={showTime}
                showPrevMonth={state.showCalendarIndex === 1}
                showPrevYear={state.showCalendarIndex === 1}
                minDate={minDate}
                maxDate={maxDate}
                view={view}
                rangeDate={state.rangeDate}
                date={state.rangeDate[1]}
                value={state.tmpValue[1]}
                weekStartsOn={weekStartsOn}
                onViewChange={onEndViewChange}
                onPrevNextChange={onEndPrevNextChange}
                onChange={onEndCalendarChange}
              />
            )}
          </div>
          {state.showCalendarIndex === -1 && showTime && (
            <div className={`${prefixCls}-footer`}>
              <Button color="primary" size="sm">
                确定
              </Button>
            </div>
          )}
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
