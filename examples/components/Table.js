import React, { Component } from "react";
import { Table } from "main";

const { TableColumn } = Table;

const data = [
    {
        id: 1,
        firstName: "John",
        lastName: "Brown",
        age: 30,
        address: "New York No. 1 Lake Park",
        status: "Employed"
    },
    {
        id: 2,
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        status: "Employed"
    },
    {
        id: 3,
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        status: "Unemployed"
    },
    {
        id: 4,
        firstName: "Steve",
        lastName: "Brown",
        age: 28,
        address: "Sidney No. 2 Lake Park",
        status: "Unemployed"
    },
    {
        id: 5,
        firstName: "Stephanie",
        lastName: "Sanders",
        age: 50,
        address: "London, Park Lane no. 3",
        status: "Employed"
    }
];

class CalendarView extends Component {
    render() {
        return (
            <div>
                <h1>Table 表格</h1>
                <div className="k-example">
                    <Table
                        data={data}
                        checkbox
                        expandedRowRender={item => item.address}
                        stripe
                    >
                        <TableColumn title="Name">
                            <TableColumn
                                title="FirstName"
                                dataIndex="firstName"
                            />
                            <TableColumn
                                title="LastName"
                                dataIndex="lastName"
                            />
                        </TableColumn>
                        <TableColumn title="Age" dataIndex="age" />
                        <TableColumn title="Address" dataIndex="address" />
                        <TableColumn title="Status" dataIndex="status" />
                    </Table>
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

export default CalendarView;
