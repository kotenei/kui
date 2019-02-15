import React, { Component } from "react";
import Basic from "./Basic";
import Placement from "./Placement";

import { NavLink } from "react-router-dom";

class PopoverView extends Component {
    render() {
        return (
            <div>
                <h1>Popover 弹出框</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                </div>
                <h3>12个方向</h3>
                <div className="k-example">
                    <Placement />
                </div>
                <h1>API</h1>
                <h3>
                    更多属性参考{" "}
                    <NavLink to="/Tooltip" activeClassName="selected">
                        Tooltip
                    </NavLink>
                </h3>
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
                            <td>title</td>
                            <td>标题</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>content</td>
                            <td>内容</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PopoverView;
