import React, { Component } from 'react';

import { Form, FormItem, FormField, Input, Button, ButtonGroup } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-form">
        <Form tooltip>
          <FormItem label="用户名" required >
            <FormField name="username"  tooltip rules={[{ type: 'required', message: '请输入用户名' }]}>
              <Input autoComplete="off" />
            </FormField>
          </FormItem>
          <FormItem label="密码" required >
            <FormField name="password" tooltip rules={[{ type: 'required', message: '请输入密码' }]}>
              <Input type="password" autoComplete="off" />
            </FormField>
          </FormItem>
          <FormItem>
            <Button type="submit" color="primary">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
