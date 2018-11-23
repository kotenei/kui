import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import omit from "object.omit";
import pick from "object.pick";
import Dragger from "./Dragger";
import UploadList from "./UploadList";
import UploadListItem from "./UploadListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid, FirstChild } from "../../utils";

const prefixCls = "k-upload";

class Upload extends Component {
    static propTypes = {
        accept: PropTypes.string,
        action: PropTypes.string,
        beforeRemove: PropTypes.func,
        beforeUpload: PropTypes.func,
        data: PropTypes.object,
        defaultFileList: PropTypes.array,
        dragger: PropTypes.bool,
        disabled: PropTypes.bool,
        fileList: PropTypes.array,
        headers: PropTypes.object,
        listType: PropTypes.oneOf(["text", "picture", "picture-card"]),
        multiple: PropTypes.bool,
        name: PropTypes.string,
        showUploadList: PropTypes.bool,
        withCredentials: PropTypes.bool,
        uploadingText: PropTypes.string,
        onChange: PropTypes.func,
        onPreview: PropTypes.func,
        onRemove: PropTypes.func
    };
    static defaultProps = {
        dragger: false,
        listType: "text",
        name: "file",
        showUploadList: true,
        uploadingText: "上传中..."
    };
    state = {
        fileList: []
    };
    handleClick = () => {
        const { disabled } = this.props;
        if (disabled) {
            return;
        }
        this.refs.file.value = null;
        this.refs.file.click();
    };
    handleChange = e => {
        let files = e.target.files;
    };
    /**
     * 删除文件
     */
    handleRemove = index => {
        const { fileList } = this.state;
        let newFileList = [...fileList];
        newFileList.splice(index, 1);
        if (!("fileList" in this.props)) {
            this.setState({
                fileList: newFileList
            });
        }
    };
    /**
     * 上传文件
     * @param {array} files
     */
    upload(files) {
        const { beforeUpload } = this.props;
    }
    componentWillMount() {
        const { defaultFileList, fileList } = this.props;
        this.setState({
            fileList: fileList || defaultFileList
        });
    }
    componentWillReceiveProps(nextProps) {
        if ("fileList" in nextProps) {
            this.setState({
                fileList: nextProps.fileList
            });
        }
    }
    renderFileList() {
        const { showUploadList } = this.props;
        const { fileList } = this.state;
        const listProps = pick(this.props, ["listType", "uploadingText"]);
        let files = [];
        if (!showUploadList) {
            return null;
        }
        fileList.forEach((file, index) => {
            files.push(
                <CSSTransition key={index} timeout={300} classNames="fade">
                    <UploadListItem
                        key={index}
                        index={index}
                        {...file}
                        {...listProps}
                        onRemove={this.handleRemove}
                    />
                </CSSTransition>
            );
        });
        return (
            <UploadList prefixCls={prefixCls} {...listProps}>
                <TransitionGroup component={React.Fragment}>
                    {files}
                </TransitionGroup>
            </UploadList>
        );
    }
    renderSelect() {
        const { children, dragger, name, accept, listType } = this.props;
        const classString = classnames({
            [`${prefixCls}-select`]: true,
            [`${prefixCls}-select-${listType}`]: listType
        });
        return (
            <div className={classString} onClick={this.handleClick}>
                <span>
                    {dragger ? (
                        <Dragger prefixCls={prefixCls}>{children}</Dragger>
                    ) : (
                        children
                    )}
                </span>
                <input
                    ref="file"
                    type="file"
                    className={`${prefixCls}__file`}
                    name={name}
                    accept={accept}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
    render() {
        const { className, listType } = this.props;
        const classString = classnames(className, {
            [prefixCls]: true
        });
        return (
            <div className={classString}>
                {listType != "picture-card" ? this.renderSelect() : null}
                {this.renderFileList()}
                {listType == "picture-card" ? this.renderSelect() : null}
            </div>
        );
    }
}

export default Upload;
