import React, { Component } from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import { Card } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-card">
        <Card
          title="Lizard"
          cover={
            <img src="https://material-ui.com/static/images/cards/contemplative-reptile.jpg" />
          }
          bordered={false}
          extra={<AiOutlineMore />}
          style={{ width: 300 }}
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
        </Card>
      </div>
    );
  }
}
