export default `import React, { Component } from 'react';
import { Upload } from 'kui-react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-upload" action={action}>
        <Upload action={action} dragger>
          <AiOutlineCloudUpload style={{ fontSize: 40 }} />
          <div>将文件拖放到这里或点击上传</div>
        </Upload>
      </div>
    );
  }
}
`