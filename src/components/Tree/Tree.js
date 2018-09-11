import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import omit from "object.omit";
import pick from "object.pick";
import { guid } from "../../utils";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const prefixCls = "k-tree";

@DragDropContext(HTML5Backend)
class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedIds: props.checkedIds || props.defaultCheckedIds,
            expandedIds: props.expandedIds || props.defaultExpandedIds,
            selectedIds: props.selectedIds || props.defaultSelectedIds,
            halfCheckedIds: [],
            dragOverInfo: null
        };
        this.nodes = [];
        this.dicNodes = {};
    }
    static propTypes = {
        checkable: PropTypes.bool,
        checkedIds: PropTypes.array,
        defaultCheckedIds: PropTypes.array,
        defaultExpandAll: PropTypes.bool,
        defaultExpandedIds: PropTypes.array,
        defaultSelectedIds: PropTypes.array,
        disabled: PropTypes.bool,
        dragable: PropTypes.bool,
        expandedIds: PropTypes.array,
        loadData: PropTypes.func,
        multiple: PropTypes.bool,
        selectable: PropTypes.bool,
        selectedIds: PropTypes.bool,
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
        defaultCheckedIds: [],
        defaultExpandAll: false,
        defaultExpandedIds: [],
        defaultSelectedIds: [],
        disabled: false,
        dragable: false,
        multiple: false,
        selectable: false,
        showIcon: false,
        showLine: false
    };
    handleExpand = id => {
        const { onExpand } = this.props;
        const { expandedIds } = this.state;
        let newExpandedIds = [...expandedIds],
            index = newExpandedIds.indexOf(id);
        if (index == -1) {
            newExpandedIds.push(id);
        } else {
            newExpandedIds.splice(index, 1);
        }
        if (onExpand) {
            onExpand(id, index != -1, newExpandedIds);
        }

        if (!("expandedIds" in this.props)) {
            this.setState({
                expandedIds: newExpandedIds
            });
        }
    };
    handleCheck = (id, isChecked) => {
        this.setChecked(id, isChecked);
    };
    handleSelect = id => {
        const { multiple, onSelect } = this.props;
        let newSelectedIds = [...this.state.selectedIds];
        if (multiple) {
            let index = newSelectedIds.indexOf(id);
            if (index == -1) {
                newSelectedIds.push(id);
            } else {
                newSelectedIds.splice(index, 1);
            }
        } else {
            newSelectedIds = [id];
        }
        if (onselect) {
            onselect(newSelectedIds);
        }
        if (!("selectedIds" in this.props)) {
            this.setState({
                selectedIds: newSelectedIds
            });
        }
    };
    handleDragStart = id => {};
    handleDragOver = overInfo => {
        const { dragOverInfo } = this.state;
        const { onDragOver } = this.props;
        if (
            dragOverInfo &&
            dragOverInfo.dropId == overInfo.dropId &&
            dragOverInfo.type == overInfo.type
        ) {
            return;
        }

        this.setState({
            dragOverInfo: overInfo
        });
        if (onDragOver) {
            onDragOver(overInfo);
        }
    };
    handleDragEnd = result => {
        const { onDragEnd } = this.props;
        const { dragOverInfo } = this.state;
        this.setState({
            dragOverInfo: null
        });
        if (onDragEnd) {
            onDragEnd(result && dragOverInfo ? dragOverInfo : null);
        }
    };
    /**
     *
     * @param {object} props 组件输入参数
     */
    init(props = this.props) {
        const { children, checkedIds, expandedIds, selectedIds } = props;
        let nodes = [],
            dicNodes = {},
            tmpCheckedIds = checkedIds || this.state.checkedIds,
            tmpExpandedIds = expandedIds || this.state.expandedIds,
            set = function(nodes, dicNodes, children, parentNode) {
                React.Children.map(children, child => {
                    const {
                        id,
                        children,
                        disabled,
                        disableCheckbox
                    } = child.props;
                    let path = parentNode
                            ? parentNode.path + id + "/"
                            : `/${id}/`,
                        parentIds = parentNode
                            ? parentNode.parentIds.length > 0
                                ? [...parentNode.parentIds, parentNode.id]
                                : [parentNode.id]
                            : [],
                        node = {
                            id,
                            parentId: parentNode ? parentNode.id : "",
                            parentIds,
                            path,
                            disabled: disabled || disableCheckbox,
                            level: parentNode ? parentNode.level + 1 : 1
                        };
                    nodes.push(node);
                    dicNodes[id] = node;
                    if (children) {
                        set(nodes, dicNodes, children, node);
                    }
                });
            };
        set(nodes, dicNodes, children, null);
        this.nodes = nodes;
        this.dicNodes = dicNodes;
        this.initChecked(tmpCheckedIds);
        if (!this.isInitExpanded && !expandedIds) {
            this.initExpanded(tmpExpandedIds);
            this.isInitExpanded = true;
        }
        if (selectedIds) {
            this.setState({
                selectedIds
            });
        }
    }
    /**
     * 初始化选中
     */
    initChecked(checkedIds) {
        let newCheckIds = [...checkedIds],
            halfCheckedIds = [];

        checkedIds.forEach(id => {
            if (!this.dicNodes[id]) return;
            let curNode = this.dicNodes[id],
                isDisabled = curNode.disabled,
                childNodes = isDisabled
                    ? []
                    : this.getNodes(
                          id,
                          "s",
                          node => newCheckIds.indexOf(node.id) == -1
                      ),
                disabled = childNodes.filter(node => node.disabled),
                parentNodes = isDisabled ? [] : this.getNodes(id, "p");

            disabled.forEach(node => {
                childNodes = childNodes.filter(child => {
                    return child.path.indexOf(node.path) == -1;
                });
            });

            if (childNodes.length > 0) {
                newCheckIds.push(...childNodes.map(child => child.id));
            }

            parentNodes.every(parent => {
                if (parent.disabled) return false;
                let tmpCount = 0;
                let childNodes = this.getNodes(parent.id);
                childNodes.forEach(child => {
                    if (newCheckIds.indexOf(child.id) != -1) {
                        tmpCount++;
                    }
                });

                if (
                    tmpCount == childNodes.length &&
                    newCheckIds.indexOf(parent.id) == -1
                ) {
                    newCheckIds.push(parent.id);
                } else if (
                    newCheckIds.indexOf(parent.id) == -1 &&
                    halfCheckedIds.indexOf(parent.id) == -1
                ) {
                    halfCheckedIds.push(parent.id);
                }
                return true;
            });
        });
        this.setState({
            checkedIds: newCheckIds,
            halfCheckedIds
        });
    }
    //初始化展开
    initExpanded(expandedIds) {
        let newExpandedIds = [...expandedIds];
        expandedIds.forEach(id => {
            let parentNodes = this.getNodes(
                id,
                "p",
                node => newExpandedIds.indexOf(node.id) == -1
            );
            if (parentNodes.length > 0) {
                newExpandedIds.push(...parentNodes.map(parent => parent.id));
            }
        });
        this.setState({
            expandedIds: newExpandedIds
        });
    }
    /**
     * 设置复选
     * @param {string} id
     * @param {bool} checked
     */
    setChecked(id, checked) {
        const { onCheck } = this.props;
        const { checkedIds, halfCheckedIds } = this.state;
        let newCheckIds = [...checkedIds],
            newHalfCheckedIds = [...halfCheckedIds],
            childNodes = this.getNodes(id),
            parentNodes = this.getNodes(id, "p"),
            index = -1,
            tmpCount = 0,
            disabledNodes;

        //如果当前节点有半选状态则取消
        index = newHalfCheckedIds.indexOf(id);
        if (index != -1) {
            newHalfCheckedIds.splice(index, 1);
        }

        index = newCheckIds.indexOf(id);
        if (checked) {
            //选中当前节点
            if (index == -1) {
                newCheckIds.push(id);
            }
            //过滤被禁用的子节点
            disabledNodes = childNodes.filter(node => node.disabled);
            disabledNodes.forEach(node => {
                childNodes = childNodes.filter(child => {
                    return child.path.indexOf(node.path) == -1;
                });
            });
            //选中当前节点所有子节点
            childNodes.forEach(child => {
                index = newCheckIds.indexOf(child.id);
                if (index == -1) {
                    newCheckIds.push(child.id);
                }
                index = newHalfCheckedIds.indexOf(child.id);
                if (index != -1) {
                    newHalfCheckedIds.splice(index, 1);
                }
            });
            //遍历父节点，
            parentNodes.every(parent => {
                if (parent.disabled) return false;
                tmpCount = 0;
                childNodes = this.getNodes(
                    parent.id,
                    "s",
                    node =>
                        node.level == parent.level + 1 &&
                        node.id != id &&
                        !node.disabled
                );
                childNodes.forEach(child => {
                    index = newCheckIds.indexOf(child.id);
                    if (index != -1) {
                        tmpCount++;
                    }
                });
                //如果父节点的所有子节点都选中,并且父节点没有全选，则全选其父节点
                if (
                    tmpCount == childNodes.length &&
                    newCheckIds.indexOf(parent.id) == -1
                ) {
                    newCheckIds.push(parent.id);
                } else if (newHalfCheckedIds.indexOf(parent.id) == -1) {
                    //如果父节点没有半选状态，则添加半选状态
                    newHalfCheckedIds.push(parent.id);
                }
                return true;
            });
        } else {
            //取消当前选中的节点
            if (index != -1) {
                newCheckIds.splice(index, 1);
            }
            //过滤被禁用的子节点
            disabledNodes = childNodes.filter(node => node.disabled);
            disabledNodes.forEach(node => {
                childNodes = childNodes.filter(child => {
                    return child.path.indexOf(node.path) == -1;
                });
            });
            //取消当前节点下所有选中的子节点
            childNodes.forEach(child => {
                index = newCheckIds.indexOf(child.id);
                if (index != -1) {
                    newCheckIds.splice(index, 1);
                }
                index = newHalfCheckedIds.indexOf(child.id);
                if (index != -1) {
                    newHalfCheckedIds.splice(index, 1);
                }
            });
            //遍历所有父节点
            parentNodes.every(parent => {
                if (parent.disabled) return false;
                //取消父节点的选中状态
                index = newCheckIds.indexOf(parent.id);
                if (index != -1) {
                    newCheckIds.splice(index, 1);
                }
                //获取父节点的一级子节点（非禁用且有全选或半选状态的子节点）
                childNodes = this.getNodes(
                    parent.id,
                    "s",
                    node =>
                        node.level == parent.level + 1 &&
                        node.id != id &&
                        !node.disabled &&
                        (newCheckIds.indexOf(node.id) != -1 ||
                            newHalfCheckedIds.indexOf(node.id) != -1)
                );
                //检查父节点的半选状态
                index = newHalfCheckedIds.indexOf(parent.id);
                //如果子节点数量大于0，并且没有半选状态则添加半选状态
                if (childNodes.length > 0 && index == -1) {
                    newHalfCheckedIds.push(parent.id);
                } else if (childNodes.length == 0 && index != -1) {
                    //如果子节点数量为0，并且有半选状态，则取消半选状态
                    newHalfCheckedIds.splice(index, 1);
                }
                return true;
            });
        }
        if (onCheck) {
            onCheck(id, checked, newCheckIds);
        }
        if (!("checkedIds" in this.props)) {
            this.setState({
                checkedIds: newCheckIds,
                halfCheckedIds: newHalfCheckedIds
            });
        }
    }
    /**
     * 取节点
     * @param {string} nodeId 节点编号
     * @param {string} type 类型，默认's'，  p：父  s：子  b：兄弟
     * @param {function} condition 条件函数function(node:object){}，返回true或者false
     */
    getNodes(nodeId, type = "s", condition) {
        let nodes = this.nodes,
            dicNodes = this.dicNodes,
            ret = [],
            curNode = dicNodes[nodeId];

        if (curNode) {
            switch (type) {
                case "p":
                    if (curNode.parentId) {
                        let parentIds = curNode.parentIds;
                        for (let i = parentIds.length - 1; i >= 0; i--) {
                            let node = this.dicNodes[parentIds[i]];
                            if (
                                !condition ||
                                (condition && condition(node) == true)
                            ) {
                                ret.push(node);
                            }
                        }
                    }
                    break;
                case "b":
                    ret = nodes.filter(node => {
                        let result =
                            node.parentId == curNode.parentId &&
                            node.id != curNode.id;
                        if (result && condition) {
                            result = condition(node);
                        }
                        return result == true;
                    });
                    break;
                default:
                    ret = nodes.filter(node => {
                        let result =
                            node.path.indexOf(curNode.path) != -1 &&
                            node.id != curNode.id;
                        if (result && condition) {
                            result = condition(node);
                        }
                        return result == true;
                    });
                    break;
            }
        }
        return ret;
    }
    componentWillMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }
    render() {
        const { children, showLine } = this.props;
        const {
            checkedIds,
            expandedIds,
            selectedIds,
            halfCheckedIds,
            dragOverInfo
        } = this.state;
        const otherProps = pick(this.props, [
            "checkable",
            "dragable",
            "selectable",
            "showIcon",
            "showLine",
            "loadData"
        ]);
        let classString = classnames({
            [prefixCls]: true,
            [`${prefixCls}-showLine`]: showLine
        });
        return (
            <div>
                <ul className={classString}>
                    {React.Children.map(children, (child, index) => {
                        if (
                            !child ||
                            (child.type &&
                                child.type.displayName &&
                                child.type.displayName != "TreeNode")
                        ) {
                            return null;
                        }
                        let id = child.props.id || guid();
                        return React.cloneElement(child, {
                            id,
                            rootId: id,
                            parentIds: [],
                            ...otherProps,
                            ...child.props,
                            prefixCls,
                            checkedIds,
                            expandedIds,
                            selectedIds,
                            halfCheckedIds,
                            dragOverInfo,
                            onExpand: this.handleExpand,
                            onCheck: this.handleCheck,
                            onSelect: this.handleSelect,
                            onDragStart: this.handleDragStart,
                            onDragOver: this.handleDragOver,
                            onDragEnd: this.handleDragEnd
                        });
                    })}
                </ul>
            </div>
        );
    }
}

export default Tree;
