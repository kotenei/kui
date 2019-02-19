```jsx
import React, { Component } from "react";
import { Table } from "kui-react";
import fetchData from "../../fetch-data";

const { TableColumn } = Table;

export default class Example extends Component {
    render() {
        return (
            <Table data={fetchData}>
                <TableColumn
                    title="Name"
                    dataIndex="name"
                    render={value => {
                        return `${value.first} ${value.last}`;
                    }}
                />
                <TableColumn title="Gender" dataIndex="gender" />
                <TableColumn title="Email" dataIndex="email" />
            </Table>
        );
    }
}

```
