import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";
import CheckBox from "../Checkbox";

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
    renderSwitcher() {
        const { prefixCls } = this.props;
        return (
            <Icon
                type="caretright"
                className={`${prefixCls}-treenode-switcher`}
            />
        );
    }
    renderCheckBox() {
        return <CheckBox inline />;
    }
    renderContent() {
        const { prefixCls } = this.props;
        return (
            <span className={`${prefixCls}-treenode-content`}>
                <span className={`${prefixCls}-treenode-content-title`}>
                    这里是节点
                </span>
            </span>
        );
    }
    render() {
        const { prefixCls, disabled } = this.props;
        return (
            <li
                className={classnames({
                    [`${prefixCls}-treenode`]: true,
                    [`${prefixCls}-treenode-disabled`]: disabled
                })}
            >
                {this.renderSwitcher()}
                {this.renderCheckBox()}
                {this.renderContent()}
            </li>
        );
    }
}

export default TreeNode;
