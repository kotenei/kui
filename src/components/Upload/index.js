import React, { Component } from "react";
import PropTypes from "prop-types";
import Dragger from "./Dragger";

const prefixCls = "k-upload";

class Upload extends Component {
    static propTypes = {
        accept: PropTypes.string,
        action: PropTypes.string,
        beforeRemove: PropTypes.func,
        beforeUpload: PropTypes.func,
        data: PropTypes.object,
        defaultFileList: PropTypes.func,
        dragger: PropTypes.bool,
        disabled: PropTypes.bool,
        fileList: PropTypes.array,
        headers: PropTypes.object,
        multiple: PropTypes.bool,
        name: PropTypes.string,
        showUploadList: PropTypes.bool,
        withCredentials: PropTypes.bool,
        onChange: PropTypes.func,
        onPreview: PropTypes.func,
        onRemove: PropTypes.func
    };
    static defaultProps = {
        dragger: true
    };
    render() {
        const { dragger } = this.props;
        return (
            <div className={prefixCls}>
                {dragger ? <Dragger prefixCls={prefixCls} /> : null}
            </div>
        );
    }
}

export default Upload;
