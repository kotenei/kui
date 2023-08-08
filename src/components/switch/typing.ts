import React from 'react';

export interface SwitchProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  checkedContent?: React.ReactNode;
  unCheckedContent?: React.ReactNode;
  onChange: (val) => void;
}
