import React from 'react';
import {Breadcrumb} from 'main';
import {NavLink} from 'react-router-dom';

class ButtonView extends React.Component {
    render() {
        return (
            <div>
                <h1>Breadcrumb 面包屑</h1>
                <div className="k-example">
                    <Breadcrumb kStyle="primary">
                        <Breadcrumb.Item to="/" icon="home">Home</Breadcrumb.Item>
                        <Breadcrumb.Item to="/Breadcrumb">Breadcrumb</Breadcrumb.Item>
                        <Breadcrumb.Item>Page</Breadcrumb.Item>
                    </Breadcrumb>
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
                            <td>to</td>
                            <td>链接，参考 react-router 配置</td>
                            <td>string|object</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>kStyle</td>
                            <td>风格，可选值  'primary' 'info' 'success' 'warning' 'danger'</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>icon</td>
                            <td>图标，<NavLink to="/Icon" activeClassName="selected">参考图标页</NavLink></td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>separator</td>
                            <td>分隔符自定义</td>
                            <td>string</td>
                            <td>'/'</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default ButtonView;