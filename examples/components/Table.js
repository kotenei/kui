import React, { Component } from "react";
import { Table } from "main";

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

const remoteData = [];

for (let i = 0; i < 100; i++) {
    let num = i + 1;
    remoteData.push({
        id: `${i}`,
        name: `name ${num}`,
        age: `age ${num}`,
        address: `address ${num}`
    });
}

class TableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: { pageNumber: 1, pageSize: 5, total: 0 },
            data: [],
            isLoading: false
        };
    }
    loadData(pageNumber = 1) {
        const { pagination } = this.state;
        this.setState(
            {
                isLoading: true
            },
            () => {
                setTimeout(() => {
                    let offset = (pageNumber - 1) * pagination.pageSize;
                    let data = remoteData.slice(
                        offset,
                        offset + pagination.pageSize
                    );
                    this.setState({
                        data,
                        isLoading: false,
                        pagination: {
                            ...pagination,
                            pageNumber,
                            total: remoteData.length
                        }
                    });
                }, 250);
            }
        );
    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        const { isLoading, pagination } = this.state;

        const paginationProps = {
            ...pagination,
            onChange: pageNumber => {
                this.loadData(pageNumber);
            }
        };

        return (
            <div>
                <h1>Table 表格</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Table data={data}>
                        <TableColumn title="FirstName" dataIndex="firstName" />
                        <TableColumn title="LastName" dataIndex="lastName" />
                        <TableColumn title="Age" dataIndex="age" />
                        <TableColumn title="Address" dataIndex="address" />
                        <TableColumn title="Status" dataIndex="status" />
                    </Table>
                </div>
                <br />
                <h3>多级表头</h3>
                <div className="k-example">
                    <Table data={data}>
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
                        <TableColumn title="LastName" dataIndex="lastName" />
                        <TableColumn title="Age" dataIndex="age" />
                        <TableColumn title="Address" dataIndex="address" />
                        <TableColumn title="Status" dataIndex="status" />
                    </Table>
                </div>

                <br />
                <h3>带斑马纹表格</h3>
                <div className="k-example">
                    <Table data={data} stripe>
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
                <br />
                <h3>带边框线表格</h3>
                <div className="k-example">
                    <Table data={data} bordered>
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
                <br />
                <h3>固定表头</h3>
                <div className="k-example">
                    <Table data={data} height={200}>
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
                <br />
                <h3>固定列</h3>
                <div className="k-example">
                    <Table data={data}>
                        <TableColumn title="Name" fixed>
                            <TableColumn
                                title="FirstName"
                                dataIndex="firstName"
                                width={200}
                            />
                            <TableColumn
                                title="LastName"
                                dataIndex="lastName"
                                width={200}
                            />
                        </TableColumn>
                        <TableColumn title="Age" dataIndex="age" width={200} />
                        <TableColumn
                            title="Address"
                            dataIndex="address"
                            width={400}
                        />
                        <TableColumn
                            title="Status"
                            dataIndex="status"
                            fixed="right"
                            width={150}
                        />
                    </Table>
                </div>
                <br />
                <h3>固定表头和列</h3>
                <div className="k-example">
                    <Table data={data} height={250}>
                        <TableColumn title="Name" fixed>
                            <TableColumn
                                title="FirstName"
                                dataIndex="firstName"
                                width={200}
                            />
                            <TableColumn
                                title="LastName"
                                dataIndex="lastName"
                                width={200}
                            />
                        </TableColumn>
                        <TableColumn title="Age" dataIndex="age" width={200} />
                        <TableColumn
                            title="Address"
                            dataIndex="address"
                            width={400}
                        />
                        <TableColumn
                            title="Status"
                            dataIndex="status"
                            fixed="right"
                            width={150}
                        />
                    </Table>
                </div>
                <br />
                <h3>多选</h3>
                <div className="k-example">
                    <Table data={data} checkbox>
                        <TableColumn title="Name" fixed>
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
                        <TableColumn
                            title="Status"
                            dataIndex="status"
                            fixed="right"
                        />
                    </Table>
                </div>
                <br />
                <h3>展开行</h3>
                <div className="k-example">
                    <Table
                        data={data}
                        expandedRowRender={item => {
                            return <div>{item.description}</div>;
                        }}
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
                <br />
                <h3>排序</h3>
                <div className="k-example">
                    <Table data={data}>
                        <TableColumn title="Name">
                            <TableColumn
                                title="FirstName"
                                dataIndex="firstName"
                                sorter={(a, b) => {
                                    return a.firstName.length - b.firstName.length;
                                }}
                            />
                            <TableColumn
                                title="LastName"
                                dataIndex="lastName"
                                sorter
                            />
                        </TableColumn>
                        <TableColumn title="Age" dataIndex="age" />
                        <TableColumn title="Address" dataIndex="address" />
                        <TableColumn title="Status" dataIndex="status" />
                    </Table>
                </div>
                <br />
                <h3>过滤</h3>
                <div className="k-example">
                    <Table data={data}>
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
                <br />
                <h3>远程加载数据</h3>
                <div className="k-example">
                    <Table
                        data={this.state.data}
                        loading={isLoading}
                        pagination={paginationProps}
                    >
                        <TableColumn title="Name" dataIndex="name" sorter />
                        <TableColumn title="Age" dataIndex="age" sorter />
                        <TableColumn
                            title="Address"
                            dataIndex="address"
                            sorter
                        />
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

export default TableView;
