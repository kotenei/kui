import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

class Popover extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        title: PropTypes.node
    };
    static defaultProps = {};
    render() {
        const { prefixCls, title, children,onClose } = this.props;
        return (
            <div className={`${prefixCls}-popover`}>
                <div className={`${prefixCls}-popover-header`}>
                    {title}
                    <Icon type="close" onClick={onClose} />
                </div>
                <div className={`${prefixCls}-popover-body`}>{children}</div>
            </div>
        );
    }
}

export default Popover;
