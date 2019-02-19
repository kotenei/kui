import React from "react";
import { NavLink } from "react-router-dom";
import Basic from "./Basic";
import DocMark from "../DocMark";
import docs from "./docs";

class ButtonView extends React.Component {
    render() {
        return (
            <div>
                <h1>Breadcrumb 面包屑</h1>
                <div className="k-example">
                    <Basic />
                    <DocMark source={docs.Basic} />
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
                            <td>
                                风格，可选值 'primary' 'info' 'success'
                                'warning' 'danger'
                            </td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>icon</td>
                            <td>
                                图标，
                                <NavLink to="/Icon" activeClassName="selected">
                                    参考图标页
                                </NavLink>
                            </td>
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
        );
    }
}

export default ButtonView;
