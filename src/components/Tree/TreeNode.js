import React, { Component, PureComponent } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";
import CheckBox from "../Checkbox";
import pick from "object.pick";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid, FirstChild } from "../../utils";
import { DragSource, DropTarget } from "react-dnd";
import domUtils from "../../utils/domUtils";

@DropTarget(
    "TreeNodeContent",
    {
        canDrop(props) {
            return !props.disabled && props.dragable;
        },
        drop(props, monitor, component) {
            const { onDragEnd } = props;
            if (onDragEnd) {
                onDragEnd();
            }
        },
        hover(props, monitor, component) {
            if (!component) {
                return;
            }
            const dragId = monitor.getItem().id;
            const hoverId = props.id;
            // if (dragId == hoverId) {
            //     return;
            // }
            const elmTarget = ReactDOM.findDOMNode(component);
            const offset = domUtils.offset(elmTarget);
            const hoverMiddleY = domUtils.outerHeight(elmTarget) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - offset.top;
            let diff = 2,
                type = "middle";
            if (hoverClientY > hoverMiddleY + diff) {
                type = "bottom";
            } else if (hoverClientY < hoverMiddleY - diff) {
                type = "top";
            }

            if (props.onDragOver) {
                props.onDragOver(dragId, hoverId, type);
            }
        }
    },
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    })
)
@DragSource(
    "TreeNodeContent",
    {
        canDrag(props) {
            return !props.disabled && props.dragable;
        },
        beginDrag(props, monitor, component) {
            const { onDragStart, id } = props;
            if (onDragStart) {
                onDragStart(id);
            }
            return {
                id
            };
        },
        endDrag(props,monitor){
            let result=monitor.getDropResult();
            console.log(result)
        }
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    })
)
class TreeNodeContent extends Component {
    render() {
        const {
            id,
            prefixCls,
            title,
            onClick,
            connectDragSource,
            connectDropTarget,
            isDragging,
            dragOverInfo
        } = this.props;
        let isCurrent = dragOverInfo && dragOverInfo.dropId == id;
        return connectDragSource(
            connectDropTarget(
                <span
                    className={classnames({
                        [`${prefixCls}-treenode-content`]: true,
                        "drag-over-gap-top":
                            isCurrent && dragOverInfo.type == "top",
                        "drag-over-gap-bottom":
                            isCurrent && dragOverInfo.type == "bottom",
                        "drag-over-gap-middle":
                            isCurrent && dragOverInfo.type == "middle"
                    })}
                    onClick={onClick}
                >
                    <span className={`${prefixCls}-treenode-content-title`}>
                        {title}
                    </span>
                </span>
            )
        );
    }
}

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
            children
        } = this.props;
        const { isLoading, loaded } = this.state;

        if (onExpand) {
            onExpand(id);
        }

        if (!children && loadData && !isLoading && !loaded) {
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
            onCheck(target.checked, id);
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
            loadData
        } = this.props;
        const { isLoading, loaded } = this.state;
        let iconType = this.isExpanded() ? "caretdown" : "caretright";
        return (
            <span className={`${prefixCls}-treenode-switcher`}>
                {isLoading ? (
                    <Icon type={"loading"} />
                ) : children || (loadData && !isLeaf && !loaded) ? (
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
    renderContent() {
        const { prefixCls, title, id } = this.props;
        return <TreeNodeContent {...this.props} onClick={this.handleSelect} />;
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
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    render() {
        return this.renderNode();
    }
}

export default TreeNode;
