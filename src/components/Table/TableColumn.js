import React, { Component } from "react";
import PropTypes from "prop-types";
import { guid } from "../../utils";

class TableColumn extends Component {
    static displayName = "TableColumn";
    static propTypes = {
        align: PropTypes.oneOf(["left", "right", "center"]),
        dataIndex: PropTypes.string,
        disabledCheckbox: PropTypes.bool,
        filter: PropTypes.bool,
        fixed: PropTypes.oneOf(["left", "right", true]),
        id: PropTypes.string,
        render: PropTypes.func,
        sorter: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        width: PropTypes.number,
        onSort: PropTypes.func
    };
    static defaultProps = {
        align: "left",
        disabledCheckbox: false,
        filter: false,
        id: guid()
    };
    render() {
        return null;
    }
}

export default TableColumn;
