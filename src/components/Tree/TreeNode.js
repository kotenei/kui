import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";
import CheckBox from "../Checkbox";

class TreeNode extends Component {
    static displayName="TreeNode";
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
    renderNode() {
        const { prefixCls, disabled, children } = this.props;

        // React.Children.map(children, child => {
        //     if (!child || child.type.displayName != "TreeNode") {
        //         return;
        //     }
        //     if(child.children){

        //     }else{
                
        //     }
        // });

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
        const { prefixCls, title } = this.props;
        return (
            <span className={`${prefixCls}-treenode-content`}>
                <span className={`${prefixCls}-treenode-content-title`}>
                    {title}
                </span>
            </span>
        );
    }
    render() {
        return this.renderNode();
    }
}

export default TreeNode;
