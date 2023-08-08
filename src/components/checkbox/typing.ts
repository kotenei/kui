import React, { HTMLAttributes } from 'react';

export interface CheckboxProps extends KUI.BasicProps<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  checked?: boolean;
  color?: KUI.ColorTypes;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  indeterminate?: boolean;
  id?: string;
  label?: React.ReactNode | string;
  name?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export interface CheckboxGroupProps
  extends KUI.BasicProps<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  color?: KUI.ColorTypes;
  defaultValue?: Array<string>;
  disabled?: boolean;
  value?: Array<string>;
  options?: Array<CheckboxProps> | Array<string>;
  onChange?: (values: Array<string>) => void;
}
