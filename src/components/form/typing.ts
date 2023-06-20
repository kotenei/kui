import { TooltipPlacementType } from '../tooltip/typing';

export type RuleType =
  | 'required'
  | 'email'
  | 'date'
  | 'number'
  | 'minLength'
  | 'maxLength'
  | 'rangeLength'
  | 'min'
  | 'max'
  | 'range'
  | 'regex';

export interface FormFieldState {
  errMsg?: string;
  value?: any;
  validated?: boolean;
}

export interface Rule {
  type: RuleType;
  message?: string;
  params?: any;
}

export type FormMode = 'horizontal' | 'vertical' | 'inline';

export interface FormProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  mode?: FormMode;
  onSubmit?: (error: any, fields: any) => void;
}

export interface FormItemProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>> {
  colon?: boolean;
  label?: string | React.ReactNode;
  labelCol?: object;
  required?: boolean;
  wrapperCol?: object;
}

export interface FormFieldProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLElement>, 'onChange'> {
  name?: string;
  value?: any;
  focusClear?: boolean;
  rules?: Rule[];
  tooltip?: boolean;
  tooltipPlacement?: TooltipPlacementType;
  getValueFromEvent?: (...params) => any;
  validator?: (form: object, value: any, callback: (errMsg?: string) => void) => void;
  onValidate?: (result: boolean, message: string) => void;
  onChange?: (name: string, value: any) => void;
}
