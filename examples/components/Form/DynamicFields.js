import React, { Component } from "react";
import { Button, Form, Input, Checkbox, Icon, Grid } from "kui-react";

const { createForm } = Form;

const defaultLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
};

let id = 1;

class Example extends Component {
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

    handleAdd = () => {
        this.setState({
            keys: [...this.state.keys, ++id]
        });
    };

    handleRemove = id => {
        const { keys } = this.state;
        let index = keys.findIndex(k => k === id);
        let newKeys = [...keys];
        if (index > -1) {
            newKeys.splice(index, 1);
        }
        this.setState({
            keys: newKeys
        });
    };

    render() {
        const { keys } = this.state;
        const formItems = keys.map(k => {
            return (
                <Form.Item
                    key={k}
                    label={`field ${k}`}
                    {...defaultLayout}
                    required
                >
                    <Grid.Row align="middle">
                        <Grid.Col span={23}>
                            <Form.Field
                                fieldName={`field${k}`}
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Field>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            {keys.length > 1 ? (
                                <Icon
                                    type="delete"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={this.handleRemove.bind(this, k)}
                                />
                            ) : null}
                        </Grid.Col>
                    </Grid.Row>
                </Form.Item>
            );
        });

        return (
            <Form style={{ width: 600 }} onSubmit={this.handleSubmit}>
                {formItems}
                <Form.Item {...{ wrapperCol: { span: 14, offset: 4 } }}>
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
                </Form.Item>
            </Form>
        );
    }
}

export default createForm(Example);
