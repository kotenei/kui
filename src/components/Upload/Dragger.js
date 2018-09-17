import React, { Component } from "react";
import PropTypes from "prop-types";

class Dragger extends Component {
    static propTypes = {};
    static defaultProps = {
        prefixCls: "k-upload"
    };
    render() {
        const { prefixCls } = this.props;
        return <div className={`${prefixCls}-dragger`} />;
    }
}

export default Dragger;
