import React, { Component } from "react";
import { Upload, Button, Icon } from "main";

const fileList = [
    {
        id: 1,
        name: "aaaa.png",
        status: "done",
        response: "success",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        thumbUrl:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
        id: 2,
        name: "bbbb.png",
        status: "error",
        response: "error",
        url: "http://www.baidu.com"
    }
];

class CalendarView extends Component {
    render() {
        return (
            <div>
                <h1>Upload 上传</h1>
                <div className="k-example">
                    <Upload defaultFileList={fileList} listType='picture-card'>
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
