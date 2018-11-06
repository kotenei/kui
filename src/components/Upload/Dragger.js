import React, { Component } from "react";
import PropTypes from "prop-types";

class Dragger extends Component {
    static propTypes = {};
    static defaultProps = {
        prefixCls: "k-upload"
    };
    handleDragover = e => {
        console.log("a");
    };
    handleDragend = e => {
        console, log("b");
    };
    handleDrop = e => {
        e.preventDefault();
        console.log("c");
    };
    render() {
        const { prefixCls } = this.props;
        return (
            <div
                className={`${prefixCls}__dragger`}
                onDragOver={this.handleDragover}
                onDragEnd={this.handleDragend}
                onDrop={this.handledrop}
            />
        );
    }
}

export default Dragger;
