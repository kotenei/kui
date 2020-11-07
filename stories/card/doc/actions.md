```jsx
import React, { Component } from 'react';
import { AiOutlineMore, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai';
import { Card } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-card">
        <Card
          title="Shrimp and Chorizo Paella"
          cover={<img src="https://material-ui.com/static/images/cards/paella.jpg" />}
          style={{ width: 300 }}
          bordered={false}
          actions={[
            <AiFillHeart key="icon_1" fontSize={24} style={{ marginRight: 8 }} />,
            <AiOutlineShareAlt key="icon_2" fontSize={24} />,
          ]}
          extra={<AiOutlineMore />}
        >
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Card>
      </div>
    );
  }
}

```
