import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Icon from '../components/Icon';

class InpurtView extends Component {
    render() {
        return (
            <div>
                <h1>Input 输入框</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <p><Input type="text" kSize="sm" placeholder="small size" /></p>
                    <p><Input type="text" placeholder="default size" /></p>
                    <p><Input type="text" kSize="lg" placeholder="large size" /></p>
                </div>
                <h3>前缀和后缀</h3>
                <div className="k-example">
                    <p><Input type="text" prefix={<Icon type="user" />} /></p>
                    <p><Input type="text" suffix={<Icon type="search" />} /></p>
                </div>
                <h3>前置和后置标签</h3>
                <div className="k-example">
                    <Input
                        type="text"
                        addonBefore={<Icon type="user" />}
                        addonAfter={<Icon type="search" />}
                         />
                </div>
                <h3>文本域</h3>
                <div className="k-example">
                    <Input.TextArea ></Input.TextArea>
                </div>
                <h1>API</h1>
                <h2>Input</h2>
                <table className="k-table k-table-hover k-table-striped">
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
                            <td>id</td>
                            <td>输入框id</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>输入框name</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>输入框type</td>
                            <td>string</td>
                            <td>text</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>输入框内容</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>输入框默认内容</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>kSize</td>
                            <td>尺寸，可选'sm' 'lg'</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>addonBefore</td>
                            <td>前置标签</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>addonAfter</td>
                            <td>后置标签</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>prefix</td>
                            <td>前缀图标</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>suffix</td>
                            <td>后缀图标</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onPressEnter</td>
                            <td>按下回车回调</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <h2>Input.TextArea</h2>
                <table className="k-table k-table-hover k-table-striped">
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
                            <td>value</td>
                            <td>输入框内容</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>输入框默认内容</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onPressEnter</td>
                            <td>按下回车回调</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default InpurtView;