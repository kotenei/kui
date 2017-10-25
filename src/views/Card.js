import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';

class CardView extends Component {
    render() {
        return (
            <div>
                <h1>Card 卡片</h1>
                <h3>默认</h3>
                <div className="k-example">
                    <Card title="卡片标题" extra={<a href="javascript:void(0);">更多</a>}>
                        <p>列表内容1</p>
                        <p>列表内容2</p>
                        <p>列表内容3</p>
                        <p style={{'marginBottom':0}}>列表内容4</p>
                    </Card>
                </div>
                <h3>无边框</h3>
                <div  className="k-example" style={{background:'#ececec'}}>
                    <Card title="卡片标题" bordered={false}>
                        <p>列表内容1</p>
                        <p>列表内容2</p>
                        <p>列表内容3</p>
                        <p style={{'marginBottom':0}}>列表内容4</p>
                    </Card>
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
                            <td>title</td>
                            <td>卡片标题</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>extra</td>
                            <td>卡片右上角操作区</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>bodyStyle</td>
                            <td>内容区域自定义样式</td>
                            <td>object</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>bordered</td>
                            <td>是否显示边框</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>width</td>
                            <td>卡片宽度</td>
                            <td>string|number</td>
                            <td>300</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CardView;