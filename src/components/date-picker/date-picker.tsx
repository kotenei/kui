import React, { memo, useCallback } from 'react';
import classnames from 'classnames';
import { AiOutlineClose, AiOutlineCalendar } from 'react-icons/ai';

import { Input } from '../input';
import { Tooltip } from '../tooltip';
import { PopPanel } from '../pop-panel';
import { useOutsideClick, useState } from '../../hooks';
import { DatePickerProps } from './typing';

const DatePicker = (props: DatePickerProps) => {
  const { prefixCls = 'k-datepicker', className, disabled, placeholder, size } = props;
  const [state, setState] = useState({
    show: false,
    value: '',
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

  const onInputClick = useCallback(() => {
    if (disabled) {
      return;
    }
    setState({
      show: true,
    });
  }, [disabled]);

  const onClear = useCallback(() => {
    if (props.onChange) {
      props.onChange();
    }
  }, [disabled, props.onChange]);

  const renderSuffix = () => {
    const { value } = state;
    if (value && !disabled) {
      return <AiOutlineClose className={`${prefixCls}-input-close`} onClick={onClear} />;
    }
    return (
      <AiOutlineCalendar
        opacity={0.6}
        onClick={() => {
          onInputClick();
          triggerRef.current.children[0].focus();
        }}
      />
    );
  };

  const renderContent = () => {
    return (
      <PopPanel trigger={triggerRef.current} show={state.show}>
        <div>asdf</div>
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
        value={state.value}
        onClick={onInputClick}
        onChange={() => {}}
      />
      {renderContent()}
    </>
  );
};

export default memo(DatePicker);
