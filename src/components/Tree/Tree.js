import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-tree";

class Tree extends Component {
    static propTypes = {
        defaultValue: PropTypes.array,
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,
        showIcon: PropTypes.bool,
        showLine: PropTypes.bool,
        value: PropTypes.array,
        onCheck: PropTypes.func,
        onExpand: PropTypes.func,
        onSelect: PropTypes.func,
        onLoad: PropTypes.func
    };
    static defaultProps = {
        disabled: false,
        multiple: false,
        showIcon: false,
        showLine: true
    };
    render() {
        return <div className={prefixCls} />;
    }
}

export default Tree;
