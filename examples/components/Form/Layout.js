import React, { Component } from "react";
import { Button, Form, Input } from "main";

const { Group: ButtonGroup } = Button;
const { createForm } = Form;

class Layout extends Component {
    state = {
        confirm: false,
        mode: "horizontal"
    };
    handleSetMode = mode => {
        this.setState({
            mode
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    };
    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirm: this.state.confirm || !!value });
    };
    validateToNextPassword = (value, callback) => {
        const { validateField } = this.props.form;
        const { confirm } = this.state;
        if (value && confirm) {
            validateField("confirm");
        }
        callback();
    };
    compareToFirstPassword = (value, callback) => {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue("password")) {
            callback("您输入的两个密码不一致！");
        } else {
            callback();
        }
    };
    render() {
        const { mode } = this.state;
        const style = mode == "horizontal" ? { width: 600 } : null;
        const formItemLayout =
            mode === "horizontal"
                ? {
                      labelCol: { span: 4 },
                      wrapperCol: { span: 14 }
                  }
                : null;
        const buttonItemLayout =
            mode === "horizontal"
                ? {
                      wrapperCol: { span: 14, offset: 4 }
                  }
                : null;
        return (
            <Form style={style} onSubmit={this.handleSubmit} mode={mode}>
                <Form.Item label="布局" {...formItemLayout}>
                    <ButtonGroup>
                        <Button
                            raised
                            active={mode === "horizontal"}
                            onClick={this.handleSetMode.bind(
                                this,
                                "horizontal"
                            )}
                        >
                            水平
                        </Button>
                        <Button
                            raised
                            active={mode === "vertical"}
                            onClick={this.handleSetMode.bind(this, "vertical")}
                        >
                            垂直
                        </Button>
                        <Button
                            raised
                            active={mode === "inline"}
                            onClick={this.handleSetMode.bind(this, "inline")}
                        >
                            行内
                        </Button>
                    </ButtonGroup>
                </Form.Item>
                <Form.Item label="用户名" {...formItemLayout} required>
                    <Form.Field
                        fieldName="username"
                        rules={[{ required: true, message: "请输入用户名" }]}
                    >
                        <Input />
                    </Form.Field>
                </Form.Item>
                <Form.Item label="密码" {...formItemLayout} required>
                    <Form.Field
                        fieldName="password"
                        rules={[{ required: true, message: "请输入密码" }]}
                        validator={this.validateToNextPassword}
                    >
                        <Input type="password" />
                    </Form.Field>
                </Form.Item>
                <Form.Item label="确认密码" {...formItemLayout} required>
                    <Form.Field
                        fieldName="confirm"
                        rules={[{ required: true, message: "请输入确认密码" }]}
                        validator={this.compareToFirstPassword}
                    >
                        <Input
                            type="password"
                            onBlur={this.handleConfirmBlur}
                        />
                    </Form.Field>
                </Form.Item>
                <Form.Item label="电子邮箱" {...formItemLayout} required>
                    <Form.Field
                        fieldName="email"
                        rules={[
                            {
                                required: true,
                                message: "请输入电子邮箱"
                            },
                            { type: "email", message: "电子邮箱格式错误" }
                        ]}
                    >
                        <Input />
                    </Form.Field>
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <div>
                        <Button
                            type="submit"
                            raised
                            kStyle="primary"
                            style={{ marginRight: 5 }}
                        >
                            注册
                        </Button>
                        <Button
                            raised
                            onClick={() => {
                                this.props.form.resetFields();
                            }}
                        >
                            重置
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        );
    }
}

export default createForm(Layout);
