import React, { memo, useCallback, useEffect } from 'react';
import classnames from 'classnames';

import { Loading } from '../loading';
import { SwitchProps } from './typing';
import { useStateCallback } from '../../hooks';

const Switch = (props: SwitchProps) => {
  const {
    prefixCls = 'k-switch',
    className,
    defaultChecked,
    checked,
    disabled,
    checkedContent,
    unCheckedContent,
    onChange,
    ...others
  } = props;

  const [state, setState] = useStateCallback({
    checked: checked || defaultChecked,
  });

  useEffect(() => {
    if (checked !== undefined) {
      setState({
        checked,
      });
    }
  }, [checked]);

  const onClick = useCallback(
    (e) => {
      const newChecked = !state.checked;
      if (disabled) {
        return;
      }
      if (!('checked' in props)) {
        setState({
          checked: newChecked,
        });
      }
      if (onChange) {
        onChange(newChecked);
      }
    },
    [state.checked, disabled, onChange],
  );

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--checked`]: state.checked,
      [`${prefixCls}--disabled`]: disabled,
    },
    className,
  );

  return (
    <div className={classString} onClick={onClick} {...others}>
      <span className={`${prefixCls}-inner`}>
        {state.checked ? checkedContent : unCheckedContent}
        <span className={`${prefixCls}-inner__dot`}></span>
      </span>
    </div>
  );
};

export default memo(Switch);
