import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import omit from "object.omit";
import pick from "object.pick";
import Dragger from "./Dragger";
import UploadList from "./UploadList";
import UploadListItem from "./UploadListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid } from "../../utils";
import upload from "./upload";

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
        limit: PropTypes.number,
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
        uploadingText: "上传中...",
        multiple: true
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
        this.uploadFiles(files);
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
    uploadFiles(files) {
        const { beforeUpload, listType } = this.props;
        const { fileList } = this.state;
        let postFiles = Array.prototype.slice.call(files).map(file => {
            return {
                id: guid(),
                name: file.name,
                lastModified: file.lastModified,
                originFileObj: file,
                size: file.size,
                type: file.type,
                percent: 0
            };
        });
        let newFileList = [...this.state.fileList];

        postFiles.forEach(file => {
            const before = beforeUpload ? beforeUpload(postFiles) : true;
            if (before) {
                file.status = "uploading";
                if (listType !== "text" && file.type.indexOf("image") != -1) {
                    try {
                        file.thumbUrl = URL.createObjectURL(file.originFileObj);
                    } catch (err) {
                        console.error(err);
                        return;
                    }
                }
                newFileList.push(file);
                this.onChange({ file, fileList: newFileList });
                this.post(file);
            }
        });
    }
    post(uploadFile) {
        const { headers, withCredentials, data, name, action } = this.props;
        const options = {
            headers,
            withCredentials,
            file: uploadFile.originFileObj,
            data,
            filename: name,
            action,
            onProgress: e => {
                this.onProgress(e, uploadFile);
            },
            onSuccess: res => {
                this.onSuccess(res, uploadFile);
            },
            onError: err => {
                this.onError(err, uploadFile);
            }
        };
        upload(options);
    }
    onChange(info) {
        if (!("fileList" in this.props)) {
            this.setState({
                fileList: info.fileList
            });
        }
    }
    onProgress(e, uploadFile) {
        const { fileList } = this.state;
        let targetFile = this.getFileItem(uploadFile, fileList);
        // targetFile.status = "done";
        targetFile.percent = e.percent;
        this.onChange({
            file: targetFile,
            fileList
        });
    }
    onSuccess(res, uploadFile) {
        const { fileList } = this.state;
        let targetFile = this.getFileItem(uploadFile, fileList);
        targetFile.status = "done";
        this.onChange({
            file: targetFile,
            fileList
        });
    }
    onError(err, uploadFile) {
        const { fileList } = this.state;
        let targetFile = this.getFileItem(uploadFile, fileList);
        targetFile.status = "error";
        targetFile.response =
            typeof err === "string" ? err : err.msg || "error";
        this.onChange({
            file: targetFile,
            fileList
        });
    }

    getFileItem(file, fileList) {
        return (
            fileList &&
            fileList.length > 0 &&
            fileList.find(item => item.id == file.id)
        );
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
        const {
            children,
            dragger,
            name,
            accept,
            listType,
            multiple,
            limit
        } = this.props;
        const { fileList } = this.state;
        const classString = classnames({
            [`${prefixCls}-select`]: true,
            [`${prefixCls}-select-${listType}`]: listType,
            [`${prefixCls}-select-dragger`]: dragger
        });

        let content = (
            <div className={classString} onClick={this.handleClick}>
                {dragger ? (
                    <Dragger prefixCls={prefixCls} >{children}</Dragger>
                ) : (
                    <span>{children}</span>
                )}
                <input
                    ref="file"
                    type="file"
                    className={`${prefixCls}__file`}
                    name={name}
                    accept={accept}
                    multiple={multiple}
                    onChange={this.handleChange}
                />
            </div>
        );

        if (
            typeof limit !== "undefined" &&
            fileList &&
            fileList.length >= limit
        ) {
            content = null;
        }

        return content;
    }
    render() {
        const { className, listType, dragger } = this.props;
        const classString = classnames(className, {
            [prefixCls]: true
        });
        return (
            <div className={classString}>
                {listType != "picture-card" || dragger
                    ? this.renderSelect()
                    : null}
                {this.renderFileList()}
                {listType == "picture-card" && !dragger
                    ? this.renderSelect()
                    : null}
            </div>
        );
    }
}

export default Upload;
