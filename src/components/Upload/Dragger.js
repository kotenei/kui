import React, { Component } from "react";
import PropTypes from "prop-types";

class Dragger extends Component {
    static propTypes = {
        accept: PropTypes.string,
        disabled: PropTypes.bool
    };
    static defaultProps = {
        disabled: false,
        prefixCls: "k-upload"
    };
    constructor(props) {
        super(props);
        this.state = {
            dragOver: false
        };
    }
    handleDragover = e => {
        e.preventDefault();
        const { disabled } = this.props;
        const { dragOver } = this.state;
        if (dragOver || disabled) {
            return;
        }
        this.setState({
            dragOver: true
        });
    };
    handleDragend = e => {
        e.preventDefault();
        const { disabled } = this.props;
        const { dragOver } = this.state;
        if (dragOver || disabled) {
            return;
        }
        this.setState({
            dragOver: false
        });
    };
    handleDrop = e => {
        e.preventDefault();
        const { accept } = this.props;
        let files = e.dataTransfer.files;
        this.setState({
            dragOver: false
        });
    };
    render() {
        const { prefixCls, children } = this.props;
        return (
            <div
                className={`${prefixCls}__dragger`}
                onDragOver={this.handleDragover}
                onDragEnd={this.handleDragend}
                onDrop={this.handledrop}
            >
                {children}
            </div>
        );
    }
}

export default Dragger;
