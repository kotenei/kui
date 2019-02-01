import React, { Component } from "react";
import { Table, Icon, Input, Button } from "main";
import fetchData from "../fetch-data";
import { NavLink } from "react-router-dom";

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
    loadData(pageNumber = 1, filter, sorter) {
        const { pagination } = this.state;
        this.setState(
            {
                isLoading: true
            },
            () => {
                setTimeout(() => {
                    let offset = (pageNumber - 1) * pagination.pageSize;
                    let data = fetchData.slice(0);
                    let total;

                    if (sorter && sorter.order) {
                        data = data.sort((a, b) => {
                            let result =
                                a[sorter.field].length - b[sorter.field].length;
                            if (result != 0) {
                                return sorter.order === "desc"
                                    ? -result
                                    : result;
                            }
                            return 0;
                        });
                    }

                    if (filter) {
                        Object.keys(filter).forEach(key => {
                            let values = filter[key] || [];
                            if (values.length == 0) {
                                return;
                            }
                            data = data.filter(record => {
                                return values.some(
                                    value => record[key] == value
                                );
                            });
                        });
                    }

                    total = data.length;
                    data = data.slice(offset, offset + pagination.pageSize);

                    this.setState({
                        data,
                        isLoading: false,
                        pagination: {
                            ...pagination,
                            pageNumber,
                            total
                        }
                    });
                }, 250);
            }
        );
    }

    handleChange = (pagination, filter, sorter) => {
        this.loadData(pagination.pageNumber, filter, sorter);
    };

    componentDidMount() {
        this.loadData();
    }
    render() {
        const { isLoading, pagination } = this.state;

        const paginationProps = {
            ...pagination
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
                <h3>过滤</h3>
                <div className="k-example">
                    <Table
                        data={data}
                        onChange={(pagination, filter, sorter) => {
                            console.log(pagination, filter, sorter);
                        }}
                    >
                        <TableColumn title="Name">
                            <TableColumn
                                title="FirstName"
                                dataIndex="firstName"
                                filters={[
                                    { text: "Joe", value: "Joe" },
                                    { text: "Jim", value: "Jim" }
                                ]}
                                onFilter={(value, record) =>
                                    record.firstName.indexOf(value) > -1
                                }
                            />
                            <TableColumn
                                title="LastName"
                                dataIndex="lastName"
                                filters={[
                                    { text: "Brown", value: "Brown" },
                                    { text: "Sanders", value: "Sanders" }
                                ]}
                                onFilter={(value, record) =>
                                    record.lastName.indexOf(value) > -1
                                }
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
                                    return (
                                        a.firstName.length - b.firstName.length
                                    );
                                }}
                            />
                            <TableColumn
                                title="LastName"
                                dataIndex="lastName"
                            />
                        </TableColumn>
                        <TableColumn
                            title="Age"
                            dataIndex="age"
                            sorter={(a, b) => {
                                return a.age - b.age;
                            }}
                        />
                        <TableColumn
                            title="Address"
                            dataIndex="address"
                            sorter={(a, b) => {
                                return a.address.length - b.address.length;
                            }}
                        />
                        <TableColumn title="Status" dataIndex="status" />
                    </Table>
                </div>
                <br />
                <h3>分页</h3>
                <div className="k-example">
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
                </div>
                <br />
                <h3>远程加载数据</h3>
                <div className="k-example">
                    <Table
                        data={this.state.data}
                        loading={isLoading}
                        pagination={paginationProps}
                        onChange={this.handleChange}
                    >
                        <TableColumn
                            title="Name"
                            dataIndex="name"
                            render={value => {
                                return `${value.first} ${value.last}`;
                            }}
                        />
                        <TableColumn
                            title="Gender"
                            dataIndex="gender"
                            filters={[
                                { text: "male", value: "male" },
                                { text: "female", value: "female" }
                            ]}
                        />
                        <TableColumn title="Email" dataIndex="email" sorter />
                    </Table>
                </div>
                <h1>API</h1>
                <h3>Table</h3>
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
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>checkbox</td>
                            <td>是否显示复选框</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>checkedIds</td>
                            <td>已选中行，控制属性</td>
                            <td>string[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>data</td>
                            <td>数据源</td>
                            <td>object[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>defaultCheckedIds</td>
                            <td>初始化时默认选中行</td>
                            <td>string[]</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>defaultExpandedRowIds</td>
                            <td>初始化时默认展开行</td>
                            <td>string[]</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>disabledCheckIds</td>
                            <td>禁止选中行编号</td>
                            <td>string[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>expandedRowIds</td>
                            <td>展开的行，控制属性</td>
                            <td>string[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>expandedRowRender</td>
                            <td>额外的展开行</td>
                            <td>Function(record:object)</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>高度</td>
                            <td>number</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>loading</td>
                            <td>是否加载中</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>pagination</td>
                            <td>分页设置，具体参数查看 <a href="/#/Pagination">分页</a> 组件</td>
                            <td>object</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>rowClassName</td>
                            <td>表格行类名</td>
                            <td>Function(record, index):string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>stripe</td>
                            <td>是否为斑马纹 table</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onCheck</td>
                            <td>选中行触发</td>
                            <td>Function(ids:string[])</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>分页、过滤和排序时触发</td>
                            <td>
                                Function(pagination:object,filter:object,sorter:object)
                            </td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onExpand</td>
                            <td>点击展开图标时触发</td>
                            <td>Function(ids:string[])</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h3>Table.TableColumn</h3>
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
                            <td>align</td>
                            <td>对齐方式，可选 'left' 'center' 'right'</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>dataIndex</td>
                            <td>列数据在数据项中对应的key</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>filterIcon</td>
                            <td>筛选图标</td>
                            <td>Function(filtered:boolean):ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>filterMultiple</td>
                            <td>筛选是否多选</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>filters</td>
                            <td>筛选菜单项</td>
                            <td>object[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>fixed</td>
                            <td>
                                列是否固定，可选 true(等效于 left) 'left'
                                'right'
                            </td>
                            <td>boolean|string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>render</td>
                            <td>
                                生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据
                            </td>
                            <td>Function(value:any,record:object)</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>sorter</td>
                            <td>
                                排序函数，本地排序使用一个函数(参考{" "}
                                <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"
                                    target="_black;"
                                >
                                    Array.sort
                                </a>
                                的 compareFunction)，需要服务端排序可设为 true
                            </td>
                            <td>Function|boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>列头显示文字</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>width</td>
                            <td>列宽度</td>
                            <td>number</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onFilter</td>
                            <td>本地模式下，确定筛选的运行函数</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableView;
