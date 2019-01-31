import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

class TableSorter extends Component {
    static propTypes = {
        column: PropTypes.object,
        prefixCls: PropTypes.string,
        sorter: PropTypes.object,
        onSort: PropTypes.func
    };
    render() {
        const { prefixCls, column, sorter } = this.props;
        let upStyle, downStyle;
        if (!column.sorter) {
            return null;
        }
        if (sorter && sorter.field && sorter.field === column.dataIndex) {
            if (sorter.order == "desc") {
                downStyle = "primary";
            } else {
                upStyle = "primary";
            }
        }
        return (
            <div className={`${prefixCls}-sorter`} onClick={this.handleSort}>
                <Icon type="caret-up" kStyle={upStyle} />
                <Icon type="caret-down" kStyle={downStyle} />
            </div>
        );
    }

    handleSort = () => {
        const { sorter, column, onSort } = this.props;
        let newSorter = { column, field: column.dataIndex, order: "up" };

        if (sorter && sorter.field == column.dataIndex) {
            switch (sorter.order) {
                case "up":
                    newSorter.order = "desc";
                    break;
                case "desc":
                    newSorter = {};
                    break;
                default:
                    newSorter.order = "asc";
                    break;
            }
        }

        if (onSort) {
            onSort(newSorter);
        }
    };
}

export default TableSorter;
