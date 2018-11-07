import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import UploadListItem from "./UploadListItem";

class UploadList extends Component {
    static propTypes = {
        listType: PropTypes.oneOf(["text", "picture", "picture-card"]),
        prefixCls: PropTypes.string,
        onRemove: PropTypes.func
    };
    static defaultProps = {
        listType: "text",
        prefixCls: "k-upload"
    };
    renderChildren() {
        const { children } = this.props;
        return React.Children.map(children, child => {
            if (
                child &&
                child.type &&
                child.type.displayName == "UploadListItem"
            ) {
                return child;
            }
        });
    }
    render() {
        const { listType, children } = this.props;
        const prefixCls = `${this.props.prefixCls}-list`;
        const classString = classnames({
            [prefixCls]: true,
            [`${prefixCls}-${listType}`]: listType != undefined
        });
        return <div className={classString}>{this.renderChildren()}</div>;
    }
}

export default UploadList;
