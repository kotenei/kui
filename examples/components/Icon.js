import React, { Component } from "react";
import { Icon, Button } from "main";

const ButtonGroup = Button.Group;
const outline = Icon.outline;
const filled = Icon.filled;
const icons = [
    { key: "direction", title: "方向性图标" },
    { key: "tips", title: "提示建议性图标" },
    { key: "edit", title: "编辑类图标" },
    { key: "data", title: "数据类图标" },
    { key: "common", title: "网站通用图标" },
    { key: "brand", title: "品牌和标识" }
];

class IconView extends Component {
    state = {
        type: "outline"
    };
    renderOutlineIcons() {
        let content = [];
        for (let i = 0; i < icons.length; i++) {
            const item = icons[i];
            let items = [];
            content.push(<h3 key={`title_${i}`}>{item.title}</h3>);
            for (const key in outline[item.key]) {
                if (outline[item.key].hasOwnProperty(key)) {
                    const element = outline[item.key][key];
                    items.push(
                        <li key={key}>
                            <Icon type={key} className="anticon" />
                            <span>{key}</span>
                        </li>
                    );
                }
            }
            content.push(
                <ul className="icon-list" key={`ul_${i}`}>
                    {items}
                </ul>
            );
        }
        return content;
    }

    renderFilledIcons() {}

    renderIcons() {
        const { type } = this.state;
        let source = type == "outline" ? outline : filled;
        let content = [];
        for (let i = 0; i < icons.length; i++) {
            const item = icons[i];
            let items = [];
            content.push(<h3 key={`title_${i}`}>{item.title}</h3>);
            for (const key in source[item.key]) {
                if (source[item.key].hasOwnProperty(key)) {
                    const element = source[item.key][key];
                    items.push(
                        <li key={key}>
                            <Icon type={key} className="anticon" />
                            <span>{key}</span>
                        </li>
                    );
                }
            }
            content.push(
                <ul className="icon-list" key={`ul_${i}`}>
                    {items}
                </ul>
            );
        }
        return content;
    }

    render() {
        const { type } = this.state;
        return (
            <div>
                <h1>Icon 图标</h1>
                <h3>选择图标主题风格</h3>
                <div style={{ marginBottom: 20 }}>
                    <Button
                        raised
                        active={type === "outline"}
                        onClick={() => {
                            this.setState({ type: "outline" });
                        }}
                    >
                        线框风格
                    </Button>{" "}
                    <Button
                        raised
                        active={type == "filled"}
                        onClick={() => {
                            this.setState({ type: "filled" });
                        }}
                    >
                        实底风格
                    </Button>
                </div>

                {this.renderIcons()}
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
                            <td>type</td>
                            <td>图标类型</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>spin</td>
                            <td>是否旋转</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default IconView;
