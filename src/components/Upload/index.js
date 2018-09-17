import React, { Component } from "react";
import PropTypes from "prop-types";
import Dragger from "./Dragger";

const prefixCls = "k-upload";

class Upload extends Component {
    static propTypes = {
        start: PropTypes.string,
        dragger: PropTypes.bool
    };
    static defaultProps = {};
    render() {
        return (
            <div className={prefixCls}>
                <Dragger prefixCls={prefixCls} />
            </div>
        );
    }
}

export default Upload;
