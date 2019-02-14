import React, { Component } from "react";
import {
    AutoComplete,
    Button,
    Checkbox,
    DatePicker,
    Form,
    Icon,
    Input,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    TimePicker,
    Upload
} from "main";
import { data } from "../data";

const { RangePicker, YearPicker, MonthPicker, WeekPicker } = DatePicker;
const CheckboxGroup = Checkbox.CheckboxGroup;
const ButtonGroup = Button.Group;
const RadioGroup = Radio.RadioGroup;
const { createForm } = Form;
const { Option } = Select;
const selectOptions = [
    <Option key="1" title="选项一" value="选项一">
        选项一
    </Option>,
    <Option key="2" title="选项二" value="选项二">
        选项二
    </Option>,
    <Option key="3" title="选项三" value="选项三">
        选项三
    </Option>
];
const checkboxOptions = ["one", "two", "three", "four"];
const radioOptions = ["Apple", "Pear", "Orange"];
const action = "https://jsonplaceholder.typicode.com/posts/";

class FormView extends Component {
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
            <div>
                <h1>Form 表单</h1>
                <h3>布局</h3>
                <div className="k-example">
                    <Form
                        style={style}
                        onSubmit={this.handleSubmit}
                        mode={mode}
                    >
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
                                    onClick={this.handleSetMode.bind(
                                        this,
                                        "vertical"
                                    )}
                                >
                                    垂直
                                </Button>
                                <Button
                                    raised
                                    active={mode === "inline"}
                                    onClick={this.handleSetMode.bind(
                                        this,
                                        "inline"
                                    )}
                                >
                                    行内
                                </Button>
                            </ButtonGroup>
                        </Form.Item>
                        <Form.Item
                            label="用户名"
                            fieldName="username"
                            rules={[
                                { required: true, message: "请输入用户名" }
                            ]}
                            {...formItemLayout}
                            initialValue={"Apple"}
                        >
                            <RadioGroup options={radioOptions} />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            fieldName="password"
                            rules={[{ required: true, message: "请输入密码" }]}
                            validator={this.validateToNextPassword}
                            {...formItemLayout}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item
                            label="确认密码"
                            fieldName="confirm"
                            rules={[
                                { required: true, message: "请输入确认密码" }
                            ]}
                            validator={this.compareToFirstPassword}
                            {...formItemLayout}
                        >
                            <Input
                                type="password"
                                onBlur={this.handleConfirmBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            label="电子邮箱"
                            fieldName="email"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入电子邮箱"
                                },
                                { type: "email", message: "电子邮箱格式错误" }
                            ]}
                            {...formItemLayout}
                        >
                            <Input />
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
                </div>
                <h1>API</h1>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td />
                            <td />
                            <td />
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default createForm(FormView);
