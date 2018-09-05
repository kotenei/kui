import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";
import CheckBox from "../Checkbox";
import pick from "object.pick";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid, FirstChild } from "../../utils";

class TreeNode extends Component {
    constructor(props) {
        super(props);
    }
    static displayName = "TreeNode";
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disabledCheckbox: PropTypes.bool,
        disabled: PropTypes.bool,
        icon: PropTypes.node,
        isLeaf: PropTypes.bool,
        prefixCls: PropTypes.string,
        selectable: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        onExpand: PropTypes.func,
        onCheck: PropTypes.func
    };
    static defaultProps = {
        id: guid(),
        disabledCheckbox: false,
        disabled: false,
        isLeaf: false,
        prefixCls: "k-tree",
        selectable: true
    };
    handleExpand = () => {
        const { onExpand, id, parentId, rootId } = this.props;
        if (onExpand) {
            onExpand(id);
        }
    };
    handleCheck = e => {
        const { target } = e;
        const { onCheck, id, parentId, rootId } = this.props;
        if (onCheck) {
            onCheck(target.checked, id);
        }
    };
    isExpanded() {
        const { expandedIds, id } = this.props;
        let expanded =
            expandedIds &&
            expandedIds.length > 0 &&
            expandedIds.indexOf(id) != -1;
        return expanded;
    }
    renderSwitcher() {
        const { prefixCls, expandedIds, id, children } = this.props;
        let iconType = this.isExpanded() ? "caretdown" : "caretright";
        return (
            <span
                className={`${prefixCls}-treenode-switcher`}
                style={{
                    cursor: children ? "pointer" : "default"
                }}
                onClick={children ? this.handleExpand : null}
            >
                {children ? <Icon type={iconType} /> : null}
            </span>
        );
    }
    renderCheckBox() {
        const {
            checkable,
            checkedIds,
            halfCheckedIds,
            id,
            children,
            disabledCheckbox,
            disabled
        } = this.props;

        let checked = false,
            indeterminate = false;

        if (checkedIds.indexOf(id) != -1) {
            checked = true;
        } else if (halfCheckedIds.indexOf(id) != -1) {
            indeterminate = true;
        }

        return checkable ? (
            <CheckBox
                inline
                onChange={this.handleCheck}
                checked={checked}
                indeterminate={indeterminate}
                disabled={disabledCheckbox || disabled}
            />
        ) : null;
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
    renderNode() {
        const { prefixCls, disabled, children, id, rootId } = this.props;
        const otherProps = pick(this.props, [
            "parentIds",
            "checkable",
            "showIcon",
            "showLine",
            "checkedIds",
            "expandedIds",
            "selectedIds",
            "halfCheckedIds",
            "onExpand",
            "onCheck"
        ]);
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
                <TransitionGroup component={FirstChild}>
                    {children && this.isExpanded() ? (
                        <CSSTransition timeout={300} classNames="slide">
                            <ul>
                                {React.Children.map(children, child => {
                                    return React.cloneElement(child, {
                                        parentId: id,
                                        rootId,
                                        ...child.props,
                                        ...otherProps
                                    });
                                })}
                            </ul>
                        </CSSTransition>
                    ) : null}
                </TransitionGroup>
            </li>
        );
    }
    render() {
        return this.renderNode();
    }
}

export default TreeNode;
