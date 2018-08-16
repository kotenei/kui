import React, { Component } from "react";
import PropTypes from "prop-types";

class YearView extends Component {
    static propsTypes = {
        prefixCls: PropTypes.string,
        date: PropTypes.object
    };
    static defaultProps = {
        prefixCls: "k-calendar",
        date: new Date()
    };
    render() {
        return <div />;
    }
}

export default YearView;
