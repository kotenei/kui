import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {
    static propTypes = {
        rows: PropTypes.array,
        checkbox: PropTypes.bool,
        expandedRowRender: PropTypes.func,
        prefixCls: PropTypes.string
    };
    render() {
        return null;
    }
}

export default TableHeader;
