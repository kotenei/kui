import React, { memo, useMemo } from 'react';
import classnames from 'classnames';

import { BreadcrumbProps } from './typing';

const Breadcrumb = (props: BreadcrumbProps) => {
  const { prefixCls = 'k-breadcrumb', className, children, separator, ...others } = props;

  const content = useMemo(() => {
    return React.Children.map(children, (child: any, index) => {
      if (child && child.type && child.type.type.displayName === 'BreadcrumbItem') {
        return React.cloneElement(child, {
          prefixCls,
          separator,
          ...child.props,
        });
      }
      return null;
    });
  }, [separator]);

  return (
    <ul className={classnames(prefixCls, className)} {...others}>
      {content}
    </ul>
  );
};

Breadcrumb.defaultProps = {
  separator: '/',
};

export default memo(Breadcrumb);
