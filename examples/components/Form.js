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

const { createForm } = Form;
const { Option } = Select;
const options = [
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

const action = "https://jsonplaceholder.typicode.com/posts/";

const formLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

class FormView extends Component {
    handleSubmit = e => {
        e.preventDefault();
        // this.props.validateFields(err => {
        //     console.log(err);
        // });
    };
    render() {
        return (
            <div>
                <h1>Form 表单</h1>
                <div className="k-example">
                    <Form style={{ width: 500 }} onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="用户名"
                            rules={[{ required: true }]}
                            fieldName="username"
                            {...formLayout}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            rules={[{ required: true }]}
                            fieldName="password"
                            {...formLayout}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 16,
                                offset: 8
                            }}
                        >
                            <Button type="submit" raised kStyle="primary">
                                登录
                            </Button>
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
