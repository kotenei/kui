import React, { useEffect, useCallback, memo } from 'react';
import classnames from 'classnames';

import { useStateCallback } from '../../hooks';
import Radio from './radio';
import { RadioGroupProps } from './typing';

const RadioGroup = (props: RadioGroupProps) => {
  const {
    prefixCls = 'k-checkbox-group',
    options,
    children,
    defaultValue,
    value,
    disabled,
    color,
  } = props;
  const [state, setState] = useStateCallback({
    value: value || defaultValue || '',
  });

  useEffect(() => {
    if ('value' in props) {
      setState({
        value: value || '',
      });
    }
  }, [value]);

  const onChange = useCallback(
    (e, checked) => {
      const value = e.target.value;

      if (!('value' in props)) {
        setState({
          value,
        });
      }

      if (props.onChange) {
        props.onChange(value);
      }
    },
    [state.value, props.onChange],
  );

  const renderContent = () => {
    if (options && options.length) {
      return options.map((item, index) => {
        let checked;

        if (typeof item === 'string') {
          checked = state.value === item;
          return (
            <Radio
              key={index}
              label={item}
              value={item}
              checked={checked}
              disabled={disabled}
              color={color}
              onChange={onChange}
            />
          );
        } else {
          checked = state.value === item.value;
          return (
            <Radio
              key={index}
              {...item}
              disabled={disabled || item.disabled}
              checked={checked}
              color={color || item.color}
              onChange={onChange}
            />
          );
        }
      });
    }
    return children;
  };

  return (
    <div className={classnames(prefixCls, props.className)} style={props.style}>
      {renderContent()}
    </div>
  );
};

export default memo(RadioGroup);
