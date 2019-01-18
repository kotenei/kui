import React, { Component } from "react";
import PropTypes from "prop-types";
import { guid } from "../../utils";

class TableColumn extends Component {
    static displayName = "TableColumn";
    static propTypes = {
        align: PropTypes.oneOf(["left", "right", "center"]),
        dataIndex: PropTypes.string,
        defaultSortOrder: PropTypes.oneOf(["asc", "desc"]),
        filterMultiple: PropTypes.bool,
        filters: PropTypes.arrayOf(PropTypes.object),
        fixed: PropTypes.oneOf(["left", "right", true]),
        id: PropTypes.string,
        render: PropTypes.func,
        sorter: PropTypes.bool,
        sortOrder: PropTypes.oneOf(["asc", "desc", false]),
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        width: PropTypes.number,
        onFilter: PropTypes.func,
        onSort: PropTypes.func
    };
    static defaultProps = {
        filterMultiple: true,
        id: guid()
    };
    render() {
        return null;
    }
}

export default TableColumn;
