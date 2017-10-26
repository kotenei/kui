import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../components/Tooltip';

const style={
    display:'inline-block',
    lineHeight: '32px',
    height: '32px',
    width: '60px',
    fontSize: '14px',
    textAlign:'center',
    background: '#f5f5f5',
    marginRight: '1em',
    marginBottom: '1em',
    borderRadius: '6px'
}

class TooltipView extends Component {
    render() {
        return (
            <div>
                <h1>Tooltip 文字提示</h1>
                <h3>基本使用</h3>
                <div className="k-example">
                    <Tooltip title="tooltip text" ><a style={style}>default</a></Tooltip>
                    <Tooltip title="tooltip text" kStyle="primary"><a style={style}>primary</a></Tooltip>
                    <Tooltip title="tooltip text" kStyle="info"><a style={style}>info</a></Tooltip>
                    <Tooltip title="tooltip text" kStyle="success"><a style={style}>success</a></Tooltip>
                    <Tooltip title="tooltip text" kStyle="warning"><a style={style}>warning</a></Tooltip>
                    <Tooltip title="tooltip text" kStyle="danger"><a style={style}>danger</a></Tooltip> 
                    <Tooltip title="tooltip text" trigger="click"><a style={style}>click</a></Tooltip> 
                </div>
                <h3>12个方向</h3>
                <div className="k-example">
                    <div className="tooltip-box">
                        <div style={{ marginLeft: 60 }}>
                            <Tooltip placement="topLeft" title="tooltip text" ><a>上左</a></Tooltip>
                            <Tooltip placement="top" title="tooltip text"><a>上边</a></Tooltip>
                            <Tooltip placement="topRight" title="tooltip text"><a>上右</a></Tooltip>
                        </div>
                        <div style={{ width: 60, float: 'left' }}>
                            <Tooltip placement="leftTop" title="tooltip text"><a>左上</a></Tooltip>
                            <Tooltip placement="left" title="tooltip text"><a>左边</a></Tooltip>
                            <Tooltip placement="leftBottom" title="tooltip text"><a>左下</a></Tooltip>
                        </div>
                        <div style={{ width: 60, marginLeft: 270 }}>
                            <Tooltip placement="rightTop" title="tooltip text"><a>右上</a></Tooltip>
                            <Tooltip placement="right" title="tooltip text"><a>右边</a></Tooltip>
                            <Tooltip placement="rightBottom" title="tooltip text"><a>右下</a></Tooltip>
                        </div>
                        <div style={{ marginLeft: 60, clear: 'both' }}>
                            <Tooltip placement="bottomLeft" title="tooltip text"><a>下左</a></Tooltip>
                            <Tooltip placement="bottom" title="tooltip text"><a>下边</a></Tooltip>
                            <Tooltip placement="bottomRight" title="tooltip text"><a>下右</a></Tooltip>
                        </div>
                    </div>
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
                            <td>提示内容</td>
                            <td>ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>kStyle</td>
                            <td>风格，可选值 'primary' 'info' 'success' 'warning' 'danger'</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <h1>公共API</h1>
                <h3>以下API为Tooltip、Popover共享的API</h3>
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
                            <td>placement</td>
                            <td>显示位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom</td>
                            <td>string</td>
                            <td>'top'</td>
                        </tr>
                        <tr>
                            <td>trigger</td>
                            <td>触发tips显示和隐藏的事件,可选 hover click</td>
                            <td>string</td>
                            <td>hover</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TooltipView;