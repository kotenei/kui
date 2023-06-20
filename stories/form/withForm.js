import React, { Component } from 'react';

import { Form, withForm, FormField, Input, Button } from 'kui-react';

const Basic = ({ form, ...others }) => {
  const onSubmit = () => {
    if (form) {
      form.validateFields((err, fields) => {
        console.log(err, fields);
      });
    }
  };

  return (
    <div className="eds-form">
      <table>
        <tbody>
          <tr>
            <td valign="top">UserName:</td>
            <td>
              <FormField name="userName" tooltip rules={[{ type: 'required' }]}>
                <Input />
              </FormField>
            </td>
          </tr>
          <tr>
            <td valign="top">Password:</td>
            <td>
              <FormField name="password" tooltip rules={[{ type: 'required' }]}>
                <Input type="password" />
              </FormField>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <Button color="primary" onClick={onSubmit}>
                提交
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default class Demo extends Component {
  render() {
    const WithFormComp = withForm(Basic);
    return (
      <div className="story-demo-form">
        <WithFormComp />
      </div>
    );
  }
}
