import React, { Component } from 'react';

import { Form, FormItem, FormField, Input, Button, ButtonGroup } from 'kui-react';

export default class Demo extends Component {
  state = {
    mode: 'horizontal',
  };
  render() {
    const { mode } = this.state;
    const formItemLayout =
      mode === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;
    const buttonItemLayout =
      mode === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : null;
    const style = mode !== 'inline' ? { width: 600 } : null;
    return (
      <div className="story-demo-form" style={style}>
        <Form mode={mode}>
          <FormItem label="布局" {...formItemLayout}>
            <ButtonGroup>
              <Button
                active={mode === 'horizontal'}
                onClick={() => this.setState({ mode: 'horizontal' })}
              >
                水平
              </Button>
              <Button
                active={mode === 'vertical'}
                onClick={() => this.setState({ mode: 'vertical' })}
              >
                垂直
              </Button>
              <Button active={mode === 'inline'} onClick={() => this.setState({ mode: 'inline' })}>
                行内
              </Button>
            </ButtonGroup>
          </FormItem>
          <FormItem label="用户名" required {...formItemLayout}>
            <FormField name="username" rules={[{ type: 'required', message: '请输入用户名' }]}>
              <Input autoComplete="off" />
            </FormField>
          </FormItem>
          <FormItem label="密码" required {...formItemLayout}>
            <FormField name="password" rules={[{ type: 'required', message: '请输入密码' }]}>
              <Input type="password" autoComplete="off" />
            </FormField>
          </FormItem>
          <FormItem label="邮箱" required {...formItemLayout}>
            <FormField
              name="email"
              rules={[{ type: 'required', message: '请输入邮箱' }, { type: 'email' }]}
            >
              <Input autoComplete="off" />
            </FormField>
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="submit" color="primary">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
