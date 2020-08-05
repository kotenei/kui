import React, { memo, useMemo } from 'react';

import { PopoverProps } from './typing';
import { Tooltip } from '../tooltip';
import { omit } from '../../utils';

const Popover = (props: PopoverProps) => {
  const { prefixCls = 'k-popover', className, children, title, content, ...others } = props;

  const popoverContent = useMemo(() => {
    return (
      <React.Fragment>
        {title ? <div className={`${prefixCls}__title`}>{title}</div> : null}
        <div className={`${prefixCls}__content`}>{content}</div>
      </React.Fragment>
    );
  }, [title, content]);

  const tooltipProps = omit(others, ['color']);

  return (
    <Tooltip prefixCls={prefixCls} title={popoverContent} className={className} {...tooltipProps}>
      {children}
    </Tooltip>
  );
};

export default memo(Popover);
