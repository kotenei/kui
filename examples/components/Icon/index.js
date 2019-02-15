import React, { Component } from "react";
import Basic from "./Basic";

class IconView extends Component {
    render() {
        return (
            <div>
                <h1>Icon 图标</h1>
                <h3>选择图标主题风格</h3>
                <Basic />
                <h1>API</h1>
                <h3>Icon</h3>
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
                            <td>填充的颜色</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>图标类型</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>theme</td>
                            <td>图标风格</td>
                            <td>string，可选 'outline' 和 'filled'</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>spin</td>
                            <td>是否旋转</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h3>Icon.SvgIcon</h3>
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
                            <td>SVG描述</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>color</td>
                            <td>填充的颜色</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>fontSize</td>
                            <td>字体大小</td>
                            <td>string|number</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>viewBox</td>
                            <td>图像容器</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default IconView;
