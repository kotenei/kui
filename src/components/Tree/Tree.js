import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import omit from "object.omit";

const prefixCls = "k-tree";

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedKeys: [],
            expandedKeys: [],
            selectedKeys: []
        };
    }
    static propTypes = {
        checkable: PropTypes.bool,
        checkedKeys: PropTypes.array,
        defaultCheckedKeys: PropTypes.array,
        defaultExpandAll: PropTypes.bool,
        defaultExpandedKeys: PropTypes.array,
        defaultSelectedKeys: PropTypes.array,
        disabled: PropTypes.bool,
        expandedKeys: PropTypes.array,
        multiple: PropTypes.bool,
        selectedKeys: PropTypes.bool,
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
        defaultCheckedKeys: [],
        defaultExpandAll: false,
        defaultExpandedKeys: [],
        defaultSelectedKeys: [],
        disabled: false,
        multiple: false,
        showIcon: false,
        showLine: true
    };
    render() {
        const { children } = this.props;
        const { checkedKeys, expandedKeys, selectedKeys } = this.state;
        const props = omit(this.props, ["checkabled,showIcon,showLine"]);
        return (
            <ul className={prefixCls}>
                {React.Children.map(children, (child, index) => {
                    if (
                        !child ||
                        (child &&
                            child.type &&
                            child.type.displayName != "TreeNode")
                    ) {
                        return null;
                    }
                    return React.cloneElement(child, {
                        ...props,
                        ...child.props,
                        prefixCls,
                        checkedKeys,
                        expandedKeys,
                        selectedKeys
                    });
                })}
            </ul>
        );
    }
}

export default Tree;
