import React, { Component } from 'react';
import { Table, TableColumn } from 'kui-react';

const data = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 30,
    address: 'New York No. 1 Lake Park',
    status: 'Employed',
    description: 'My name is John Brown, I am 30 years old, living in New York No. 1 Lake Park.',
  },
  {
    id: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    status: 'Employed',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    id: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    status: 'Unemployed',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    id: '4',
    firstName: 'Steve',
    lastName: 'Brown',
    age: 28,
    address: 'Sidney No. 2 Lake Park',
    status: 'Unemployed',
    description: 'My name is Steve Brow, I am 28 years old, living in Sidney No. 2 Lake Park.',
  },
  {
    id: '5',
    firstName: 'Stephanie',
    lastName: 'Sanders',
    age: 50,
    address: 'London, Park Lane no. 3',
    status: 'Employed',
    description:
      'My name is Stephanie Sanders, I am 50 years old, living in London, Park Lane no. 3.',
  },
];

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-table">
        <Table dataSource={data} scrollHeight={200}>
          <TableColumn title="Name">
            <TableColumn title="FirstName" field="firstName" />
            <TableColumn title="LastName" field="lastName" />
          </TableColumn>
          <TableColumn title="Age" field="age" />
          <TableColumn title="Address" field="address" />
          <TableColumn title="Status" field="status" />
        </Table>
      </div>
    );
  }
}
