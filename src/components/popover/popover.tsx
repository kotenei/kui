import React, { memo } from 'react';

import { PopoverProps } from './typing';
import { Tooltip } from '../tooltip';
import { omit } from '../../utils';

const Popover = (props: PopoverProps) => {
  const { prefixCls = 'k-popover', className, children, title, content, ...others } = props;
  const tooltipProps = omit(others, ['color']);

  return (
    <Tooltip
      prefixCls={prefixCls}
      title={
        <React.Fragment>
          {title ? <div className={`${prefixCls}__title`}>{title}</div> : null}
          <div className={`${prefixCls}__content`}>{content}</div>
        </React.Fragment>
      }
      className={className}
      {...tooltipProps}
    >
      {children}
    </Tooltip>
  );
};

export default memo(Popover);
