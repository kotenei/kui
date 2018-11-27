import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import TableColumn from "./TableColumn";
import Loading from "../Loading";
import Pagination from "../Pagination";
import { deepClone, guid } from "../../utils";
import domUtils from "../../utils/domUtils";
import omit from "object.omit";
import Checkbox from "../Checkbox";
import Icon from "../Icon";

const prefixCls = "k-table";
const TABLE_STYLE = {
    header: 0,
    body: 1,
    all: 2
};
const FLEX_WIDTH = 50;

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
            expandedRowIds: props.expandedRowIds || props.defaultExpandedRowIds,
            width: "100%",
            columnsWidth: {}
        };
    }
    static propTypes = {
        bordered: PropTypes.bool,
        checkbox: PropTypes.bool,
        data: PropTypes.array,
        defaultExpandedRowIds: PropTypes.array,
        expandedRowIds: PropTypes.array,
        expandedRowRender: PropTypes.func,
        fixedHeader: PropTypes.bool,
        footer: PropTypes.object,
        indentSize: PropTypes.number,
        loading: PropTypes.bool,
        pagination: PropTypes.object,
        rowClassName: PropTypes.func,
        scroll: PropTypes.object,
        showHeader: PropTypes.bool,
        stripe: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        onChange: PropTypes.func,
        onExpand: PropTypes.func
    };
    static defaultProps = {
        bordered: false,
        checkbox: false,
        defaultExpandedRowIds: [],
        fixedHeader: false,
        showHeader: true,
        stripe: false
    };
    handleExpand = id => {};
    init(props = this.props) {
        const { children, loading, data, checkbox } = props;
        let maxLevel = 1,
            nodes = [],
            rows = [],
            columns = [],
            fixedLeft = [],
            fixedRight = [],
            tmpWidth = 0,
            initNode = function(node, parentNode) {
                node.id = node.id || guid();
                node.level = parentNode ? parentNode.level + 1 : 1;
                node.parentIds = parentNode
                    ? parentNode.parentIds.length > 0
                        ? [parentNode.id, ...parentNode.parentIds]
                        : [parentNode.id]
                    : [];
                node.path = parentNode
                    ? parentNode.path + node.id + "/"
                    : `/${node.id}/`;
                node.parentId = parentNode ? parentNode.id : "";
            },
            loop = function(child, curNode, parentNode) {
                if (maxLevel < curNode.level) {
                    maxLevel = curNode.level;
                }
                if (child.props.children) {
                    let colSpan = 0;
                    React.Children.map(child.props.children, subChild => {
                        let subNode = omit(subChild.props, ["children"]);
                        initNode(subNode, curNode);
                        nodes.push(subNode);
                        loop(subChild, subNode, curNode);
                        colSpan += subNode.colSpan;
                    });
                    curNode.hasChild = true;
                    curNode.colSpan = colSpan;
                } else {
                    const { width, style } = child.props;
                    curNode.hasChild = false;
                    curNode.colSpan = 1;
                    if (width != undefined) {
                        curNode.width = width;
                    }
                    if (style && typeof style.width == "number") {
                        curNode.width = style.width;
                    }
                    if (curNode.width) {
                        tmpWidth += curNode.width;
                    }
                    columns.push(curNode);
                }
            };

        React.Children.map(children, child => {
            let node = omit(child.props, ["children"]);
            initNode(node);
            nodes.push(node);
            loop(child, node);
        });

        for (let i = 0; i < maxLevel; i++) {
            rows.push([]);
            fixedLeft.push([]);
            fixedRight.push([]);
        }

        let fixed;
        nodes.forEach(node => {
            let rowIndex = node.level - 1;
            if (!node.hasChild) {
                node.rowSpan = maxLevel - node.level + 1;
            } else {
                node.rowSpan = 1;
            }
            rows[rowIndex].push(node);
            if (!node.fixed && !node.parentId) {
                fixed = "";
            }
            if ((node.fixed && !node.parentId) || fixed) {
                if (!fixed || !node.parentId) {
                    fixed = node.fixed;
                }
                if (fixed == "left") {
                    fixedLeft[rowIndex].push(node);
                } else {
                    fixedRight[rowIndex].push(node);
                }
            }
        });

        this.columns = columns;
        this.fixedLeft = fixedLeft;
        this.fixedRight = fixedRight;
        this.theadRows = rows;

        if ("loading" in this.props) {
            this.setState({
                loading
            });
        }
        if ("data" in this.props) {
            this.setState({
                data: deepClone(data)
            });
        }
    }
    setWidth() {
        const { checkbox, expandedRowRender } = this.props;
        let totalWidth = domUtils.width(this.refs.table);
        let tmpWidth = 0;
        let columnsWidth = {};
        let columns = this.columns.filter((item, index) => {
            if (item.width) {
                tmpWidth += item.width;
                columnsWidth[index] = item.width;
                return false;
            } else {
                columnsWidth[index] = 0;
                return true;
            }
        });
        if (checkbox) {
            tmpWidth += FLEX_WIDTH;
        }
        if (expandedRowRender) {
            tmpWidth += FLEX_WIDTH;
        }
        let diff = totalWidth - tmpWidth;
        let width = diff / columns.length;
        for (let key in columnsWidth) {
            if (columnsWidth[key] == 0) {
                columnsWidth[key] = width;
            }
        }
        this.setState({
            columnsWidth
        });
    }
    getColGroup(columns) {
        const { columnsWidth } = this.state;
        let colGroup = [];
        columns.forEach((column, index) => {
            let width = (columnsWidth && columnsWidth[index]) || column.width;
            let colStyle = { width };
            if (column.style) {
                colStyle = column.style;
            }
            colGroup.push(<col key={index} style={colStyle} />);
        });
        return colGroup;
    }
    getTheadRows(rows) {
        let theadRows = [];
        rows.forEach((row, rowIndex) => {
            let cells = [];
            row.forEach((cell, cellIndex) => {
                cells.push(
                    <th
                        key={`thCell-${cellIndex}`}
                        colSpan={cell.colSpan == 1 ? null : cell.colSpan}
                        rowSpan={cell.rowSpan == 1 ? null : cell.rowSpan}
                    >
                        {cell.title}
                    </th>
                );
            });
            theadRows.push(<tr key={`thRow-${rowIndex}`}>{cells}</tr>);
        });
        return theadRows;
    }

    getTbody() {}

    componentWillMount() {
        this.init();
    }

    componentDidMount() {
        this.setWidth();
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }

    renderHeader() {
        return (
            <div className={`${prefixCls}-header`}>
                {this.renderTable(TABLE_STYLE.header)}
            </div>
        );
    }

    renderBody() {
        return (
            <div className={`${prefixCls}-body`}>
                {this.renderTable(TABLE_STYLE.body)}
            </div>
        );
    }

    renderTable(type = TABLE_STYLE.all) {
        const {
            checkbox,
            expandedRowRender,
            stripe,
            rowClassName
        } = this.props;
        const { data, columnsWidth } = this.state;
        let colGroup = this.getColGroup(this.columns),
            theadRows = [],
            tbodyRows = [];

        // this.columns.forEach((column, index) => {
        //     let width = (columnsWidth && columnsWidth[index]) || column.width;
        //     let colStyle = { width };
        //     if (checkbox && index == 0) {
        //         colGroup.push(
        //             <col
        //                 key={`col_checkbox_${index}`}
        //                 style={{ width: FLEX_WIDTH }}
        //             />
        //         );
        //     }
        //     if (expandedRowRender && index == 0) {
        //         colGroup.push(
        //             <col
        //                 key={`col_expand_${index}`}
        //                 style={{ width: FLEX_WIDTH }}
        //             />
        //         );
        //     }
        //     if (column.style) {
        //         colStyle = column.style;
        //     }
        //     colGroup.push(<col key={index} style={colStyle} />);
        // });

        this.theadRows.forEach((row, rowIndex) => {
            let cells = [];
            row.forEach((cell, cellIndex) => {
                if (
                    (checkbox || expandedRowRender) &&
                    rowIndex == 0 &&
                    cellIndex == 0
                ) {
                    if (checkbox) {
                        cells.push(
                            <th
                                className="checkbox-cell"
                                key={`thCell-checkbox-${cellIndex}`}
                                rowSpan={this.theadRows.length}
                            >
                                <Checkbox />
                            </th>
                        );
                    }
                    if (expandedRowRender) {
                        cells.push(
                            <th
                                className="expand-cell"
                                key={`thCell-expand-${cellIndex}`}
                                rowSpan={this.theadRows.length}
                            />
                        );
                    }
                }
                cells.push(
                    <th
                        key={`thCell-${cellIndex}`}
                        colSpan={cell.colSpan == 1 ? null : cell.colSpan}
                        rowSpan={cell.rowSpan == 1 ? null : cell.rowSpan}
                    >
                        {cell.title}
                    </th>
                );
            });
            theadRows.push(<tr key={`thRow-${rowIndex}`}>{cells}</tr>);
        });

        data.forEach((item, rowIndex) => {
            let cells = [],
                isEven = rowIndex % 2 == 0,
                tableRowClassName =
                    rowClassName && rowClassName(item, rowIndex);
            this.columns.forEach((column, cellIndex) => {
                if ((checkbox || expandedRowRender) && cellIndex == 0) {
                    if (checkbox) {
                        cells.push(
                            <td
                                key={`tbCell-checkbox-${cellIndex}`}
                                className="checkbox-cell"
                            >
                                <Checkbox />
                            </td>
                        );
                    }
                    if (expandedRowRender) {
                        //minussquareo
                        cells.push(
                            <td
                                key={`tbCell-expand-${cellIndex}`}
                                className="expand-cell"
                                onClick={this.handleExpand}
                            >
                                <Icon type="plussquareo" />
                            </td>
                        );
                    }
                }
                cells.push(
                    <td key={`tbCell-${cellIndex}`}>
                        {column.render
                            ? column.render(item[column.dataIndex], item)
                            : item[column.dataIndex]}
                    </td>
                );
            });
            tbodyRows.push(
                <tr
                    key={`tbRow-${rowIndex}`}
                    className={classnames(tableRowClassName, {
                        "stripe-row": !isEven && stripe
                    })}
                >
                    {cells}
                </tr>
            );
            if (expandedRowRender) {
                cells = [];
                if (checkbox) {
                    cells.push(<td key={guid()} />);
                }
                cells.push(<td key={guid()} />);
                cells.push(
                    <td
                        key={`tbCell-expand-${rowIndex}`}
                        colSpan={this.columns.length}
                    >
                        {expandedRowRender(item)}
                    </td>
                );
                tbodyRows.push(
                    <tr
                        className={"expand-row"}
                        key={`tbRow-expand-${rowIndex}`}
                    >
                        {cells}
                    </tr>
                );
            }
        });

        return (
            <table className={`${prefixCls}-fixed`}>
                <colgroup>{colGroup}</colgroup>
                {type == TABLE_STYLE.all || type == TABLE_STYLE.header ? (
                    <thead className={`${prefixCls}-thead`}>{theadRows}</thead>
                ) : null}
                {type == TABLE_STYLE.all || type == TABLE_STYLE.body ? (
                    <tbody className={`${prefixCls}-tbody`}>{tbodyRows}</tbody>
                ) : null}
            </table>
        );
    }

    render() {
        const { columns, pagination, bordered, children } = this.props;
        const { loading } = this.state;
        let classString = classnames({
            [prefixCls]: true,
            [`${prefixCls}-bordered`]: bordered
        });
        return (
            <Loading show={loading}>
                <div className={classString} ref="table">
                    <div className={`${prefixCls}-content`}>
                        <div className={`${prefixCls}-scroll`}>
                            {this.renderHeader()}
                            {this.renderBody()}
                        </div>
                        <div className={`${prefixCls}-fixed-left`} />
                        <div className={`${prefixCls}-fixed-right`} />
                    </div>
                    {pagination ? <Pagination {...pagination} /> : null}
                </div>
            </Loading>
        );
    }
}

export default Table;
