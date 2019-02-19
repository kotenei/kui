```jsx
import React, { Component } from "react";
import { Icon, Button } from "kui-react";

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

export default class Example extends Component {
    state = {
        theme: "outline"
    };
    renderIcons() {
        const { theme } = this.state;
        let source = theme == "outline" ? outline : filled;
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
                            <Icon
                                type={key}
                                className="anticon"
                                theme={theme}
                            />
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
        const { theme } = this.state;
        return (
            <React.Fragment>
                <div style={{ marginBottom: 20 }}>
                    <Button
                        raised
                        active={theme === "outline"}
                        onClick={() => {
                            this.setState({ theme: "outline" });
                        }}
                    >
                        线框风格
                    </Button>{" "}
                    <Button
                        raised
                        active={theme == "filled"}
                        onClick={() => {
                            this.setState({ theme: "filled" });
                        }}
                    >
                        实底风格
                    </Button>
                </div>
                {this.renderIcons()}
            </React.Fragment>
        );
    }
}

```
