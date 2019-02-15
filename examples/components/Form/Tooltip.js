import React, { Component } from "react";
import { Button, Form, Input } from "main";

const { createForm } = Form;

const defaultLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
};

class FormTooltip extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    };
    render() {
        return (
            <Form style={{ width: 600 }} onSubmit={this.handleSubmit}>
                <Form.Item label="用户名" {...defaultLayout} required>
                    <Form.Field
                        fieldName="name"
                        rules={[{ required: true, message: "请输入名称" }]}
                        tooltip
                    >
                        <Input />
                    </Form.Field>
                </Form.Item>
                <Form.Item label="密码" {...defaultLayout} required>
                    <Form.Field
                        fieldName="password"
                        rules={[{ required: true, message: "请输入密码" }]}
                        tooltip
                    >
                        <Input type="password" />
                    </Form.Field>
                </Form.Item>
                <Form.Item {...{ wrapperCol: { span: 14, offset: 4 } }}>
                    <Button
                        type="submit"
                        raised
                        kStyle="primary"
                        style={{ width: "100%" }}
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default createForm(FormTooltip);
