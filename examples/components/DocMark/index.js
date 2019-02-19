import React, { Component } from "react";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import Code from "./Code";
import { Icon } from "kui-react";
import "./style.css";

export default class DocMark extends Component {
    state = {
        show: false
    };
    handleClick = () => {
        this.setState({
            show: !this.state.show
        });
    };
    render() {
        const { source, style } = this.props;
        const { show } = this.state;
        let bodyClass = classnames("k-codebox-body", {
            in: show
        });
        return (
            <div className="k-codebox" style={style}>
                <div className="k-codebox-header">
                    <span onClick={this.handleClick}>
                        <span style={{ verticalAlign: "middle" }}>
                            {show ? "隐藏代码" : "显示代码"}
                            <Icon type={show ? "caret-up" : "caret-down"} />
                        </span>
                    </span>
                </div>
                <div className={bodyClass}>
                    <ReactMarkdown source={source} renderers={{ code: Code }} />
                </div>
            </div>
        );
    }
}
