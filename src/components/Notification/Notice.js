import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";

const iconType = {
    info: "info-circle",
    success: "check-circle",
    warning: "exclamation-circle",
    danger: "close-circle",
    loading: "loading"
};

class Notice extends Component {
    static propTypes = {
        duration: PropTypes.number,
        state: PropTypes.oneOf([
            "info",
            "success",
            "warning",
            "danger",
            "loading"
        ]),
        title: PropTypes.node.isRequired,
        content: PropTypes.node.isRequired,
        onClose: PropTypes.func
    };
    static defaultProps = {
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
        const { state, content, duration, title } = this.props;
        const prefixCls = "k-notice";
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${state}`]: state ? true : false
        });
        let icon = state ? (
            <Icon
                type={iconType[state]}
                theme={iconType[state] == "loading" ? "outline" : "filled"}
            />
        ) : null;
        return (
            <div
                className={classString}
                onMouseEnter={this.clearCloseTimer}
                onMouseLeave={this.startCloseTimer}
            >
                {icon}
                <div className={`${prefixCls}-content`}>
                    <div className={`${prefixCls}-title`}>{title}</div>
                    <div className={`${prefixCls}-description`}>{content}</div>
                </div>
                <Icon type="close" className="icon-close" onClick={this.close} />
            </div>
        );
    }
}

export default Notice;
