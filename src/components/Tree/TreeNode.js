import React, { Component, PureComponent } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";
import CheckBox from "../Checkbox";
import pick from "object.pick";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid, FirstChild } from "../../utils";
import TreeNodeContent from "./TreeNodeContent";

class TreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loaded: false
        };
    }
    static displayName = "TreeNode";
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disableCheckbox: PropTypes.bool,
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
        disableCheckbox: false,
        disabled: false,
        isLeaf: false,
        prefixCls: "k-tree",
        selectable: false
    };
    handleExpand = () => {
        const {
            onExpand,
            id,
            parentId,
            rootId,
            loadData,
            children,
            isLeaf
        } = this.props;
        const { isLoading, loaded } = this.state;

        if (onExpand) {
            onExpand(id);
        }

        if (!children && loadData && !isLoading && !loaded && !isLeaf) {
            this.setState(
                {
                    isLoading: true
                },
                () => {
                    loadData(this).then(d => {
                        this.setState({
                            isLoading: false,
                            loaded: true
                        });
                    });
                }
            );
        }
    };
    handleCheck = e => {
        const { target } = e;
        const { onCheck, id, parentId, rootId } = this.props;
        if (onCheck) {
            onCheck(id,target.checked);
        }
    };
    handleSelect = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const { id, onSelect, disabled, selectable } = this.props;
        if (disabled || !selectable) return;
        if (onSelect) {
            onSelect(id);
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
        const {
            prefixCls,
            expandedIds,
            id,
            children,
            isLeaf,
            loadData,
            showLine,
            icon
        } = this.props;
        const { isLoading, loaded } = this.state;
        let iconType = this.isExpanded() ? "caretdown" : "caretright";
        if (showLine) {
            iconType = this.isExpanded() ? "minussquareo" : "plussquareo";
            if ((isLeaf && loadData) || (!children && !loadData)) {
                iconType = "file";
            }
        }
        return (
            <span className={`${prefixCls}-treenode-switcher`}>
                {isLoading ? (
                    <Icon type={"loading"} />
                ) : children ||
                (loadData && !isLeaf && !loaded) ||
                (!children && showLine) ? (
                    <Icon
                        type={iconType}
                        className="expand"
                        onClick={this.handleExpand}
                    />
                ) : null}
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
            disableCheckbox,
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
                disabled={disableCheckbox || disabled}
            />
        ) : null;
    }
    renderNode() {
        const {
            prefixCls,
            disabled,
            children,
            id,
            rootId,
            selectedIds
        } = this.props;
        const otherProps = pick(this.props, [
            "parentIds",
            "checkable",
            "dragable",
            "selectable",
            "showIcon",
            "showLine",
            "checkedIds",
            "expandedIds",
            "selectedIds",
            "halfCheckedIds",
            "dragOverInfo",
            "loadData",
            "onExpand",
            "onCheck",
            "onSelect",
            "onDragStart",
            "onDragOver",
            "onDragEnd"
        ]);
        return (
            <li
                className={classnames({
                    [`${prefixCls}-treenode`]: true,
                    [`${prefixCls}-treenode-disabled`]: disabled,
                    active: selectedIds.indexOf(id) != -1
                })}
            >
                {this.renderSwitcher()}
                {this.renderCheckBox()}
                <TreeNodeContent
                    {...this.props}
                    onClick={this.handleSelect}
                    refInstance={this}
                />
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
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    render() {
        return this.renderNode();
    }
}

export default TreeNode;
