import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class TreeNode extends Component {
    static propTypes = {
        disabledCheckbox: PropTypes.bool,
        disabled: PropTypes.bool,
        icon: PropTypes.node,
        isLeaf: PropTypes.bool,
        prefixCls: PropTypes.string,
        selectable: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    };
    static defaultProps = {
        disabledCheckbox: false,
        disabled: false,
        isLeaf: false,
        prefixCls: "k-tree",
        selectable: true
    };
    render() {
        const { prefixCls, disabled } = this.props;
        return (
            <li
                className={classnames({
                    [`${prefixCls}-treenode`]: true,
                    [`${prefixCls}-treenode-disabled`]: disabled
                })}
            >
                <span>节点</span>
            </li>
        );
    }
}

export default TreeNode;
