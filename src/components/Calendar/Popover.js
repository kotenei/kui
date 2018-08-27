import React, { Component } from "react";
import PropTypes from "prop-types";
import PopPanel from "../PopPanel";

class Popover extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        position: PropTypes.object,
        open: PropTypes.bool
    };
    static defaultProps = {
        prefixCls: "k-calendar",
        open: false
    };
    render() {
        const { prefixCls, open, position } = this.props;
        return (
            <PopPanel open={open}>
                <div className={`${prefixCls}-popover`} />
            </PopPanel>
        );
    }
}

export default Popover;
