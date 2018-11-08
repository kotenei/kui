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
        thumbUrl: PropTypes.string,
        url: PropTypes.string
    };
    static defaultProps = {
        listType: "text",
        prefixCls: "k-upload-list"
    };
    renderPicture() {
        const { listType, url, name, thumbUrl, prefixCls } = this.props;
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
                            <a href={url} target="_blank">
                                <Icon type="eve" />
                            </a>
                            <a href="">
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
        const { prefixCls, listType, status, url, name } = this.props;
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
                    <span className={`${prefixCls}__icon`}>
                        <Icon className={`${prefixCls}__close`} type="close" />
                    </span>
                ) : null}
            </div>
        );
    }
}

export default UploadListItem;
