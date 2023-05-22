import React, { LegacyRef, memo, useCallback } from 'react';
import classnames from 'classnames';

import { useState } from '../../hooks';
import { InputProps } from './typing';

const Input = React.forwardRef((props: InputProps, ref: LegacyRef<HTMLDivElement>) => {
  const {
    prefixCls = 'k-input',
    className,
    style,
    size,
    type = 'text',
    addonAfter,
    addonBefore,
    prefix,
    suffix,
    ...others
  } = props;
  const [state, setState] = useState({
    focus: false,
  });

  const onFocus = useCallback(
    (e) => {
      setState({
        focus: true,
      });
      if (props.onFocus) {
        props.onFocus(e);
      }
    },
    [props.onFocus],
  );

  const onBlur = useCallback(
    (e) => {
      setState({
        focus: false,
      });
      if (props.onBlur) {
        props.onBlur(e);
      }
    },
    [props.onBlur],
  );

  const onKeyUp = useCallback(
    (e) => {
      if (e.keyCode == 13 && props.onPressEnter) {
        props.onPressEnter(e);
      }
      if (props.onKeyUp) {
        props.onKeyUp(e);
      }
    },
    [props.onKeyUp, props.onPressEnter],
  );

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}-textarea`]: type === 'textarea',
      [`${prefixCls}-affix`]: (prefix || suffix) && type !== 'textarea',
      [`${prefixCls}-group`]: (addonBefore || addonAfter) && type !== 'textarea',
      [`${prefixCls}--${size}`]: size && type !== 'textarea',
      [`${prefixCls}--disabled`]: props.disabled,
      [`${prefixCls}--readOnly`]: props.readOnly,
      [`${prefixCls}--focus`]: state.focus,
    },
    className,
  );

  const renderContent = () => {
    return (
      <>
        {prefix || addonBefore ? (
          <span
            className={classnames({
              [`${prefixCls}-prefix`]: prefix,
              [`${prefixCls}-addon`]: addonBefore,
            })}
          >
            {prefix || addonBefore}
          </span>
        ) : null}
        {type !== 'textarea' ? (
          <input type={type} {...others} onFocus={onFocus} onBlur={onBlur} onKeyUp={onKeyUp} />
        ) : (
          <textarea {...others} onFocus={onFocus} onBlur={onBlur} onKeyUp={onKeyUp} />
        )}
        {suffix || addonAfter ? (
          <span
            className={classnames({
              [`${prefixCls}-suffix`]: suffix,
              [`${prefixCls}-addon`]: addonAfter,
            })}
          >
            {suffix || addonAfter}
          </span>
        ) : null}
      </>
    );
  };

  return (
    <div ref={ref} className={classString} style={style}>
      {renderContent()}
    </div>
  );
});

export default memo(Input);
