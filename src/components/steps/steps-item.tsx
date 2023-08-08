import React, { memo } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import classnames from 'classnames';

import { Icon } from '../icon';
import { StepsItemProps } from './typing';

const StepsItem = (props: StepsItemProps) => {
  const {
    prefixCls = 'k-steps-item',
    index = 0,
    status,
    icon,
    title,
    description,
    iconInner,
    ...others
  } = props;

  const renderIconContent = () => {
    if (icon) {
      return icon;
    }
    if (status === 'finish') {
      return <AiOutlineCheck />;
    }
    if (status === 'error') {
      return <AiOutlineClose />;
    }

    return index + 1;
  };

  const classString = classnames({
    [prefixCls]: true,
    [`${prefixCls}--${status}`]: true,
  });

  const iconClassString = classnames({
    [`${prefixCls}__icon`]: true,
    [`${prefixCls}__icon--customize`]: !!icon && !iconInner,
  });

  return (
    <div className={classString} {...others}>
      <div className={`${prefixCls}__tail`} />
      <div className={iconClassString}>{<Icon>{renderIconContent()}</Icon>}</div>
      <div className={`${prefixCls}__content`}>
        <div className={`${prefixCls}__title`}>{title}</div>
        <div className={`${prefixCls}__description`}>{description}</div>
      </div>
    </div>
  );
};

StepsItem.displayName = 'Step';

export default memo(StepsItem);
