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
            selectedIds: props.selectedIds || props.defaultSelectedIds
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

    componentWillMount() {
        
    }
    componentDidMount() {}
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
