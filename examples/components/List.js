import React, { Component } from "react";
import { List, Icon } from "main";

const data = ["List Item", "List Item", "List Item"];
const actions = [
    <Icon type="edit" theme="filled" />,
    <Icon type="delete" theme="filled" />
];

class ListView extends Component {
    render() {
        return (
            <div>
                <h1>List 列表</h1>
                <h3>简单列表</h3>
                <div className="k-example">
                    <h3>Default Size</h3>
                    <List
                        bordered
                        data={data}
                        header="Header"
                        footer="Footer"
                    />
                    <br />
                    <h3>Small Size</h3>
                    <List
                        bordered
                        data={data}
                        kSize="sm"
                        header="Header"
                        footer="Footer"
                    />
                    <br />
                    <h3>Large Size</h3>
                    <List
                        bordered
                        data={data}
                        kSize="lg"
                        header="Header"
                        footer="Footer"
                    />
                </div>
                <br />
                <h3>带操作列表</h3>
                <div className="k-example">
                    <List bordered>
                        <List.Item actions={actions}>List Item</List.Item>
                        <List.Item actions={actions}>List Item</List.Item>
                        <List.Item actions={actions}>List Item</List.Item>
                    </List>
                </div>
                <br />
                <h3>元素列表</h3>
                <div className="k-example">
                    <List bordered>
                        <List.Item actions={actions}>
                            <List.ItemMeta
                                avatar={<Icon type="user" />}
                                title="List Item"
                                description="Description"
                            />
                        </List.Item>
                    </List>
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
                            <td />
                            <td />
                            <td />
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListView;
