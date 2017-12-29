import React, { Component } from 'react';
import Tag from '../components/Tag';

class TagView extends Component {
    render() {
        return (
            <div>
                <h1>Tag 标签</h1>
                <div className="k-example">
                    <Tag >default</Tag>
                    <Tag closable={true} >closable</Tag>
                    <Tag closable={true} kStyle="primary" >primary</Tag>
                    <Tag closable={true} kStyle="info" >info</Tag>
                    <Tag closable={true} kStyle="success" onClose={() => {
                        alert('ok');
                        return true;
                    }}>success</Tag>
                    <Tag closable={true} kStyle="warning" >warning</Tag>
                    <Tag closable={true} kStyle="danger" >danger</Tag>
                    <Tag closable={true} color='#87d068'>#87d068</Tag>
                    <Tag closable={true} color='green'>green</Tag>
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
                            <td>color</td>
                            <td>背景色</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>closable</td>
                            <td>是否可关闭标签</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>kStyle</td>
                            <td>风格，可选值 'default' 'primary' 'info' 'success' 'warning' 'danger'</td>
                            <td>string</td>
                            <td>default</td>
                        </tr>
                        <tr>
                            <td>onClose</td>
                            <td>关闭回调函数,返回true则关闭</td>
                            <td>Function</td>
                            <td>{'()=>{ return true; }'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TagView;