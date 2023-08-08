import React from 'react';

export type InputType = 'text' | 'textarea' | 'password';

export interface InputProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>, 'onChange' | 'prefix'> {
  id?: string;
  name?: string;
  type?: InputType;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: 'sm' | 'lg';
  onFocus?: (e) => void;
  onBlur?: (e) => void;
  onChange?: (e) => void;
  onKeyUp?: (e) => void;
  onPressEnter?: (e) => void;
}
