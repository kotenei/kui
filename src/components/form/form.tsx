import React, { memo, useCallback, useContext } from 'react';
import classnames from 'classnames';

import { withForm } from './withForm';
import { FormContext } from './form.context';
import { FormProps } from './typing';

const Form = (props: FormProps) => {
  const { prefixCls = 'k-form', className, children, mode = 'horizontal' } = props;
  const formContext = useContext(FormContext);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (formContext && formContext.form) {
        const form: any = formContext.form;
        form.validateFields((err, fields) => {
          if (props.onSubmit) {
            props.onSubmit(err, fields);
          }
        });
      }
    },
    [props.onSubmit],
  );

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${mode}`]: mode,
    },
    className,
  );

  return (
    <form className={classString} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default withForm(memo(Form));
