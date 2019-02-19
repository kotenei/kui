```jsx
import React, { Component } from "react";
import { Table } from "kui-react";

const { TableColumn } = Table;

const data = [
    {
        id: "1",
        firstName: "John",
        lastName: "Brown",
        age: 30,
        address: "New York No. 1 Lake Park",
        status: "Employed",
        description:
            "My name is John Brown, I am 30 years old, living in New York No. 1 Lake Park."
    },
    {
        id: "2",
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        status: "Employed",
        description:
            "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park."
    },
    {
        id: "3",
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        status: "Unemployed",
        description:
            "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park."
    },
    {
        id: "4",
        firstName: "Steve",
        lastName: "Brown",
        age: 28,
        address: "Sidney No. 2 Lake Park",
        status: "Unemployed",
        description:
            "My name is Steve Brow, I am 28 years old, living in Sidney No. 2 Lake Park."
    },
    {
        id: "5",
        firstName: "Stephanie",
        lastName: "Sanders",
        age: 50,
        address: "London, Park Lane no. 3",
        status: "Employed",
        description:
            "My name is Stephanie Sanders, I am 50 years old, living in London, Park Lane no. 3."
    }
];

export default class Example extends Component {
    render() {
        return (
            <Table data={data}>
                <TableColumn title="FirstName" dataIndex="firstName"  />
                <TableColumn title="LastName" dataIndex="lastName" />
                <TableColumn title="Age" dataIndex="age" />
                <TableColumn title="Address" dataIndex="address" />
                <TableColumn title="Status" dataIndex="status" />
            </Table>
        );
    }
}

```
