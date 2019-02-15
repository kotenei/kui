import React, { Component } from "react";
import Basic from "./Basic";
import Action from "./Action";
import Meta from "./Meta";

class ListView extends Component {
    render() {
        return (
            <div>
                <h1>List 列表</h1>
                <h3>简单列表</h3>
                <div className="k-example">
                    <Basic />
                </div>
                <br />
                <h3>带操作列表</h3>
                <div className="k-example">
                    <Action />
                </div>
                <br />
                <h3>元素信息列表</h3>
                <div className="k-example">
                    <Meta />
                </div>
                <h1>API</h1>
                <h3>List</h3>
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
                            <td>bordered</td>
                            <td>是否显示边框</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>data</td>
                            <td>数据源</td>
                            <td>array</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>footer</td>
                            <td>列表底部</td>
                            <td>ReactNode|string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>header</td>
                            <td>列表头部</td>
                            <td>ReactNode|string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>renderItem</td>
                            <td>自定义输出项</td>
                            <td>Function(item:object|string,index:number)</td>
                            <td>(item, index) => item</td>
                        </tr>
                        <tr>
                            <td>split</td>
                            <td>是否显示分隔线</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h3>List.Item</h3>
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
                            <td>actions</td>
                            <td>列表操作组</td>
                            <td>{"Array<ReactNode>"}</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h3>List.ItemMeta</h3>
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
                            <td>avatar</td>
                            <td>列表元素的图标</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>description</td>
                            <td>列表元素的描述内容</td>
                            <td>ReactNode|string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>列表元素的标题</td>
                            <td>ReactNode|string</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListView;
