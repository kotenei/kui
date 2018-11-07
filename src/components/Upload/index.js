import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import omit from "object.omit";
import pick from "object.pick";
import Dragger from "./Dragger";
import UploadList from "./UploadList";
import UploadListItem from "./UploadListItem";

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
        onChange: PropTypes.func,
        onPreview: PropTypes.func,
        onRemove: PropTypes.func
    };
    static defaultProps = {
        dragger: false,
        listType: "text",
        name: "file",
        showUploadList: true
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
    handleRemove = () => {};
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
        const listProps = pick(this.props, ["listType"]);
        if (!showUploadList || !fileList || fileList.length == 0) {
            return null;
        }
        let files = [];
        fileList.forEach((file, index) => {
            files.push(<UploadListItem key={index} {...file} />);
        });
        return (
            <UploadList prefixCls={prefixCls} {...listProps}>
                {files}
            </UploadList>
        );
    }
    render() {
        const {
            className,
            children,
            dragger,
            name,
            accept,
            showUploadList
        } = this.props;
        const classString = classnames(className, {
            [prefixCls]: true
        });
        return (
            <div className={classString}>
                <span
                    className={`${prefixCls}__container`}
                    onClick={this.handleClick}
                >
                    {dragger ? (
                        <Dragger prefixCls={prefixCls}>{children}</Dragger>
                    ) : (
                        children
                    )}
                    <input
                        ref="file"
                        type="file"
                        className={`${prefixCls}__file`}
                        name={name}
                        accept={accept}
                        onChange={this.handleChange}
                    />
                </span>
                {this.renderFileList()}
            </div>
        );
    }
}

export default Upload;
