import React, { Component, PropTypes } from 'react';
import Pagination from '../components/Pagination';

class PaginationView extends Component {
    render() {
        return (
            <div>
                <h1>Pagination 分页</h1>
                <div className="k-example">
                    <Pagination total={150}  />
                </div>
                <h1>API</h1>
                <table className="k-table k-table-hover k-table-striped">
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
                            <td>total</td>
                            <td>总记录数</td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>pageSize</td>
                            <td>分页大小</td>
                            <td>number</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>defaultCurrent</td>
                            <td>当前页</td>
                            <td>number</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>改变页码时的回调函数</td>
                            <td>function</td>
                            <td>()=>{}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PaginationView;