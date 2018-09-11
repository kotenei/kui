import React, { Component, PureComponent } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { DragSource, DropTarget } from "react-dnd";
import domUtils from "../../utils/domUtils";

@DropTarget(
    "TreeNodeContent",
    {
        canDrop(props) {
            return !props.disabled && props.dragable;
        },
        hover(props, monitor, component) {
            if (!component) {
                return;
            }
            const { expandedIds } = props;
            const dragId = monitor.getItem().id;
            const dropId = props.id;
            // if (dragId == hoverId) {
            //     return;
            // }
            const elmTarget = ReactDOM.findDOMNode(component);
            const hoverBoundingRect = elmTarget.getBoundingClientRect();
            const offset = domUtils.offset(elmTarget);
            const hoverMiddleY = domUtils.outerHeight(elmTarget) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            let diff = 2,
                type = "middle";
            if (hoverClientY > hoverMiddleY + diff) {
                type = "bottom";
            } else if (hoverClientY < hoverMiddleY - diff) {
                type = "top";
            }

            if (expandedIds.indexOf(dropId) == -1) {
                props.refInstance.handleExpand();
            }

            if (props.onDragOver) {
                props.onDragOver({ dragId, dropId, type });
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
                onDragStart(id,props.refInstance);
            }
            return {
                id
            };
        },
        endDrag(props, monitor) {
            const { onDragEnd } = props;
            let result = monitor.getDropResult();
            if (onDragEnd) {
                onDragEnd(result);
            }
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
            isOver,
            dragOverInfo,
            icon
        } = this.props;
        let isCurrent = dragOverInfo && dragOverInfo.dropId == id && isOver;
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
                    {icon}
                    <span className={`${prefixCls}-treenode-content-title`}>
                        {title}
                    </span>
                </span>
            )
        );
    }
}

export default TreeNodeContent;
