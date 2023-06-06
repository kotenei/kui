export default `import React, { Component } from 'react';
import { Upload, Button } from 'kui-react';

export default class Demo extends Component {
  render() {
    const action = 'https://jsonplaceholder.typicode.com/posts/';
    const fileList = [
      {
        id: 1,
        name: 'pic1.png',
        status: 'done',
        response: 'success',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        thumbUrl:
          'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        id: 2,
        name: 'pic2.png',
        status: 'done',
        response: 'success',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        percent: 50,
      },
    ];
    return (
      <div className="story-demo-upload" action={action}>
        <Upload action={action} fileList={fileList}>
          <Button style={{ margin: 0 }}>上传</Button>
        </Upload>
      </div>
    );
  }
}
`