import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import omit from "object.omit";
import pick from "object.pick";
import { guid } from "../../utils";

const prefixCls = "k-tree";

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedIds: props.checkedIds || props.defaultCheckedIds,
            expandedIds: props.expandedIds || props.defaultExpandedIds,
            selectedIds: props.selectedIds || props.defaultSelectedIds,
            halfCheckedIds: []
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
        expandedIds: PropTypes.array,
        multiple: PropTypes.bool,
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
        multiple: false,
        showIcon: false,
        showLine: true
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
    handleCheck = (isChecked, id) => {
        this.setChecked(id, isChecked);
    };
    /**
     *
     * @param {object} props 组件输入参数
     */
    init(props = this.props) {
        const {
            children,
            checkedIds,
            defaultCheckedIds,
            defaultExpandedIds,
            expandedIds
        } = props;
        let nodes = [],
            dicNodes = {},
            tmpCheckedIds = checkedIds || defaultCheckedIds,
            tmpExpandedIds = expandedIds || defaultExpandedIds,
            set = function(nodes, dicNodes, children, parentNode) {
                React.Children.map(children, child => {
                    const {
                        id,
                        children,
                        disabled,
                        disabledCheckbox
                    } = child.props;
                    let path = parentNode
                        ? parentNode.path + id + "/"
                        : `/${id}/`;
                    let node = {
                        id,
                        parentId: parentNode ? parentNode.id : "",
                        path,
                        disabled,
                        disabledCheckbox
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
        this.initExpanded(tmpExpandedIds);
    }
    /**
     * 初始化选中
     */
    initChecked(checkedIds) {
        let newCheckIds = [...checkedIds],
            halfCheckedIds = [];

        checkedIds.forEach(id => {
            if (
                this.dicNodes[id].disabled ||
                this.dicNodes[id].disabledCheckbox
            ) {
                return;
            }

            let childNodes = this.getNodes(
                    id,
                    "s",
                    node => newCheckIds.indexOf(node.id) == -1
                ),
                parentNode = this.getNodes(id, "p");
            if (childNodes.length > 0) {
                newCheckIds.push(...childNodes.map(child => child.id));
            }
            parentNode.forEach(parent => {
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
                } else if (halfCheckedIds.indexOf(parent.id) == -1) {
                    halfCheckedIds.push(parent.id);
                }
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
            tmpCount;

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
            //如果当前节点有半选状态则取消
            index = newHalfCheckedIds.indexOf(id);
            if (index != -1) {
                newHalfCheckedIds.splice(index, 1);
            }

            //选中当前节点所有子节点
            childNodes.forEach(child => {
                index = newCheckIds.indexOf(child.id);
                if (index == -1) {
                    newCheckIds.push(child.id);
                }
            });
            //遍历父节点，
            parentNodes.forEach(parent => {
                tmpCount = 0;
                childNodes = this.getNodes(parent.id, "s");
                childNodes.forEach(child => {
                    index = newCheckIds.indexOf(child.id);
                    if (index != -1) {
                        tmpCount++;
                    }
                });
                //如果父节点的所有子节点都选中,并且父节点没有选中，则选中其父节点
                if (
                    tmpCount == childNodes.length &&
                    newCheckIds.indexOf(parent.id) == -1
                ) {
                    newCheckIds.push(parent.id);
                } else if (newHalfCheckedIds.indexOf(parent.id) == -1) {
                    //如果父节点没有半选状态，则添加半选状态
                    newHalfCheckedIds.push(parent.id);
                }
            });
        } else {
            //取消当前选中的节点
            if (index != -1) {
                newCheckIds.splice(index, 1);
            }
            //取消当前节点下所有选中的子节点
            childNodes.forEach(child => {
                index = newCheckIds.indexOf(child.id);
                if (index != -1) {
                    newCheckIds.splice(index, 1);
                }
            });
            //遍历所有父节点
            parentNodes.forEach(parent => {
                tmpCount = 0;
                childNodes = this.getNodes(parent.id, "s");
                childNodes.forEach(child => {
                    index = newCheckIds.indexOf(child.id);
                    if (index == -1) {
                        tmpCount++;
                    }
                });
                //取消父节点的选中状态
                index = newCheckIds.indexOf(parent.id);
                if (index != -1) {
                    newCheckIds.splice(index, 1);
                }

                index = newHalfCheckedIds.indexOf(parent.id);
                //如果未选中数量与所有子节点数量相同，并且父节点有半选状态则取消半选状态
                if (tmpCount == childNodes.length && index != -1) {
                    newHalfCheckedIds.splice(index, 1);
                } else if (childNodes.length > tmpCount && index == -1) {
                    //如果未选中数量少于所有子节点，并且父节点没有半选状态，则为父节点添加半选状态
                    newHalfCheckedIds.push(parent.id);
                }
            });
        }
        if (onCheck) {
            onCheck(id, isChecked, newCheckIds);
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
            curNode = dicNodes[nodeId],
            get = function(curNode, nodes, ret, type) {
                nodes.forEach((node, index) => {
                    if (type == "p") {
                        //取父节点
                        if (node.id == curNode.parentId) {
                            let tmpNodes = nodes.slice(0, index);
                            if (condition && condition(node) == true) {
                                ret.push(node);
                            } else if (!condition) {
                                ret.push(node);
                            }
                            get(node, tmpNodes, ret, type);
                        }
                    } else if (type == "s") {
                        //取子节点
                        if (node.parentId == curNode.id) {
                            let tmpNodes = nodes.slice(index, nodes.length);
                            if (condition && condition(node) == true) {
                                ret.push(node);
                            } else if (!condition) {
                                ret.push(node);
                            }
                            get(node, tmpNodes, ret, type);
                        }
                    } else if (type == "b") {
                        //兄弟节点
                        if (
                            node.parentId == curNode.parentId &&
                            node.id != curNode.id
                        ) {
                            if (condition && condition(node) == true) {
                                ret.push(node);
                            } else if (!condition) {
                                ret.push(node);
                            }
                        }
                    }
                });
            };
        if (curNode) {
            get(curNode, nodes, ret, type);
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
        const { children } = this.props;
        const {
            checkedIds,
            expandedIds,
            selectedIds,
            halfCheckedIds
        } = this.state;
        const otherProps = pick(this.props, [
            "checkable",
            "showIcon",
            "showLine"
        ]);
        return (
            <ul className={prefixCls}>
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
                        onExpand: this.handleExpand,
                        onCheck: this.handleCheck
                    });
                })}
            </ul>
        );
    }
}

export default Tree;
