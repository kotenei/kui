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
const TABLE_TYPE = {
    header: 0,
    body: 1,
    all: 2
};
const FLEX_WIDTH = 50;

const HeaderContaienr = props => {
    return <div className={`${prefixCls}-header`}>{props.children}</div>;
};

const BodyContainer = props => {
    return <div className={`${prefixCls}-body`}>{props.children}</div>;
};

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
            expandedRowIds: props.expandedRowIds || props.defaultExpandedRowIds,
            width: "100%",
            columnsWidth: {},
            theadRowsHeight: [],
            tbodyRowsHeight: []
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
                node.id = guid();
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
            } else {
                rows[rowIndex].push(node);
            }
        });

        rows.forEach((row, rowIndex) => {
            row.push(...fixedRight[rowIndex]);
            row.unshift(...fixedLeft[rowIndex]);
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

    getColumns(rows) {
        let columns = [];
        let loop = function(rows, columns, rowIndex = 0) {
            rows[rowIndex].forEach(item => {
                if (!item.hasChild) {
                    columns.push(item);
                } else {
                    loop(rows, columns, rowIndex + 1);
                }
            });
        };
        loop(rows, columns);
        return columns;
    }

    setWidth = () => {
        const { checkbox, expandedRowRender } = this.props;
        let totalWidth = domUtils.width(this.refs.table);
        let tmpWidth = 0;
        let count = 0;
        let columnsWidth = {};

        if (checkbox) {
            tmpWidth += FLEX_WIDTH;
            columnsWidth["checkbox"] = FLEX_WIDTH;
        }
        if (expandedRowRender) {
            tmpWidth += FLEX_WIDTH;
            columnsWidth["expand"] = FLEX_WIDTH;
        }

        this.columns.forEach((item, index) => {
            if (item.width) {
                tmpWidth += item.width;
                columnsWidth[item.id] = item.width;
            } else {
                columnsWidth[item.id] = 0;
                count++;
            }
        });

        let diff = totalWidth - tmpWidth;
        let width = count == 0 ? 0 : diff / count;

        for (let key in columnsWidth) {
            if (columnsWidth[key] === 0) {
                columnsWidth[key] = width;
            }
        }

        this.setState({
            columnsWidth
        });
    };

    setHeight = () => {
        let elTableScroll = this.refs.table.querySelector(".k-table-scroll");
        let theadRows = elTableScroll.querySelectorAll(
            `.${prefixCls}-header tr`
        );
        let tbodyRows = elTableScroll.querySelectorAll(`.${prefixCls}-body tr`);
        let theadRowsHeight = this.getRowHeight(theadRows);
        let tbodyRowsHeight = this.getRowHeight(tbodyRows);
        this.setState({
            theadRowsHeight,
            tbodyRowsHeight
        });
    };

    getRowHeight(elRows) {
        let ret = [];
        if (elRows && elRows.length > 0) {
            elRows.forEach(row => {
                let height = domUtils.height(row);
                ret.push(height);
            });
        }
        return ret;
    }

    getColGroupInfo(columns, showChkAndExpand) {
        const { columnsWidth } = this.state;
        const { checkbox, expandedRowRender } = this.props;
        let colGroup = [];
        let key = 0;
        let totalWidth = 0;
        if (checkbox && showChkAndExpand) {
            colGroup.push(
                <col key={key++} style={{ width: columnsWidth["checkbox"] }} />
            );
            totalWidth += columnsWidth["checkbox"];
        }
        if (expandedRowRender && showChkAndExpand) {
            colGroup.push(
                <col key={key++} style={{ width: columnsWidth["expand"] }} />
            );
            totalWidth += columnsWidth["expand"];
        }
        columns.forEach(column => {
            let colStyle = { width: columnsWidth[column.id] || "auto" };
            colGroup.push(<col key={key++} style={colStyle} />);
            totalWidth += columnsWidth[column.id] || 0;
        });

        return { colGroup, totalWidth: totalWidth || "auto" };
    }

    componentWillMount() {
        this.init();
    }

    componentDidMount() {
        setTimeout(() => {
            this.setWidth();
            this.setHeight();
        });
        window.addEventListener("resize", this.setWidth);
        window.addEventListener("resize", this.setHeight);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setWidth);
        window.removeEventListener("resize", this.setHeight);
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }

    renderTable(
        headRows = this.theadRows,
        type = TABLE_TYPE.all,
        showChkAndExpand = true
    ) {
        const {
            checkbox,
            expandedRowRender,
            stripe,
            rowClassName
        } = this.props;
        const { data, theadRowsHeight, tbodyRowsHeight } = this.state;
        let columns = this.getColumns(headRows),
            colGropInfo = {},
            colGroup = [],
            theadRows = [],
            tbodyRows = [],
            rowStyle;

        headRows.forEach((row, rowIndex) => {
            let cells = [];
            rowStyle = { height: "auto" };
            row.forEach((cell, cellIndex) => {
                if (rowIndex == 0 && cellIndex == 0) {
                    if (checkbox && showChkAndExpand) {
                        cells.push(
                            <th
                                className="checkbox-cell"
                                key={`thCell-checkbox-${cellIndex}`}
                                rowSpan={headRows.length}
                            >
                                <Checkbox />
                            </th>
                        );
                    }
                    if (expandedRowRender && showChkAndExpand) {
                        cells.push(
                            <th
                                className="expand-cell"
                                key={`thCell-expand-${cellIndex}`}
                                rowSpan={headRows.length}
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

            if (theadRowsHeight && theadRowsHeight[rowIndex]) {
                rowStyle = { height: theadRowsHeight[rowIndex] };
            }

            theadRows.push(
                <tr key={`thRow-${rowIndex}`} style={rowStyle}>
                    {cells}
                </tr>
            );
        });

        
        colGropInfo = this.getColGroupInfo(columns, showChkAndExpand);
        colGroup = colGropInfo.colGroup;

        data.forEach((item, rowIndex) => {
            let cells = [],
                isEven = rowIndex % 2 == 0,
                tableRowClassName =
                    rowClassName && rowClassName(item, rowIndex);

            rowStyle = { height: "auto" };

            columns.forEach((column, cellIndex) => {
                if (cellIndex == 0) {
                    if (checkbox && showChkAndExpand) {
                        cells.push(
                            <td
                                key={`tbCell-checkbox-${cellIndex}`}
                                className="checkbox-cell"
                            >
                                <Checkbox />
                            </td>
                        );
                    }
                    if (expandedRowRender && showChkAndExpand) {
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

            if (tbodyRowsHeight && tbodyRowsHeight[rowIndex]) {
                rowStyle = { height: tbodyRowsHeight[rowIndex] };
            }

            tbodyRows.push(
                <tr
                    key={`tbRow-${rowIndex}`}
                    className={classnames(tableRowClassName, {
                        "stripe-row": !isEven && stripe
                    })}
                    style={rowStyle}
                >
                    {cells}
                </tr>
            );
            if (expandedRowRender && showChkAndExpand) {
                cells = [];
                if (checkbox) {
                    cells.push(<td key={guid()} />);
                }
                cells.push(<td key={guid()} />);
                cells.push(
                    <td
                        key={`tbCell-expand-${rowIndex}`}
                        colSpan={columns.length}
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
            <table
                className={`${prefixCls}-fixed`}
                style={{ width: colGropInfo.totalWidth }}
            >
                <colgroup>{colGroup}</colgroup>
                {type == TABLE_TYPE.all || type == TABLE_TYPE.header ? (
                    <thead className={`${prefixCls}-thead`}>{theadRows}</thead>
                ) : null}
                {type == TABLE_TYPE.all || type == TABLE_TYPE.body ? (
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
                            <HeaderContaienr>
                                {this.renderTable(
                                    this.theadRows,
                                    TABLE_TYPE.header
                                )}
                            </HeaderContaienr>
                            <BodyContainer>
                                {this.renderTable(
                                    this.theadRows,
                                    TABLE_TYPE.body
                                )}
                            </BodyContainer>
                        </div>
                        {/* <div className={`${prefixCls}-fixed-left`}>
                            <HeaderContaienr>
                                {this.renderTable(
                                    this.fixedLeft,
                                    TABLE_TYPE.header
                                )}
                            </HeaderContaienr>
                            <BodyContainer>
                                {this.renderTable(
                                    this.fixedLeft,
                                    TABLE_TYPE.body
                                )}
                            </BodyContainer>
                        </div>
                        <div className={`${prefixCls}-fixed-right`}>
                            <HeaderContaienr>
                                {this.renderTable(
                                    this.fixedRight,
                                    TABLE_TYPE.header,
                                    false
                                )}
                            </HeaderContaienr>
                            <BodyContainer>
                                {this.renderTable(
                                    this.fixedRight,
                                    TABLE_TYPE.body,
                                    false
                                )}
                            </BodyContainer>
                        </div> */}
                    </div>
                    {pagination ? <Pagination {...pagination} /> : null}
                </div>
            </Loading>
        );
    }
}

export default Table;
