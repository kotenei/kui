import React, { Component } from "react";
import { Button, Form, Input, Checkbox } from "main";

const { createForm } = Form;

const defaultLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
};

let id = 1;

class DynamicFields extends Component {
    state = {
        checkNick: false,
        keys: [1]
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    };

    handleAdd = () => {};

    handleRemove = () => {};

    render() {
        const { keys } = this.state;
        const formItems = keys.map(k => {
            return (
                <Form.Item
                    key={k}
                    label={`field ${k}`}
                    fieldName={`field${k}`}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            );
        });

        return (
            <Form style={{ width: 600 }} onSubmit={this.handleSubmit}>
                {formItems}
                <Form.Item {...{ wrapperCol: { span: 14, offset: 4 } }}>
                    <div>
                        <Button
                            type="submit"
                            raised
                            kStyle="primary"
                            style={{ marginRight: 5 }}
                        >
                            提交
                        </Button>
                        <Button raised onClick={this.handleAdd}>
                            新增
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        );
    }
}

export default createForm(DynamicFields);
