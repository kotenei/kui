import React from "react";
import DocMark from "../DocMark";
import ReactMarkdown from "react-markdown";
import Code from "../DocMark/Code";
import install from "./install.md";
import example from "./example.md";
import style from "./style.md";

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>KUI of React</h1>
                <div>
                    基于React开发的前端组件库，旨在帮助开发者快速构建网站，后台系统等。
                </div>
                <br />
                <br />
                <h2>支持环境</h2>
                <div>现代浏览器（不建议使用IE）。</div>
                <br />
                <br />
                <h2>安装</h2>
                <ReactMarkdown source={install} renderers={{ code: Code }} />
                <br />
                <br />
                <h2>示例</h2>
                <ReactMarkdown source={example} renderers={{ code: Code }} />
                <br />
                引入样式
                <br />
                <ReactMarkdown source={style} renderers={{ code: Code }} />
                <br />
                <br />
                <h2>链接</h2>
                <ul>
                    <li><a href="https://github.com/kotenei/KUI" target="_blank;">GidHub</a></li>
                </ul>
            </div>
        );
    }
}

export default Home;
