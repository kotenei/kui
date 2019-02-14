import React, { Component } from "react";
import FormLayout from "./Layout";
import FormDynamicRules from "./DynamicRules";
import FormDynamicFields from "./DynamicFields";

class Form extends Component {
    render() {
        return (
            <div>
                <h1>Form 表单</h1>
                <h3>布局</h3>
                <div className="k-example">
                    <FormLayout />
                </div>
                <br />
                <h3>动态校验</h3>
                <div className="k-example">
                    <FormDynamicRules />
                </div>
                <br />
                <h3>动态增减表单项</h3>
                <div className="k-example">
                    <FormDynamicFields />
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

export default Form;
