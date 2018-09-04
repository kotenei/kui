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
            halfCheckedIds: [],
            checkedIds: props.checkedIds || props.defaultCheckedIds,
            expandedIds: props.expandedIds || props.defaultExpandedIds,
            selectedIds: props.selectedIds || props.defaultSelectedIds,
            nodes: [],
            dicNodes: {}
        };
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
        const { expandedIds } = this.state;
        if (!("expandedIds" in this.props)) {
            let newExpandedIds = [...expandedIds],
                index = newExpandedIds.indexOf(id);
            if (index == -1) {
                newExpandedIds.push(id);
            } else {
                newExpandedIds.splice(index, 1);
            }
            this.setState({
                expandedIds: newExpandedIds
            });
        }
    };
    handleCheck = (isChecked, id) => {};
    init(callback) {
        const { children } = this.props;
        const { checkedIds, halfCheckedIds } = this.state;
        let nodes = [],
            dicNodes = {},
            newCheckIds = [...checkedIds],
            set = function(nodes, dicNodes, children, parentNode, checkedIds) {
                React.Children.map(children, child => {
                    const { id, children } = child.props;
                    let node = {
                        id,
                        parentId: parentNode ? parentNode.id : 0,
                        checked: checkedIds.indexOf(id) != -1
                    };

                    if (parentNode) {
                        if (
                            parentNode.checked ||
                            checkedIds.indexOf(id) != -1
                        ) {
                            node.checked = true;
                        }
                        if (
                            parentNode.checked &&
                            checkedIds.indexOf(id) == -1
                        ) {
                            checkedIds.push(id);
                        }
                    }
                    nodes.push(node);
                    dicNodes[id] = node;
                    if (children) {
                        set(nodes, dicNodes, children, node, checkedIds);
                    }
                });
            };
        set(nodes, dicNodes, children, null, newCheckIds);
        if (!("value" in this.props)) {
            this.setState({
                checkedIds: newCheckIds
            });
        }
        this.setState({
            nodes,
            dicNodes
        });
    }
    getNodes(nodeId, type = "s") {
        const { nodes, dicNodes } = this.state;
        let ret = [],
            curNode = dicNodes[nodeId],
            get = function(curNode, nodes, ret, type) {
                nodes.forEach((node, index) => {
                    if (type == "p") {
                        //取父节点
                        if (node.id == curNode.parentId) {
                            let tmpNodes = nodes.slice(0, index);
                            ret.push(node);
                            get(node, tmpNodes, ret, type);
                        }
                    } else if (type == "s") {
                        //取子节点
                        if (node.parentId == curNode.id) {
                            let tmpNodes = nodes.slice(index, nodes.length);
                            ret.push(node);
                            get(node, tmpNodes, ret, type);
                        }
                    } else if (type == "b") {
                        //兄弟节点
                        if (
                            node.parentId == curNode.parentId &&
                            node.id != curNode.id
                        ) {
                            ret.push(node);
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
    render() {
        const { children } = this.props;
        const { checkedIds, expandedIds, selectedIds } = this.state;
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
                        onExpand: this.handleExpand,
                        onCheck: this.handleCheck
                    });
                })}
            </ul>
        );
    }
}

export default Tree;
