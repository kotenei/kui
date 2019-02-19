import React, { Component } from "react";
import FormLayout from "./Layout";
import FormDynamicRules from "./DynamicRules";
import FormDynamicFields from "./DynamicFields";
import FormTooltip from "./Tooltip";
import DocMark from "../DocMark";
import docs from "./docs";

class Form extends Component {
    render() {
        return (
            <div>
                <h1>Form 表单</h1>
                <h3>布局</h3>
                <div className="k-example">
                    <FormLayout />
                    <DocMark source={docs.Layout} />
                </div>
                <br />
                <h3>动态校验</h3>
                <div className="k-example">
                    <FormDynamicRules />
                    <DocMark source={docs.DynamicRules} />
                </div>
                <br />
                <h3>动态增减表单项</h3>
                <div className="k-example">
                    <FormDynamicFields />
                    <DocMark source={docs.DynamicFields} />
                </div>
                <br />
                <h3>Tooltip验证提示</h3>
                <div className="k-example">
                    <FormTooltip />
                    <DocMark source={docs.Tooltip} />
                </div>
                <h1>API</h1>
                <h3>Form</h3>
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
                            <td>mode</td>
                            <td>
                                布局方式，可选 "horizontal", "vertical",
                                "inline"
                            </td>
                            <td>string</td>
                            <td>'horizontal'</td>
                        </tr>
                        <tr>
                            <td>onSubmit</td>
                            <td>表单提交回调</td>
                            <td>Function(e:event)</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>Form.createForm(Component)</h3>
                经过 Form.create 包装的组件将会自带 this.props.form
                属性，this.props.form 提供的 API 如下：
                <table className="k-example-table k-example-table-hover k-example-table-striped">
                    <thead>
                        <tr>
                            <th>方法</th>
                            <th>说明</th>
                            <th>类型</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>getFieldValue</td>
                            <td>获取输入控件的值</td>
                            <td>Function(fieldName:string)</td>
                        </tr>
                        <tr>
                            <td>setFieldValue</td>
                            <td>设置输入控件的值</td>
                            <td>Function(fieldName:string,value:any)</td>
                        </tr>
                        <tr>
                            <td>validateField</td>
                            <td>验证输入控件值</td>
                            <td>Function(fieldName:string)</td>
                        </tr>
                        <tr>
                            <td>validateFields</td>
                            <td>验证所有输入控件值</td>
                            <td>Function(callback(err,values))</td>
                        </tr>
                        <tr>
                            <td>resetFields</td>
                            <td>重置所有输入控件的值（为 initialValue）</td>
                            <td>Function()</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>Form.Item</h3>
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
                            <td>colon</td>
                            <td>是否显示 label 后面的冒号</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>label</td>
                            <td>label 标签的文本</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>labelCol</td>
                            <td>{`label 标签布局，同 <Grid.Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} `}</td>
                            <td>object</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>required</td>
                            <td>是否显示 label 前面 '*' </td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>wrapperCol</td>
                            <td>
                                需要为输入控件设置布局样式时，使用该属性，用法同
                                labelCol
                            </td>
                            <td>object</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>Form.Field</h3>
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
                            <td>fieldName</td>
                            <td>表单字段名</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>focusClear</td>
                            <td>文本框聚焦时是否隐藏显示错误提示</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>initialValue</td>
                            <td>字段初始值</td>
                            <td>any</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>required</td>
                            <td>是否显示 label 前面 '*' </td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>getValueFromEvent</td>
                            <td>
                                输入控件的值变更时触发的函数，函数必须返回值字段值（用于自定义设置表单字段值）
                            </td>
                            <td>Function(...args)=>any</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>rules</td>
                            <td>验证规则</td>
                            <td>object</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>validator</td>
                            <td>自定义验证</td>
                            <td>Function(value,callback(msg))</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>tooltip</td>
                            <td>是否使用tooltip显示错误信息</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>tooltipPlacement</td>
                            <td>tooltip显示的位置，参数tooltip组件设置</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>rules</h3>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>required</td>
                            <td>是否必填</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>验证类型，设置如下</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>message</td>
                            <td>验证失败显示信息</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>params</td>
                            <td>验证时附带参数</td>
                            <td>any</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>type 验证类型</h3>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>说明</th>
                            <th>参数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>email</td>
                            <td>电子邮件</td>
                            <td />
                        </tr>
                        <tr>
                            <td>url</td>
                            <td>url地址</td>
                            <td />
                        </tr>
                        <tr>
                            <td>date</td>
                            <td>日期</td>
                            <td />
                        </tr>
                        <tr>
                            <td>mobile</td>
                            <td>手机号码</td>
                            <td />
                        </tr>
                        <tr>
                            <td>phone</td>
                            <td>电话号码</td>
                            <td />
                        </tr>
                        <tr>
                            <td>number</td>
                            <td>数字</td>
                            <td />
                        </tr>
                        <tr>
                            <td>digits</td>
                            <td>正整数</td>
                            <td />
                        </tr>
                        <tr>
                            <td>minLength</td>
                            <td>最小长度</td>
                            <td>1~N</td>
                        </tr>
                        <tr>
                            <td>maxLength</td>
                            <td>最大长度</td>
                            <td>1~N</td>
                        </tr>
                        <tr>
                            <td>rangeLength</td>
                            <td>长度区间</td>
                            <td>[number1,number2]</td>
                        </tr>
                        <tr>
                            <td>min</td>
                            <td>最小值</td>
                            <td>1~N</td>
                        </tr>
                        <tr>
                            <td>max</td>
                            <td>最大值</td>
                            <td>1~N</td>
                        </tr>
                        <tr>
                            <td>range</td>
                            <td>数值区间</td>
                            <td>[number1,number2]</td>
                        </tr>
                        <tr>
                            <td>reg</td>
                            <td>正则验证</td>
                            <td>参数为正则表达式，如"^\\d+$"</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Form;
