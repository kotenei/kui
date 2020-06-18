import React, { memo, useMemo } from 'react';
import classnames from 'classnames';

import { CardProps } from './typing';

const Card = (props: CardProps) => {
  const {
    prefixCls = 'k-card',
    className,
    children,
    title,
    extra,
    bordered,
    cover,
    actions,
    ...others
  } = props;
  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--bordered`]: !!bordered,
    },
    className,
  );

  const actionItems = useMemo(() => {
    if (actions && actions.length) {
      return actions.map(item => {
        return <li className={`${prefixCls}-actions-item`}>{item}</li>;
      });
    }
    return null;
  }, [actions]);

  return (
    <div className={classString} {...others}>
      {(title || extra) && (
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-header__title`}>{title}</div>
          <div className={`${prefixCls}-header__extra`}>{extra}</div>
        </div>
      )}
      {cover && <div className={`${prefixCls}-cover`}>{cover}</div>}
      <div className={`${prefixCls}-body`}>{children}</div>
      {actions && <ul className={`${prefixCls}-actions`}>{actionItems}</ul>}
    </div>
  );
};

Card.defaultProps = {
  bordered: true,
};

export default memo(Card);
