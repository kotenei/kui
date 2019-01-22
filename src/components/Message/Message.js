import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classnames from "classnames";
import Icon from "../Icon";

const iconType = {
    info: "info-circle",
    success: "check-circle",
    warning: "exclamation-circle",
    error: "close-circle",
    loading: "loading"
};

class Message extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        state: PropTypes.oneOf([
            "info",
            "success",
            "warning",
            "error",
            "loading"
        ]),
        content: PropTypes.node.isRequired,
        duration: PropTypes.number,
        closable: PropTypes.bool,
        onClose: PropTypes.func
    };
    static defaultProps = {
        state: "info",
        duration: 1500,
        onClose: () => {}
    };
    clearCloseTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };
    startCloseTimer = () => {
        if (this.props.duration) {
            this.timer = setTimeout(() => {
                this.close();
            }, this.props.duration);
        }
    };
    close = () => {
        this.clearCloseTimer();
        this.props.onClose();
    };
    componentDidMount() {
        this.startCloseTimer();
    }
    componentWillUnmount() {
        this.clearCloseTimer();
    }
    render() {
        const { state, content, duration } = this.props;
        const prefixCls = "k-message";
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${state}`]: true
        });
        return (
            <div
                ref="message"
                className={classString}
                onMouseEnter={this.clearCloseTimer}
                onMouseLeave={this.startCloseTimer}
            >
                <Icon
                    type={iconType[state]}
                    theme={iconType[state] == "loading" ? "outline" : "filled"}
                />
                <div className={`${prefixCls}-content`}>{content}</div>
            </div>
        );
    }
}

export default Message;
