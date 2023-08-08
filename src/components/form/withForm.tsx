import React from 'react';
import { FormContext } from './form.context';

class Form {
  private fields: any = {};
  private instances: any = {};

  init(instance) {
    const { name, value } = instance.props;

    if (name) {
      this.setFieldValue(name, value);
      this.instances[name] = instance;
    }
  }

  public setFieldValue = (name: string, value: any) => {
    this.fields = {
      ...this.fields,
      [name]: value,
    };
  };

  public getFieldValue = (name: string) => {
    return this.fields && this.fields[name];
  };

  public validateField = (name: string) => {
    const instance = this.instances[name];
    if (instance && instance.validate) {
      instance.validate();
    }
  };

  public validateFields = (callback?: (err: any, fields: any) => void) => {
    let count = 0;
    const length = Object.keys(this.instances).length;
    let err: any = null;

    for (const key in this.instances) {
      if (this.instances.hasOwnProperty(key)) {
        const instance = this.instances[key];
        if (instance.validate) {
          instance.validate((result, message) => {
            count++;
            if (!result) {
              if (!err) {
                err = {};
              }
              err[key] = message || '该字段无效';
            }
            if (callback && count === length) {
              callback(err, this.fields);
            }
          });
        }
      }
    }
  };

  public removeField = (name: string) => {
    const newFields = { ...this.fields };
    if (this.instances.hasOwnProperty(name)) {
      delete this.instances[name];
      delete newFields[name];
      this.fields = newFields;
    }
  };
}

export const withForm = (WrappedComponent) => {
  return class extends React.PureComponent<any> {
    private form: any = null;

    constructor(props) {
      super(props);
      this.form = new Form();
    }

    public render() {
      const cmptProps = {
        ...this.props,
        form: this.form,
      };

      return (
        <FormContext.Provider
          value={{
            form: this.form,
          }}
        >
          <WrappedComponent {...cmptProps} />
        </FormContext.Provider>
      );
    }
  };
};
