import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";

class UploadListItem extends Component {
    static displayName = "UploadListItem";
    static propTypes = {
        listType: PropTypes.oneOf(["text", "picture", "picture-card"]),
        name: PropTypes.string,
        prefixCls: PropTypes.string,
        response: PropTypes.string,
        status: PropTypes.oneOf(["done", "error"]),
        url: PropTypes.string
    };
    static defaultProps = {
        listType: "text",
        prefixCls: "k-upload-list"
    };
    render() {
        const { prefixCls, listType } = this.props;
        const itemPrefixCls = `${prefixCls}-${listType}`;
        return (
            <div className={`${itemPrefixCls}__item`}>
                <span className={`${itemPrefixCls}__info`}>
                    {listType == "text" ? <Icon type="file" /> : null}
                </span>
                <Icon className={`${itemPrefixCls}__close`} type="close" />
            </div>
        );
    }
}

export default UploadListItem;
