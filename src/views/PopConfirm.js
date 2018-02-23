import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Popconfirm from '../components/Popconfirm';
import Message from '../components/Message';
import {NavLink } from 'react-router-dom';

class PopconfirmView extends Component {
    cacnel() {
        Message.error('点击了取消');
    }
    confirm() {
        Message.info('点击了确认');
    }

    render() {
        return (
            <div>
                <h1>Popconfirm 气泡确认框</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Popconfirm
                        title="您确认要删除吗?"
                        placement="right"
                        onCancel={this.cacnel}
                        onConfirm={this.confirm}>
                        <Button raised>Delete</Button>
                    </Popconfirm>
                </div>
                <h3>12个方向</h3>
                <div className="k-example">
                    <div className="tooltip-box">
                        <div style={{ marginLeft: 60 }}>
                            <Popconfirm placement="topLeft" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm} ><a>上左</a></Popconfirm>
                            <Popconfirm placement="top" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>上边</a></Popconfirm>
                            <Popconfirm placement="topRight" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>上右</a></Popconfirm>
                        </div>
                        <div style={{ width: 60, float: 'left' }}>
                            <Popconfirm placement="leftTop" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>左上</a></Popconfirm>
                            <Popconfirm placement="left" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>左边</a></Popconfirm>
                            <Popconfirm placement="leftBottom" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>左下</a></Popconfirm>
                        </div>
                        <div style={{ width: 60, marginLeft: 270 }}>
                            <Popconfirm placement="rightTop" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>右上</a></Popconfirm>
                            <Popconfirm placement="right" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>右边</a></Popconfirm>
                            <Popconfirm placement="rightBottom" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>右下</a></Popconfirm>
                        </div>
                        <div style={{ marginLeft: 60, clear: 'both' }}>
                            <Popconfirm placement="bottomLeft" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>下左</a></Popconfirm>
                            <Popconfirm placement="bottom" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>下边</a></Popconfirm>
                            <Popconfirm placement="bottomRight" title="您确认要删除吗？" onCancel={this.cacnel} onConfirm={this.confirm}><a>下右</a></Popconfirm>
                        </div>
                    </div>
                </div>
                <h1>API</h1>
                <h3>更多属性参考 <NavLink to="/Tooltip" activeClassName="selected">Tooltip</NavLink></h3>
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
                            <td>确认框的描述</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>confirmText</td>
                            <td>确认按钮文字</td>
                            <td>String</td>
                            <td>'确认'</td>
                        </tr>
                        <tr>
                            <td>cancelText</td>
                            <td>取消按钮文字</td>
                            <td>String</td>
                            <td>'取消'</td>
                        </tr>
                        <tr>
                            <td>onConfirm</td>
                            <td>点击确认回调</td>
                            <td>function(e)</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onCancel</td>
                            <td>点击取消回调</td>
                            <td>function(e)</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PopconfirmView;