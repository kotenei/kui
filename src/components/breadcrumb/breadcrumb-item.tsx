import React, { memo } from 'react';

import { Icon } from '../icon';
import { BreadcrumbItemProps } from './typing';

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const { prefixCls, separator, href, children, current, icon } = props;
  const iconContent = icon && <Icon>{icon}</Icon>;
  const renderItemContent = () => {
    const curClass = current ? `${prefixCls}__current` : undefined;
    if (href) {
      return (
        <a className={`${prefixCls}__link`} href={href} target="_blank;">
          {iconContent}
          <span className={curClass}>{children}</span>
        </a>
      );
    } else {
      return (
        <React.Fragment>
          {iconContent}
          <span className={curClass}>{children}</span>
        </React.Fragment>
      );
    }
  };

  return (
    <li className={`${prefixCls}__item`} onClick={props.onClick}>
      {renderItemContent()}
      <span className={`${prefixCls}__separator`}>{separator}</span>
    </li>
  );
};

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default memo(BreadcrumbItem);
