import React, { memo, useCallback, useEffect } from 'react';
import classnames from 'classnames';

import { Icon } from '../icon';
import { CheckboxProps } from './typing';
import { useState } from '../../hooks';
import { IconCheck, IconIndeterminate, IconUnCheck } from './icons';

const Checkbox = (props: CheckboxProps) => {
  const {
    prefixCls = 'k-checkbox',
    className,
    readOnly,
    checked,
    defaultChecked,
    disabled,
    indeterminate,
    label,
    color,
    id,
    name,
    value,
    onChange,
  } = props;

  const [state, setState] = useState({
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
      if (!('checked' in props)) {
        setState({
          checked: !state.checked,
        });
      }
      if (onChange) {
        onChange(e, !state.checked);
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
          id={id}
          name={name}
          type="checkbox"
          checked={state.checked}
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          onChange={onInputChange}
        />
        <Icon
          className={classnames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-icon--checked`]: state.checked || indeterminate,
            [`${prefixCls}-icon--${color}`]: !!color && (state.checked || indeterminate),
          })}
        >
          {state.checked && <IconCheck />}
          {!state.checked && !indeterminate && <IconUnCheck />}
          {!state.checked && indeterminate && <IconIndeterminate />}
          <span className={`${prefixCls}-label`}>{label || props.children}</span>
        </Icon>
      </label>
    </div>
  );
};

export default memo(Checkbox);
