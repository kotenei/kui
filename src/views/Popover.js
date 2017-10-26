import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from '../components/Popover';
import Button from '../components/Button';
import {NavLink } from 'react-router-dom'

class PopoverView extends Component {
    render() {
        return (
            <div>
                <h1>Popover 弹出框</h1>
                <h3>基本使用</h3>
                <div className="k-example">
                    <Popover title="弹出框" content="这里是内容" >
                        <Button raised>Hover</Button>
                    </Popover>&nbsp;&nbsp;
                    <Popover title="弹出框" content="这里是内容" placement='right' trigger='click'>
                        <Button kStyle="primary" raised >Click</Button>
                    </Popover>
                </div>
                <h3>12个方向</h3>
                <div className="k-example">
                    <div className="tooltip-box">
                        <div style={{ marginLeft: 60 }}>
                            <Popover placement="topLeft" title="弹出框" content="这里是内容" trigger="click" ><a>上左</a></Popover>
                            <Popover placement="top" title="弹出框" content="这里是内容" trigger="click"><a>上边</a></Popover>
                            <Popover placement="topRight" title="弹出框" content="这里是内容" trigger="click"><a>上右</a></Popover>
                        </div>
                        <div style={{ width: 60, float: 'left' }}>
                            <Popover placement="leftTop" title="弹出框" content="这里是内容" trigger="click"><a>左上</a></Popover>
                            <Popover placement="left" title="弹出框" content="这里是内容" trigger="click"><a>左边</a></Popover>
                            <Popover placement="leftBottom" title="弹出框" content="这里是内容" trigger="click"><a>左下</a></Popover>
                        </div>
                        <div style={{ width: 60, marginLeft: 270 }}>
                            <Popover placement="rightTop" title="弹出框" content="这里是内容" trigger="click"><a>右上</a></Popover>
                            <Popover placement="right" title="弹出框" content="这里是内容" trigger="click"><a>右边</a></Popover>
                            <Popover placement="rightBottom" title="弹出框" content="这里是内容" trigger="click"><a>右下</a></Popover>
                        </div>
                        <div style={{ marginLeft: 60, clear: 'both' }}>
                            <Popover placement="bottomLeft" title="弹出框" content="这里是内容" trigger="click"><a>下左</a></Popover>
                            <Popover placement="bottom" title="弹出框" content="这里是内容" trigger="click"><a>下边</a></Popover>
                            <Popover placement="bottomRight" title="弹出框" content="这里是内容" trigger="click"><a>下右</a></Popover>
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
                            <td>标题</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>content</td>
                            <td>内容</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PopoverView;