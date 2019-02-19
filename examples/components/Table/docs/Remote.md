```jsx
import React, { Component } from "react";
import { Table } from "kui-react";
import fetchData from "../../fetch-data";

const { TableColumn } = Table;

export default class Example extends Component {
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
        );
    }
}

```
