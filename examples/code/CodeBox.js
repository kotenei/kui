import React, { Component } from "react";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import { Icon } from "kui-react";

export default class CodeBox extends Component {
    state = {
        show: false
    };
    handleClick = () => {
        this.setState({
            show: !this.state.show
        });
    };
    render() {
        const { source } = this.props;
        const { show } = this.state;
        let bodyClass = classnames("k-codebox-body", {
            in: show
        });
        return (
            <div className="k-codebox">
                <div className="k-codebox-header">
                    <span onClick={this.handleClick}>
                        <span style={{ verticalAlign: "middle" }}>
                            {show ? "隐藏代码" : "显示代码"}
                        </span>
                        <Icon type={show ? "caretup" : "caretdown"} />
                    </span>
                </div>
                <div className={bodyClass}>
                    <ReactMarkdown
                        source={source}
                        renderers={{ code: CodeBlock }}
                    />
                </div>
            </div>
        );
    }
}
