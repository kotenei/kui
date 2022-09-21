import React, { useCallback, useEffect, memo } from 'react';
import classnames from 'classnames';

import { useStateCallback } from '../../hooks';
import Checkbox from './checkbox';
import { CheckboxGroupProps } from './typing';

const CheckboxGroup = (props: CheckboxGroupProps) => {
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
    value: value || defaultValue || [],
  });

  useEffect(() => {
    if ('value' in props) {
      setState({
        value: value || [],
      });
    }
  }, [value]);

  const onChange = useCallback(
    (e, checked) => {
      const newValue = [...state.value];
      const value = e.target.value;
      const index = newValue.indexOf(value);

      if (index === -1) {
        newValue.push(value);
      } else {
        newValue.splice(index, 1);
      }

      if (!('value' in props)) {
        setState({
          value: newValue,
        });
      }

      if (props.onChange) {
        props.onChange(newValue);
      }
    },
    [state.value, props.onChange],
  );

  const renderContent = () => {
    if (options && options.length) {
      return options.map((item, index) => {
        let checked;

        if (typeof item === 'string') {
          checked = state.value.indexOf(item) > -1;
          return (
            <Checkbox
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
          checked = state.value.indexOf(item.value) > -1;
          return (
            <Checkbox
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

export default memo(CheckboxGroup);
