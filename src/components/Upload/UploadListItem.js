import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid } from "../../utils";
import Progress from "../Progress";

class UploadListItem extends Component {
    static displayName = "UploadListItem";
    static propTypes = {
        index: PropTypes.number,
        listType: PropTypes.oneOf(["text", "picture", "picture-card"]),
        name: PropTypes.string,
        percent: PropTypes.number,
        prefixCls: PropTypes.string,
        response: PropTypes.string,
        status: PropTypes.oneOf(["done", "error", "uploading"]),
        thumbUrl: PropTypes.string,
        url: PropTypes.string,
        previewTitle: PropTypes.string,
        removeTitle: PropTypes.string,
        onRemove: PropTypes.func
    };
    static defaultProps = {
        listType: "text",
        percent: 0,
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
            removeTitle,
            status
        } = this.props;
        switch (listType) {
            case "picture":
                return (
                    <React.Fragment>
                        <a
                            className={`${prefixCls}__thumb`}
                            href={url}
                            target="_blank"
                        >
                            <img src={thumbUrl} />
                        </a>
                    </React.Fragment>
                );
            case "picture-card":
                return (
                    status !== "uploading" && (
                        <React.Fragment>
                            <a
                                className={`${prefixCls}__thumb`}
                                href={url}
                                target="_blank"
                            >
                                <img src={thumbUrl} />
                            </a>
                            <span className={`${prefixCls}__action`}>
                                <a
                                    href={url}
                                    target="_blank"
                                    title={previewTitle}
                                >
                                    <Icon type="eyeo" />
                                </a>
                                <a
                                    title={removeTitle}
                                    onClick={this.handleRemove}
                                >
                                    <Icon type="delete" />
                                </a>
                            </span>
                        </React.Fragment>
                    )
                );
            default:
                return null;
        }
    }
    renderProgress() {
        const { prefixCls, status, percent, uploadingText } = this.props;
        return (
            status === "uploading" &&
            percent < 100 && (
                <div className={`${prefixCls}__progress`}>
                    <div className={`${prefixCls}__progressText`}>
                        {uploadingText}
                    </div>
                    <Progress
                        percent={percent}
                        showText={false}
                        strokeWidth={2}
                    />
                </div>
            )
        );
    }
    render() {
        const {
            prefixCls,
            listType,
            status,
            url,
            name,
            id,
            percent
        } = this.props;
        const classString = classnames({
            [`${prefixCls}__item`]: true,
            [`${prefixCls}__item--${status}`]: status
        });

        return (
            <div className={classString}>
                <span className={`${prefixCls}__info`}>
                    {listType == "text" ? (
                        <Icon
                            type={status === "uploading" ? "loading" : "file"}
                        />
                    ) : null}
                    {this.renderPicture()}
                    <a
                        className={`${prefixCls}__text`}
                        href={url}
                        target="_brank"
                    >
                        {name}
                    </a>
                </span>
                <span
                    className={`${prefixCls}__icon`}
                    onClick={this.handleRemove}
                >
                    <Icon className={`${prefixCls}__close`} type="close" />
                </span>
                {this.renderProgress()}
            </div>
        );
    }
}

export default UploadListItem;
