import React, { memo, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { format as formatter, addYears, addMonths } from 'date-fns';
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
    format = 'yyyy-MM-dd',
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
  let now = new Date();
  now = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

  const [state, setState] = useState({
    show: false,
    focus: false,
    viewDate: value ||
      defaultValue || [
        now,
        view === 'year' || view === 'month'
          ? addYears(now, view === 'year' ? 10 : 1)
          : addMonths(now, 1),
      ],
    rangeDate: value || defaultValue || [],
    rangeHoverDate: null,
    showCalendarIndex: -1,
  });

  useEffect(() => {
    if ('value' in props && value && value.length === 2) {
      let viewDate = [
        new Date(value[0].getFullYear(), value[0].getMonth(), 1, 0, 0, 0),
        new Date(value[1].getFullYear(), value[1].getMonth(), 1, 0, 0, 0),
      ];
      let tmpRangeDate = [...value];

      if (value[1].getTime() < value[0].getTime()) {
        viewDate = viewDate.reverse();
        tmpRangeDate = tmpRangeDate.reverse();
      }

      if (view === 'year' && viewDate[0].getFullYear() === viewDate[1].getFullYear()) {
        viewDate[1] = addYears(viewDate[0], 10);
      }

      if (
        view === 'month' &&
        formatter(viewDate[0], 'yyyymm') === formatter(viewDate[1], 'yyyymm')
      ) {
        viewDate[1] = addYears(viewDate[0], 1);
      }

      if (
        (view === 'day' || view === 'week') &&
        formatter(viewDate[0], 'yyyymm') === formatter(viewDate[1], 'yyyymm')
      ) {
        viewDate[1] = addMonths(viewDate[0], 1);
      }

      setState({
        viewDate,
        rangeDate: tmpRangeDate,
      });
    }
  }, [view, value]);

  const [triggerRef] = useOutsideClick(
    {
      onClick: (e) => {
        const newState: any = {
          show: false,
          focus: false,
        };
        if (state.rangeDate) {
          if (state.rangeDate.length === 1) {
            newState.rangeDate = [];
          }
          if (state.rangeDate.length === 2 && showTime && onChange) {
            onChange(state.rangeDate);
          }
          setState(newState);
        }
      },
    },
    [state.rangeDate, showTime, onChange],
  );

  const onClick = useCallback((e) => {
    if (disabled) {
      return;
    }
    setState({
      show: true,
      focus: true,
    });
  }, []);

  const onClear = useCallback(
    (e) => {
      setState({
        rangeDate: [],
      });
      onChange && onChange();
    },
    [onChange],
  );

  const onHover = useCallback((date) => {
    setState({
      rangeHoverDate: date,
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
      const newViewDate: any = [];
      switch (type) {
        case 'prevYear':
        case 'nextYear':
          newViewDate[0] = date;
          newViewDate[1] =
            view === 'year' || view === 'month'
              ? addYears(date, view === 'year' ? 10 : 1)
              : addMonths(date, 1);
          break;
        case 'prevMonth':
        case 'nextMonth':
          newViewDate[0] = date;
          newViewDate[1] = addMonths(date, 1);
          break;
        default:
          break;
      }
      setState({
        viewDate: newViewDate,
      });
    },
    [view],
  );

  const onEndPrevNextChange = useCallback(
    (date, type) => {
      const newViewDate: any = [];
      switch (type) {
        case 'prevYear':
        case 'nextYear':
          newViewDate[0] =
            view === 'year' || view === 'month'
              ? addYears(date, view === 'year' ? -10 : -1)
              : addMonths(date, -1);
          newViewDate[1] = date;
          break;
        case 'prevMonth':
        case 'nextMonth':
          newViewDate[0] = addMonths(date, -1);
          newViewDate[1] = date;
          break;
        default:
          break;
      }
      setState({
        viewDate: newViewDate,
      });
    },
    [view],
  );

  const onStartCalendarChange = useCallback(
    (date, info) => {
      const val: any = getVal(date, { index: 0, isTime: info.isTime });
      const show = !showTime && val.length === 2 && info.view === view ? false : true;

      setState({
        showCalendarIndex: -1,
        viewDate: info.isTime
          ? state.viewDate
          : [
              date,
              view === 'year' || view === 'month'
                ? addYears(date, view === 'year' ? 10 : 1)
                : addMonths(date, 1),
            ],
        rangeDate: info.view === view ? val : state.rangeDate,
        show,
      });
      !show && onChange && onChange(val);
    },
    [view, state, showTime, onChange],
  );

  const onEndCalendarChange = useCallback(
    (date, info) => {
      const val: any = getVal(date, { index: 1, isTime: info.isTime });
      const show = !showTime && val.length === 2 && info.view === view ? false : true;
      setState({
        showCalendarIndex: -1,
        viewDate: info.isTime
          ? state.viewDate
          : [
              view === 'year' || view === 'month'
                ? addYears(date, view === 'year' ? -10 : -1)
                : addMonths(date, -1),
              date,
            ],
        rangeDate: info.view === view ? val : state.rangeDate,
        show,
      });
      !show && onChange && onChange(val);
    },
    [view, state, showTime, onChange],
  );

  const onOK = useCallback(() => {
    const newState: any = {
      show: false,
      focus: false,
    };
    if (state.rangeDate) {
      if (state.rangeDate.length === 1) {
        newState.rangeDate = [];
      }
      if (state.rangeDate.length === 2 &&onChange) {
        onChange(state.rangeDate);
      }
      setState(newState);
    }
  }, [state]);

  const getVal = (date, { index, isTime }) => {
    let newRange = [...state.rangeDate];

    if (isTime) {
      newRange[index] = date;
      if (newRange[0] && newRange[1] && newRange[0].getTime() > newRange[1].getTime()) {
        newRange[1] = newRange[0];
      }
    } else {
      if (newRange[0] && newRange[1]) {
        newRange = [date];
      } else {
        const tmpDate = newRange[0] || newRange[1];
        if (tmpDate) {
          if (tmpDate.getTime() > date.getTime()) {
            if (formatter(tmpDate, 'yyyyMMdd') === formatter(date, 'yyyyMMdd')) {
              newRange = [tmpDate, tmpDate];
            } else {
              newRange = [date, tmpDate];
            }
          } else {
            newRange = [tmpDate, date];
          }
        } else {
          newRange = [date];
        }
      }
    }

    return newRange;
  };

  const renderTrigger = () => {
    const { rangeDate, focus } = state;
    return (
      <div ref={triggerRef} className={`${prefixCls}-control`} onClick={onClick}>
        {trigger ? (
          trigger
        ) : (
          <div
            className={classnames({
              [`${prefixCls}-control-input`]: true,
              [`${prefixCls}-control-input--${size}`]: !!size,
              [`${prefixCls}-control-input--focus`]: focus,
            })}
          >
            <div className={`${prefixCls}-control-input__wrapper`}>
              <input
                type="text"
                placeholder={startPlaceholder}
                readOnly
                value={rangeDate && rangeDate[0] ? formatter(rangeDate[0], format) : ''}
              />
              <span className={`${prefixCls}-control-input__separator`}>{separator}</span>
              <input
                type="text"
                placeholder={endPlaceholder}
                readOnly
                value={rangeDate && rangeDate[1] ? formatter(rangeDate[1], format) : ''}
              />
            </div>
            <Icon className={`${prefixCls}-control-input__icon`}>
              {rangeDate && rangeDate.length && !disabled ? (
                <AiOutlineClose onClick={onClear} />
              ) : (
                <AiOutlineCalendar opacity={0.6} onClick={onClick} />
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
        <div className={classString} onClick={(e) => eventOmitHandler(e)}>
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
                rangeHoverDate={state.rangeHoverDate}
                date={state.viewDate[0]}
                value={state.rangeDate[0]}
                weekStartsOn={weekStartsOn}
                onViewChange={onStartViewChange}
                onPrevNextChange={onStartPrevNextChange}
                onChange={onStartCalendarChange}
                onHover={onHover}
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
                rangeHoverDate={state.rangeHoverDate}
                date={state.viewDate[1]}
                value={state.rangeDate[1]}
                weekStartsOn={weekStartsOn}
                onViewChange={onEndViewChange}
                onPrevNextChange={onEndPrevNextChange}
                onChange={onEndCalendarChange}
                onHover={onHover}
              />
            )}
          </div>
          {state.showCalendarIndex === -1 && showTime && (
            <div className={`${prefixCls}-footer`}>
              <Button color="primary" size="sm" onClick={onOK}>
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
