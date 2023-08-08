import React, { HTMLAttributes } from 'react';

export interface RadioProps extends KUI.BasicProps<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  checked?: boolean;
  color?: KUI.ColorTypes;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  label?: React.ReactNode | string;
  name?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export interface RadioGroupProps
  extends KUI.BasicProps<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  color?: KUI.ColorTypes;
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  options?: Array<RadioProps> | string[];
  onChange?: (value: string) => void;
}
