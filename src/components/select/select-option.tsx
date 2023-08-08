import React, { memo } from 'react';

import { MenuItem } from '../menu';
import { SelectOptionProps } from './typing';

const SelectOption = (props: SelectOptionProps) => {
  // return null;
  return (
    <MenuItem key={props.value} disabled={props.disabled}>
      {props.children}
    </MenuItem>
  );
};

SelectOption.displayName = 'SelectOption';

export default memo(SelectOption);
