import React, { memo } from 'react';
import classnames from 'classnames';

import { BreadcrumbProps } from './typing';

const Breadcrumb = (props: BreadcrumbProps) => {
  const { prefixCls = 'k-breadcrumb', className, children, separator, ...others } = props;

  const renderContent = () => {
    return React.Children.map(children, (child: any) => {
      if (child && child.type && child.type.type.displayName === 'BreadcrumbItem') {
        return React.cloneElement(child, {
          prefixCls,
          separator,
          ...child.props,
        });
      }
      return null;
    });
  };

  return (
    <ul className={classnames(prefixCls, className)} {...others}>
      {renderContent()}
    </ul>
  );
};

Breadcrumb.defaultProps = {
  separator: '/',
};

export default memo(Breadcrumb);
