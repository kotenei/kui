import React, { Component } from "react";
import { Table } from "main";

const { TableColumn } = Table;

const data = [
    {
        dataIndex: "1",
        firstName: "John",
        lastName: "Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"]
    },
    {
        dataIndex: "2",
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"]
    },
    {
        dataIndex: "3",
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
    }
];

class CalendarView extends Component {
    render() {
        return (
            <div>
                <h1>Table 表格</h1>
                <div className="k-example">
                    <Table data={data}>
                        {/* <TableColumn title="name">
                            <TableColumn title="first name">
                                <TableColumn title="aname">
                                    <TableColumn title="bname" dataIndex="3" />
                                    <TableColumn title="cname" dataIndex="3" />
                                </TableColumn>
                            </TableColumn>
                            <TableColumn title="last name A" dataIndex="2" />
                            <TableColumn title="last name B" dataIndex="4" />
                        </TableColumn> */}
                        {/* <TableColumn title="age" dataIndex="3" />
                        <TableColumn title="address" dataIndex="4"/> */}

                        <TableColumn title="Test">
                            <TableColumn title="Test">
                                <TableColumn title="Age" dataIndex="age" key="age" />
                                <TableColumn
                                    title="Address"
                                    dataIndex="address"
                                    key="address"
                                />
                            </TableColumn>
                            <TableColumn title="Age" dataIndex="age" key="age" />
                        </TableColumn>
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
