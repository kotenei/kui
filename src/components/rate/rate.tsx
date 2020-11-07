import React, { memo, useCallback, useState } from 'react';
import classnames from 'classnames';

import { Icon } from '../icon';
import RateItem from './rate-item';
import { RateProps } from './typing';
import { useStateCallback } from '../../hooks';
import { AiFillStar } from 'react-icons/ai';

const Rate = (props: RateProps) => {
  const {
    prefixCls = 'k-rate',
    disabled,
    className,
    value = 0,
    defaultValue,
    allowHalf,
    character,
    count = 0,
    onChange,
    ...others
  } = props;

  const [state, setState] = useStateCallback({
    value: value || defaultValue,
    orgValue: value || defaultValue,
  });

  const onStarHover = useCallback(val => {
    if (disabled) {
      return;
    }

    setState({
      value: val,
    });

    if (onChange) {
      onChange(val);
    }
  }, []);

  const onStarClick = useCallback((val: number) => {
    if (disabled) {
      return;
    }
    if (!('value' in props)) {
      setState({
        value: val,
        orgValue: val,
      });
    }
    if (onChange) {
      onChange(val);
    }
  }, []);

  const onLeave = useCallback(
    e => {
      setState({
        value: state.orgValue,
      });
    },
    [state],
  );

  const renderStar = () => {
    const items: any = [];
    for (let i = 0; i < count; i++) {
      items.push(
        <RateItem
          key={i}
          current={state.value}
          value={i + 1}
          prefixCls={prefixCls}
          character={character}
          allowHalf={allowHalf}
          onHover={onStarHover}
          onClick={onStarClick}
        />,
      );
    }
    return items;
  };

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--disabled`]: !!disabled,
    },
    className,
  );

  return (
    <ul className={classString} {...others} onMouseLeave={onLeave}>
      {renderStar()}
    </ul>
  );
};

Rate.defaultProps = {
  allowHalf: false,
  count: 5,
  character: (
    <Icon>
      <AiFillStar />
    </Icon>
  ),
  defaultValue: 0,
  disabled: false,
};

export default memo(Rate);
