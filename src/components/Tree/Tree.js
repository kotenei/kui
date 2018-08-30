import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-tree";

class Tree extends Component {
    static propTypes = {
        checkable: PropTypes.bool,
        checkedKeys: PropTypes.array,
        defaultCheckedKeys: PropTypes.array,
        defaultExpandAll: PropTypes.bool,
        defaultExpandedKeys: PropTypes.array,
        defaultSelectedKeys: PropTypes.array,
        disabled: PropTypes.bool,
        expandedKeys: PropTypes.array,
        multiple: PropTypes.bool,
        selectedKeys: PropTypes.bool,
        showIcon: PropTypes.bool,
        showLine: PropTypes.bool,
        onCheck: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragOver: PropTypes.func,
        onDragEnd: PropTypes.func,
        onExpand: PropTypes.func,
        onSelect: PropTypes.func,
        onLoad: PropTypes.func
    };
    static defaultProps = {
        checkable: false,
        defaultCheckedKeys: [],
        defaultExpandAll: false,
        defaultExpandedKeys: [],
        defaultSelectedKeys: [],
        disabled: false,
        multiple: false,
        showIcon: false,
        showLine: true
    };
    render() {
        const { children } = this.props;
        return <ul className={prefixCls}>{children}</ul>;
    }
}

export default Tree;
