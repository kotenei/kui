import React, { Component } from "react";
import { Upload, Button, Icon } from "main";

class CalendarView extends Component {
    state = {
        fileList: [
            {
                id: 1,
                name: "pic1.png",
                status: "done",
                response: "success",
                url:
                    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                thumbUrl:
                    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            },
            {
                id: 2,
                name: "pic2.png",
                status: "done",
                response: "success",
                url:
                    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                thumbUrl:
                    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                percent: 50
            }
        ]
    };
    componentDidMount() {}
    render() {
        return (
            <div>
                <h1>Upload 上传</h1>
                <div className="k-example">
                    <Upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        defaultFileList={this.state.fileList}
                        listType="picture-card"
                        limit={3}
                    >
                        <Button raised>
                            <Icon type="upload" />
                            上传
                        </Button>
                    </Upload>
                </div>
                <h1>API</h1>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
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
                            <td />
                            <td />
                            <td />
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CalendarView;
