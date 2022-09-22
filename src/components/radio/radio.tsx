import React, { useEffect, useCallback, memo } from 'react';
import classnames from 'classnames';

import { Icon } from '../icon';
import { RadioProps } from './typing';
import { useStateCallback } from '../../hooks';
import { IconCheck, IconUnCheck } from './icons';

const Radio = (props: RadioProps) => {
  const {
    prefixCls = 'k-radio',
    className,
    readOnly,
    checked,
    defaultChecked,
    disabled,
    label,
    color,
    id,
    name,
    value,
    onChange,
  } = props;

  const [state, setState] = useStateCallback({
    checked: checked || defaultChecked || false,
  });

  useEffect(() => {
    if ('checked' in props && checked !== undefined) {
      setState({
        checked,
      });
    }
  }, [checked]);

  const onInputChange = useCallback(
    (e) => {
      if (readOnly || disabled) {
        return;
      }
      const checked = e.target.checked;

      if (!('checked' in props)) {
        setState({
          checked,
        });
      }
      if (onChange) {
        onChange(e, checked);
      }
    },
    [state.checked, readOnly, disabled, onChange],
  );

  const classString = classnames(prefixCls, className, {
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--readOnly`]: readOnly,
  });

  return (
    <div className={classString}>
      <label>
        <input
          type="radio"
          id={id}
          name={name}
          checked={state.checked}
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          onChange={onInputChange}
        />
        <Icon
          className={classnames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-icon--checked`]: state.checked,
            [`${prefixCls}-icon--${color}`]: !!color && state.checked,
          })}
        >
          {state.checked ? <IconCheck /> : <IconUnCheck />}
        </Icon>
        <span className={`${prefixCls}-label`}>{label || props.children}</span>
      </label>
    </div>
  );
};

export default memo(Radio);
