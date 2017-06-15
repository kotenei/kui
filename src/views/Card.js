import React, { Component, PropTypes } from 'react';
import Card from '../components/Card';

class CardView extends Component {
    render() {
        return (
            <div>
                <h1>Card 卡片</h1>
                <div className="k-example">
                    <Card title="哈哈"/>
                </div>
            </div>
        )
    }
}

export default CardView;