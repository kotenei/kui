import React, { Component } from "react";
import Basic from "./Basic";
import DocMark from "../DocMark";
import docs from "./docs";

class TagView extends Component {
    render() {
        return (
            <div>
                <h1>Tag 标签</h1>
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
                            <td>color</td>
                            <td>背景色</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>closable</td>
                            <td>是否可关闭标签</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>iconColor</td>
                            <td>关闭图标颜色</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>kStyle</td>
                            <td>
                                风格，可选值 'default' 'primary' 'info'
                                'success' 'warning' 'danger'
                            </td>
                            <td>string</td>
                            <td>default</td>
                        </tr>
                        <tr>
                            <td>onClose</td>
                            <td>关闭回调函数,返回true则关闭</td>
                            <td>Function</td>
                            <td>{"()=>{ return true; }"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TagView;
