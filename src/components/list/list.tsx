import React, { memo, useMemo } from 'react';
import classnames from 'classnames';

import ListItem from './list-item';
import { ListProps } from './typing';

const List = (props: ListProps) => {
  const {
    prefixCls = 'k-list',
    className,
    children,
    data,
    header,
    footer,
    bordered,
    split,
    size,
    renderItem,
    ...others
  } = props;

  const items = useMemo(() => {
    if (data && data.length) {
      return data.map((item, index) => {
        return <ListItem key={index}>{renderItem ? renderItem(item, index) : item}</ListItem>;
      });
    } else {
      return React.Children.map(children, (child: any, index) => {
        if (
          (child && child.type && child.type.type.displayName === 'ListItem') ||
          child.type.type.displayName === 'ListItemMeta'
        ) {
          return child;
        }
        return null;
      });
    }
    return null;
  }, [data]);

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}-bordered`]: !!bordered,
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-${size}`]: !!size,
    },
    className,
  );
  return (
    <ul className={classString} {...others}>
      {header && <li className={`${prefixCls}-header`}>{header}</li>}
      {items}
      {footer && <li className={`${prefixCls}-footer`}>{footer}</li>}
    </ul>
  );
};

List.defaultProps = {
  split: true,
  renderItem: (item, index) => item,
};

export default memo(List);
