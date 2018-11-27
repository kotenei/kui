import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class Dragger extends Component {
    static propTypes = {
        accept: PropTypes.string,
        disabled: PropTypes.bool,
        onDragOver: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDrop: PropTypes.func
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
    handleDragOver = e => {
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
    handleDragLeave = e => {
        e.preventDefault();
        const { disabled } = this.props;
        const { dragOver } = this.state;
        if (!dragOver || disabled) {
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
        const { dragOver } = this.state;
        return (
            <div
                className={classnames({
                    [`${prefixCls}__dragger`]: true,
                    [`${prefixCls}__dragger--dragover`]: dragOver
                })}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handledrop}
            >
                <span>{children}</span>
            </div>
        );
    }
}

export default Dragger;
