import React, { memo } from 'react';
import classnames from 'classnames';

import { Row, Col } from '../grid';
import { FormItemProps } from './typing';

const FormItem = (props: FormItemProps) => {
  const {
    prefixCls = `k-form-item`,
    className,
    label,
    style,
    colon = true,
    required = false,
    labelCol,
    wrapperCol,
    children,
  } = props;
  const classString = classnames(
    {
      [prefixCls]: true,
    },
    className,
  );

  return (
    <Row className={classString} style={style}>
      {label ? (
        <Col
          className={classnames({
            [`${prefixCls}__label`]: true,
            [`${prefixCls}__label--colon`]: colon,
            [`${prefixCls}__label--required`]: required,
          })}
          {...labelCol}
        >
          {label}
        </Col>
      ) : null}
      <Col className={`${prefixCls}__wrapper`} {...wrapperCol}>
        {children}
      </Col>
    </Row>
  );
};

export default memo(FormItem);
