import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../components/Carousel';

const style = {
    background: '#364D79',
    height: 160,
    color: 'white',
    textAlign: 'center',
    lineHeight: '160px',
    fontSize: 24
}

class CarouselView extends Component {
    render() {
        return (
            <div>
                <h1>Carousel 走马灯</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Carousel >
                        <div style={style}>1</div>
                        <div style={style}>2</div>
                        <div style={style}>3</div>
                    </Carousel>
                </div>
                <h3>垂直方向</h3>
                <div className="k-example">
                    <Carousel vertical>
                        <div style={style}>1</div>
                        <div style={style}>2</div>
                        <div style={style}>3</div>
                    </Carousel>
                </div>
                <h3>自动切换</h3>
                <div className="k-example">
                    <Carousel autoplay>
                        <div style={style}>1</div>
                        <div style={style}>2</div>
                        <div style={style}>3</div>
                    </Carousel>
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
                            <td>height</td>
                            <td>高度</td>
                            <td>number</td>
                            <td>160</td>
                        </tr>
                        <tr>
                            <td>delay</td>
                            <td>自动切换时间间隔(毫秒)</td>
                            <td>number</td>
                            <td>3000</td>
                        </tr>
                        <tr>
                            <td>autoplay</td>
                            <td>是否自动切换</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>vertical</td>
                            <td>是否垂直</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CarouselView;