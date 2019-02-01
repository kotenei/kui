import React, { Component } from "react";
import { Form } from "main";

class FormView extends Component {
    render() {
        return (
            <div>
                <h1>Form 表单</h1>
                <div className="k-example">
                    <Form>
                        <Form.Item label="哈哈" />
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

export default FormView;
