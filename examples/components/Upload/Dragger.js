import React, { Component } from "react";
import { Upload, Button, Icon } from "kui-react";

const action = "https://jsonplaceholder.typicode.com/posts/";

export default class Example extends Component {
    render() {
        return (
            <Upload action={action} dragger>
                <Icon type="cloud-upload" style={{ fontSize: 40 }} />
                <div>将文件拖放到这里或点击上传</div>
            </Upload>
        );
    }
}
