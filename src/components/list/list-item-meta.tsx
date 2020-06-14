import React, { memo } from 'react';

import { ListItemMetaProps } from './typing';

const ListItemMeta = (props: ListItemMetaProps) => {
  const {
    prefixCls = 'k-list-item-meta',
    avatar,
    description,
    title,
    className,
    ...others
  } = props;

  return (
    <div className={`${prefixCls} ${className}`} {...others}>
      <div className={`${prefixCls}__avatar`}>{avatar}</div>
      <div className={`${prefixCls}__content`}>
        <div className={`${prefixCls}__title`}>{title}</div>
        <div className={`${prefixCls}__description`}>{description}</div>
      </div>
    </div>
  );
};

export default memo(ListItemMeta);
