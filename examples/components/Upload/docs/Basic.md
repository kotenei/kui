```jsx
import React, { Component } from "react";
import { Upload, Button, Icon } from "kui-react";

const action = "https://jsonplaceholder.typicode.com/posts/";

export default class Example extends Component {
    render() {
        return (
            <Upload action={action}>
                <Button raised>
                    <Icon type="upload" />
                    上传
                </Button>
            </Upload>
        );
    }
}

```
