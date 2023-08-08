import React, { memo, useContext, useMemo } from 'react';
import classnames from 'classnames';

import validate from './validate';
import { ValidationMsg } from '../validation-msg';
import { Tooltip } from '../tooltip';
import { FormFieldProps } from './typing';
import { useState } from '../../hooks';
import { FormContext } from './form.context';
import { omit } from '../../utils';

interface FormFieldState {
  rules?: any;
  errMsg?: string;
  errType?: string;
  value?: any;
  validated?: boolean;
  focus?: boolean;
}

class FormField extends React.PureComponent<FormFieldProps, FormFieldState> {
  static contextType = FormContext;
  static displayName = 'FormField';

  static defaultProps = {
    focusClear: false,
    tooltip: false,
    tooltipPlacement: 'right',
  };

  static getDerivedStateFromProps(nextprops, prevState) {
    const { rules, validator } = nextprops;
    let count = 0;
    const tmpRules = {};

    if (rules && rules.length > 0) {
      rules.forEach((rule) => {
        tmpRules[rule.type] = {
          message: rule.message || validate.messages[rule.type],
          params: rule.params,
        };
        count++;
      });
    }

    if (count === 0 && prevState.errMsg && !validator) {
      return {
        errMsg: '',
        errType: '',
        validated: false,
      };
    }

    return { rules: tmpRules };
  }

  constructor(props, context) {
    super(props);
    const { form } = context;

    if (form) {
      form.init(this);
    }

    this.state = {
      rules: {},
      errMsg: '',
      errType: '',
      value: props.value,
      validated: false,
    };
  }

  public componentWillUnmount() {
    const { form } = this.context;
    const { name } = this.props;
    if (form && form.removeField) {
      form.removeField(name);
    }
  }

  public componentDidUpdate(preProps, preState) {
    const { form } = this.context;
    if (this.props.value !== preProps.value && form) {
      form.setFieldValue(this.props.name, this.props.value);
      this.setState({
        value: this.props.value,
      });
    }
  }

  public render() {
    const {
      className,
      children,
      name,
      prefixCls = 'k-form-field',
      tooltip,
      tooltipPlacement,
      ...others
    } = this.props;
    const { form } = this.context;
    const { errMsg, value, validated } = this.state;
    const classString = classnames(
      {
        [prefixCls]: true,
        [`${prefixCls}--error`]: errMsg,
        [`${prefixCls}--success`]: !errMsg && validated,
      },
      className,
    );

    const props = omit(others, [
      'value',
      'rules',
      'getValueFromEvent',
      'validator',
      'focusClear',
      'onValidate',
      'onChange',
    ]);

    const val = form && form.getFieldValue ? form.getFieldValue(name) : value;

    const content = children
      ? React.Children.map(children, (child: any) => {
          return React.cloneElement(child, {
            ...child.props,
            value: val||'',
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onChange,
          });
        })
      : null;

    return (
      <div className={classString} {...props}>
        {tooltip ? (
          <Tooltip
            color="danger"
            show={errMsg && errMsg.length ? true : false}
            placement={tooltipPlacement}
            title={errMsg}
          >
            {content}
          </Tooltip>
        ) : (
          <>
            {content}
            <ValidationMsg
              className={`${prefixCls}__error`}
              show={!!errMsg}
              showIcon={false}
              message={errMsg}
            />
          </>
        )}
      </div>
    );
  }

  private readonly onFocus = () => {
    const { focusClear } = this.props;
    if (focusClear) {
      this.setState({
        errMsg: '',
        focus: true,
      });
    }
  };

  private readonly onBlur = () => {
    const { focusClear, onValidate } = this.props;
    if (focusClear) {
      this.setState(
        {
          focus: false,
        },
        () => {
          this.validate(onValidate);
        },
      );
    }
  };

  private readonly onChange = (...args) => {
    const { name, focusClear, getValueFromEvent, onValidate, onChange } = this.props;
    const { form } = this.context;
    const { focus } = this.state;
    let value;

    if (getValueFromEvent) {
      value = getValueFromEvent(...args);
    } else {
      const e = args[0];
      if (e && e.target) {
        const { target } = e;
        value =
          target.type === 'checkbox' || target.type === 'radio' ? target.checked : target.value;
      } else {
        value = e;
      }
    }

    if (form && form.setFieldValue) {
      form.setFieldValue(name, value);
    }

    this.setState(
      {
        value,
      },
      () => {
        if (!focus && !focusClear) {
          this.validate(onValidate);
        }
      },
    );

    if (onChange) {
      onChange(name || '', value);
    }
  };

  private readonly validate = (callback?: (result: boolean, message: string) => void) => {
    const { name, validator } = this.props;
    const { form } = this.context;
    const { rules } = this.state;
    let result = true;
    let message;
    let errType;
    const value = form && form.getFieldValue ? form.getFieldValue(name) : this.state.value;

    if (rules) {
      for (const method in rules) {
        const rule = rules[method];
        result = validate.methods[method](value, rule.params);
        if (!result) {
          message = this.formatMessage(rule.message, rule.params);
          errType = rule.type;
          break;
        }
      }
    }

    this.setState(
      {
        errMsg: message,
        errType,
        validated: true,
      },
      () => {
        if (validator) {
          validator(form, value, (msg) => {
            if (msg) {
              message = msg;
              result = false;
              this.setState(
                {
                  errMsg: message,
                  errType: '',
                },
                () => {
                  if (callback) {
                    callback(result, message);
                  }
                },
              );
            } else {
              if (callback) {
                callback(result, message);
              }
            }
          });
        } else {
          if (callback) {
            callback(result, message);
          }
        }
      },
    );
  };

  private readonly formatMessage = (message, params) => {
    if (message.indexOf('{0}') !== -1) {
      if (!Array.isArray(params)) {
        params = [params];
      }
      params.forEach((v, i) => {
        message = message.replace(new RegExp('\\{' + i + '\\}', 'g'), function () {
          return v;
        });
      });
    }
    return message;
  };
}

export default FormField;
