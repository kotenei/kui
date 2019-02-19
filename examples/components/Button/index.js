import React from "react";
import FlatButton from "./Flat";
import RaisedButton from "./Raised";
import FabButton from "./Fab";
import SizeButton from "./Size";
import GroupButton from "./Group";
import { NavLink } from "react-router-dom";
import DocMark from "../DocMark";
import docs from "./docs";

class ButtonView extends React.Component {
    render() {
        return (
            <div>
                <h1>Button 按钮</h1>
                <h3>Flat Button</h3>
                <div className="k-example">
                    <FlatButton />
                    <DocMark source={docs.Flat} />
                </div>
                <h3>Raised Button</h3>
                <div className="k-example">
                    <RaisedButton />
                    <DocMark source={docs.Raised} />
                </div>
                <h3>Floating Action Button</h3>
                <div className="k-example">
                    <FabButton />
                    <DocMark source={docs.Fab} />
                </div>
                <h3>Size</h3>
                <div className="k-example">
                    <SizeButton />
                    <DocMark source={docs.Size} />
                </div>
                <h3>Button Group</h3>
                <div className="k-example">
                    <GroupButton />
                    <DocMark source={docs.Group} />
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
                            <td>type</td>
                            <td>按钮类型，可选值 'button' 'submit' 'reset'</td>
                            <td>string</td>
                            <td>'button'</td>
                        </tr>
                        <tr>
                            <td>kStyle</td>
                            <td>
                                风格，可选值 'default' 'primary' 'info'
                                'success' 'warning' 'danger'
                            </td>
                            <td>string</td>
                            <td>'default'</td>
                        </tr>
                        <tr>
                            <td>kSize</td>
                            <td>大小，可选值 'xs' 'sm' 'lg' </td>
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
                            <td>raised</td>
                            <td>是否raised按钮</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>fab</td>
                            <td>是否fab按钮</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ButtonView;
