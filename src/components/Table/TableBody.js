import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {
    static propTypes = {
        prefixCls:PropTypes.string
        fixed: PropTypes.bool,
        data:PropTypes.array
    };
    static defaultProps = {
        prefixCls:'k-table'
        fixed: false
    };
    render() {
        return null;
    }
}

export default TableHeader;
