import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid, FirstChild } from "../../utils";

class UploadListItem extends Component {
    static displayName = "UploadListItem";
    static propTypes = {
        index: PropTypes.number,
        listType: PropTypes.oneOf(["text", "picture", "picture-card"]),
        name: PropTypes.string,
        prefixCls: PropTypes.string,
        response: PropTypes.string,
        status: PropTypes.oneOf(["done", "error"]),
        thumbUrl: PropTypes.string,
        url: PropTypes.string,
        previewTitle: PropTypes.string,
        removeTitle: PropTypes.string,
        onRemove: PropTypes.func
    };
    static defaultProps = {
        listType: "text",
        prefixCls: "k-upload-list",
        previewTitle: "预览文件",
        removeTitle: "删除文件"
    };
    handleRemove = () => {
        const { onRemove, index } = this.props;
        if (onRemove) {
            onRemove(index);
        }
    };
    renderPicture() {
        const {
            listType,
            url,
            name,
            thumbUrl,
            prefixCls,
            previewTitle,
            removeTitle
        } = this.props;
        switch (listType) {
            case "picture":
                return (
                    <React.Fragment>
                        <a className={`${prefixCls}__thumb`} href={url}>
                            <img src={thumbUrl} />
                        </a>
                    </React.Fragment>
                );
            case "picture-card":
                return (
                    <React.Fragment>
                        <a className={`${prefixCls}__thumb`} href={url}>
                            <img src={thumbUrl} />
                        </a>
                        <span className={`${prefixCls}__action`}>
                            <a href={url} target="_blank" title={previewTitle}>
                                <Icon type="eyeo" />
                            </a>
                            <a title={removeTitle} onClick={this.handleRemove}>
                                <Icon type="delete" />
                            </a>
                        </span>
                    </React.Fragment>
                );
            default:
                return null;
        }
    }
    render() {
        const { prefixCls, listType, status, url, name, id } = this.props;
        const classString = classnames({
            [`${prefixCls}__item`]: true,
            [`${prefixCls}__item--${status}`]: status
        });

        return (
            <div className={classString}>
                <span className={`${prefixCls}__info`}>
                    {listType == "text" ? <Icon type="file" /> : null}
                    {this.renderPicture()}
                    <a
                        className={`${prefixCls}__text`}
                        href={url}
                        target="_brank"
                    >
                        {name}
                    </a>
                </span>
                {listType != "picture-card" ? (
                    <span className={`${prefixCls}__icon`} onClick={this.handleRemove}>
                        <Icon className={`${prefixCls}__close`} type="close" />
                    </span>
                ) : null}
            </div>
        );
    }
}

export default UploadListItem;
