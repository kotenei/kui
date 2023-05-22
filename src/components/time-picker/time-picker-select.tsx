import React, { memo } from 'react';
import classnames from 'classnames';

import { TimePickerSelectProps } from './typing';
import classNames from 'classnames';

const TimePickerSelect = (props: TimePickerSelectProps) => {
  const { prefixCls } = props;

  const classString = classNames({
    [`${prefixCls}-select`]: true,
  });

  return (
    <div className={classString}>
      <ul></ul>
    </div>
  );
};

export default memo(TimePickerSelect);
