import React, { Component } from "react";
import { Upload, Button, Icon } from "main";

const action = "https://jsonplaceholder.typicode.com/posts/";

class CalendarView extends Component {
    state = {
        fileList: [
            {
                id: 1,
                name: "pic1.png",
                status: "done",
                response: "success",
                url:
                    "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
                thumbUrl:
                    "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
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
                <h3>基本用法</h3>
                <div className="k-example">
                    <Upload action={action}>
                        <Button raised>
                            <Icon type="upload" />
                            上传
                        </Button>
                    </Upload>
                </div>
                <h3>已上传列表</h3>
                <div className="k-example">
                    <Upload
                        action={action}
                        defaultFileList={this.state.fileList}
                    >
                        <Button raised>
                            <Icon type="upload" />
                            上传
                        </Button>
                    </Upload>
                </div>
                <h3>照片列表</h3>
                <div className="k-example">
                    <Upload
                        action={action}
                        defaultFileList={this.state.fileList}
                        listType="picture"
                    >
                        <Button raised>
                            <Icon type="upload" />
                            上传
                        </Button>
                    </Upload>
                </div>
                <h3>照片墙</h3>
                <div className="k-example">
                    <Upload
                        action={action}
                        defaultFileList={this.state.fileList}
                        listType="picture-card"
                    >
                        <Icon
                            type="plus"
                            style={{ fontSize: 34 }}
                            color="8C939D"
                        />
                    </Upload>
                </div>
                <h3>拖拽上传</h3>
                <div className="k-example">
                    <Upload action={action} dragger>
                        <Icon type="cloud-upload" style={{ fontSize: 40 }} />
                        <div>将文件拖放到这里或点击上传</div>
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
                            <td>accept</td>
                            <td>
                                接受上传的
                                <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept"
                                    target="_blank"
                                >
                                    文件类型
                                </a>
                            </td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>action</td>
                            <td>必选参数，上传的地址</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>action</td>
                            <td>必选参数，上传的地址</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>beforeUpload</td>
                            <td>
                                上传文件之前的钩子，参数为上传的文件，若返回
                                false 则停止上传。
                            </td>
                            <td>Function(file)=>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>data</td>
                            <td>上传时附带的额外参数</td>
                            <td>object</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>defaultFileList</td>
                            <td>默认已经上传的文件列表</td>
                            <td>object[]</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>dragger</td>
                            <td>是否启用拖拽上传</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>fileList</td>
                            <td>已经上传的文件列表（受控）</td>
                            <td>object[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>headers</td>
                            <td>设置上传的请求头部</td>
                            <td>object</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>listType</td>
                            <td>
                                上传列表的内建样式，支持三种基本样式 text,
                                picture 和 picture-card
                            </td>
                            <td>string</td>
                            <td>'text'</td>
                        </tr>
                        <tr>
                            <td>multiple</td>
                            <td>是否允许多文件上传</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>发到后台的文件参数名</td>
                            <td>string</td>
                            <td>'file'</td>
                        </tr>
                        <tr>
                            <td>showUploadList</td>
                            <td>是否显示文件列表</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>withCredentials</td>
                            <td>上传请求时是否携带 cookie</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>uploadingText</td>
                            <td>
                                上传时显示的文件，只在 listType 为 picture-card
                                时显示
                            </td>
                            <td>string</td>
                            <td>'上传中...'</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>上传文件改变时的状态</td>
                            <td>{"Function({(file, fileList)})"}</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onRemove</td>
                            <td>删除文件的钩子</td>
                            <td>{"Function(file)"}</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CalendarView;
