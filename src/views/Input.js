import React, { Component, PropTypes } from 'react';
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
                    <p><Input type="text" prefix={<Icon type="user"/>} /></p>
                    <p><Input type="text" suffix={<Icon type="search" />}/></p>
                </div>
                <h3>前置和后置标签</h3>
                <div className="k-example">
                    <p><Input type="text" addonBefore={<Icon type="user"/>} addonAfter={<Icon type="search" />} /></p>
                </div>
                <h1>API</h1>
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default InpurtView;