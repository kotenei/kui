import React, { Component } from "react";
import { Button, Form, Input, Checkbox } from "main";

const { createForm } = Form;

const defaultLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
};

class DynamicRules extends Component {
    state = {
        checkNick: false
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    };
    handleCheck = e => {
        this.setState(
            {
                checkNick: e.target.checked
            },
            () => {
                this.props.form.validateField("nickname");
            }
        );
    };
    render() {
        return (
            <Form style={{ width: 600 }} onSubmit={this.handleSubmit}>
                <Form.Item
                    label="名称"
                    fieldName="name"
                    rules={[{ required: true, message: "请输入名称" }]}
                    {...defaultLayout}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="昵称"
                    fieldName="nickname"
                    rules={[
                        {
                            required: this.state.checkNick,
                            message: "请输入昵称"
                        }
                    ]}
                    {...defaultLayout}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...{ wrapperCol: { span: 14, offset: 4 } }}>
                    <Checkbox onChange={this.handleCheck}>昵称必填</Checkbox>
                </Form.Item>
                <Form.Item {...{ wrapperCol: { span: 14, offset: 4 } }}>
                    <Button type="submit" raised kStyle="primary">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default createForm(DynamicRules);
