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
    return (
        <div
            ref={props.elRef}
            className={classnames(props.className, {
                [`${prefixCls}-header`]: true
            })}
            style={props.style}
        >
            {props.children}
        </div>
    );
};

const BodyContainer = props => {
    return (
        <div
            ref={props.elRef}
            className={classnames(props.className, {
                [`${prefixCls}-body`]: true,
                [`${prefixCls}-body__scroll`]: props.scroll
            })}
            style={props.style}
        >
            {props.children}
        </div>
    );
};

const ExpandIcon = props => {
    let onClick = function() {
        if (props.onClick) {
            props.onClick(props.id);
        }
    };
    return (
        <span onClick={onClick}>
            {props.expanded ? (
                <Icon type="minussquareo" />
            ) : (
                <Icon type="plussquareo" />
            )}
        </span>
    );
};

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
            checkedIds: props.checkedIds || props.defaultCheckedIds,
            expandedRowIds: props.expandedRowIds || props.defaultExpandedRowIds,
            tableWidth: "100%",
            tableContainerWidth: "100%",
            columnsWidth: {},
            theadRowsHeight: [],
            tbodyRowsHeight: [],
            scrollLeft: 0
        };
    }

    static propTypes = {
        bordered: PropTypes.bool,
        checkbox: PropTypes.bool,
        checkedIds: PropTypes.arrayOf(PropTypes.string),
        data: PropTypes.array,
        defaultCheckedIds: PropTypes.arrayOf(PropTypes.string),
        defaultExpandedRowIds: PropTypes.arrayOf(PropTypes.string),
        disabledCheckIds: PropTypes.arrayOf(PropTypes.string),
        expandedRowIds: PropTypes.arrayOf(PropTypes.string),
        expandedRowRender: PropTypes.func,
        footer: PropTypes.object,
        height: PropTypes.number,
        indentSize: PropTypes.number,
        loading: PropTypes.bool,
        pagination: PropTypes.object,
        rowClassName: PropTypes.func,
        showHeader: PropTypes.bool,
        stripe: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        onCheck: PropTypes.func,
        onChange: PropTypes.func,
        onExpand: PropTypes.func
    };

    static defaultProps = {
        bordered: false,
        checkbox: false,
        defaultCheckedIds: [],
        defaultExpandedRowIds: [],
        showHeader: true,
        stripe: false
    };

    init(props = this.props) {
        const {
            children,
            loading,
            data,
            checkbox,
            checkedIds,
            expandedRowIds
        } = props;
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
                if (fixed == "left" || fixed == true) {
                    fixedLeft[rowIndex].push(node);
                    node.fixed = "left";
                } else {
                    fixedRight[rowIndex].push(node);
                    node.fixed = "right";
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

        if ("loading" in props) {
            this.setState({
                loading
            });
        }

        if ("checkedIds" in props) {
            this.setState({
                checkedIds
            });
        }

        if ("expandedRowIds" in props) {
            this.setState({
                expandedRowIds
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

        let diff = Math.abs(totalWidth - tmpWidth);
        let width = count == 0 ? 0 : diff / count;

        for (let key in columnsWidth) {
            if (columnsWidth[key] === 0) {
                columnsWidth[key] = width;
            }
        }

        this.setState({
            columnsWidth,
            tableWidth: tmpWidth,
            tableContainerWidth: totalWidth
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

    getColGroupInfo(columns) {
        const { columnsWidth } = this.state;
        const { checkbox, expandedRowRender } = this.props;
        let colGroup = [];
        let key = 0;
        let totalWidth = 0;
        if (checkbox) {
            colGroup.push(
                <col key={key++} style={{ width: columnsWidth["checkbox"] }} />
            );
            totalWidth += columnsWidth["checkbox"];
        }
        if (expandedRowRender) {
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

    getFixedWidth(columns, fixed = "left") {
        const { columnsWidth } = this.state;
        const { checkbox, expandedRowRender } = this.props;
        let totalWidth = 0;
        if (fixed == "left") {
            if (checkbox) {
                totalWidth += columnsWidth["checkbox"];
            }
            if (expandedRowRender) {
                totalWidth += columnsWidth["expand"];
            }
        }
        columns.forEach(column => {
            let width = columnsWidth[column.id] || 0;
            totalWidth += width;
        });
        return totalWidth;
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
        this.scrollBind([
            this.elMainBody,
            this.refs.elFixedLeftBody,
            this.refs.elFixedRightBody
        ]);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setWidth);
        window.removeEventListener("resize", this.setHeight);
        this.scrollBind(
            [
                this.elMainBody,
                this.refs.elFixedLeftBody,
                this.refs.elFixedRightBody
            ],
            false
        );
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }

    renderTable(
        headRows = this.theadRows,
        type = TABLE_TYPE.all,
        showChkAndExpand = true,
        width
    ) {
        const {
            checkbox,
            expandedRowRender,
            stripe,
            rowClassName,
            data,
            showHeader,
            disabledCheckIds
        } = this.props;
        const {
            theadRowsHeight,
            tbodyRowsHeight,
            checkedIds,
            expandedRowIds
        } = this.state;
        let columns = this.getColumns(headRows),
            colGropInfo = this.getColGroupInfo(columns, showChkAndExpand),
            colGroup = colGropInfo.colGroup,
            theadRows = [],
            tbodyRows = [],
            checkedCount = 0,
            disabledCheckCount = 0,
            checkedAll = false,
            indeterminate = false,
            rowStyle;

        data.forEach((item, rowIndex) => {
            let cells = [],
                isEven = rowIndex % 2 == 0,
                checked = checkedIds.indexOf(item.id) > -1,
                expanded = expandedRowIds.indexOf(item.id) > -1,
                disabledCheck =
                    disabledCheckIds && disabledCheckIds.indexOf(item.id) > -1,
                tableRowClassName =
                    rowClassName && rowClassName(item, rowIndex);

            if (checked) {
                checkedCount++;
            }

            if (disabledCheck) {
                disabledCheckCount++;
            }

            columns.forEach((column, cellIndex) => {
                if (cellIndex == 0) {
                    if (checkbox && showChkAndExpand) {
                        cells.push(
                            <td
                                key={`tbCell-checkbox-${cellIndex}`}
                                className="checkbox-cell"
                            >
                                <Checkbox
                                    checked={checked}
                                    onChange={this.handleCheck}
                                    value={item.id}
                                    disabled={disabledCheck}
                                />
                            </td>
                        );
                    }
                    if (expandedRowRender && showChkAndExpand) {
                        cells.push(
                            <td
                                key={`tbCell-expand-${cellIndex}`}
                                className="expand-cell"
                            >
                                <ExpandIcon
                                    expanded={expanded}
                                    id={item.id}
                                    onClick={this.handleExpand}
                                />
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

            rowStyle = { height: "auto" };

            if (tbodyRowsHeight) {
                if (expandedRowRender) {
                    rowStyle = { height: tbodyRowsHeight[rowIndex * 2] };
                } else {
                    rowStyle = { height: tbodyRowsHeight[rowIndex] };
                }
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
                        className={classnames({
                            [`expand-row`]: true,
                            [`expand-row--show`]: expanded
                        })}
                        key={`tbRow-expand-${rowIndex}`}
                        style={{ height: tbodyRowsHeight[rowIndex + 1] }}
                    >
                        {cells}
                    </tr>
                );
            }

            if (expandedRowRender && !showChkAndExpand) {
                tbodyRows.push(
                    <tr
                        className={classnames({
                            [`expand-row`]: true,
                            [`expand-row--show`]: expanded
                        })}
                        key={`tbRow-expand-${rowIndex}`}
                        style={{ height: tbodyRowsHeight[rowIndex + 1] }}
                    >
                        <td colSpan={columns.length} />
                    </tr>
                );
            }
        });

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
                                <Checkbox
                                    indeterminate={checkedCount > 0}
                                    checked={
                                        checkedCount + disabledCheckCount ===
                                        data.length
                                    }
                                    onChange={this.handleCheckAll}
                                />
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

        return (
            <table
                className={`${prefixCls}-fixed`}
                style={{ width: width || colGropInfo.totalWidth }}
            >
                <colgroup>{colGroup}</colgroup>
                {showHeader &&
                (type == TABLE_TYPE.all || type == TABLE_TYPE.header) ? (
                    <thead className={`${prefixCls}-thead`}>{theadRows}</thead>
                ) : null}
                {type == TABLE_TYPE.all || type == TABLE_TYPE.body ? (
                    <tbody className={`${prefixCls}-tbody`}>{tbodyRows}</tbody>
                ) : null}
            </table>
        );
    }

    renderThead(headerRows, colGroupInfo) {
        const { checkbox, data, expandedRowRender } = this.props;
        const { checkedIds, expandedRowIds } = this.state;
        let theadRows = [];
        headerRows.forEach((row, rowIndex) => {
            let cells = [];
            row.forEach((cell, cellIndex) => {
                if (rowIndex == 0 && cellIndex == 0) {
                    if (checkbox) {
                        cells.push(
                            <th
                                className="checkbox-cell"
                                key={`thCell-checkbox-${cellIndex}`}
                                rowSpan={headerRows.length}
                            >
                                <Checkbox
                                    // indeterminate={checkedCount > 0}
                                    // checked={
                                    //     checkedCount + disabledCheckCount ===
                                    //     data.length
                                    // }
                                    onChange={this.handleCheckAll}
                                />
                            </th>
                        );
                    }
                    if (expandedRowRender) {
                        cells.push(
                            <th
                                className="expand-cell"
                                key={`thCell-expand-${cellIndex}`}
                                rowSpan={headerRows.length}
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
        return (
            <table
                className={`${prefixCls}-fixed`}
                style={{ width: colGroupInfo.totalWidth }}
            >
                <colgroup>{colGroupInfo.colGroup}</colgroup>
                <thead className={`${prefixCls}-thead`}>{theadRows}</thead>
            </table>
        );
    }

    renderTbody(columns, colGroupInfo) {
        const {
            checkbox,
            data,
            expandedRowRender,
            disabledCheckIds,
            rowClassName,
            stripe
        } = this.props;
        const { checkedIds, expandedRowIds } = this.state;

        let tbodyRows = [];

        data.forEach((item, index) => {
            let cells = [],
                isEven = index % 2 == 0,
                checked = checkedIds.indexOf(item.id) > -1,
                expanded = expandedRowIds.indexOf(item.id) > -1,
                disabledCheck =
                    disabledCheckIds && disabledCheckIds.indexOf(item.id) > -1,
                tableRowClassName = rowClassName && rowClassName(item, index);

            columns.forEach((column, cellIndex) => {
                if (cellIndex == 0) {
                    if (checkbox) {
                        cells.push(
                            <td
                                key={`tbCell-checkbox-${cellIndex}`}
                                className="checkbox-cell"
                            >
                                <Checkbox
                                    checked={checked}
                                    onChange={this.handleCheck}
                                    value={item.id}
                                    disabled={disabledCheck}
                                />
                            </td>
                        );
                    }
                    if (expandedRowRender) {
                        cells.push(
                            <td
                                key={`tbCell-expand-${cellIndex}`}
                                className="expand-cell"
                            >
                                <ExpandIcon
                                    expanded={expanded}
                                    id={item.id}
                                    onClick={this.handleExpand}
                                />
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
                    key={`tbRow-${index}`}
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
                    <td key={`tbCell-expand-${index}`} colSpan={columns.length}>
                        {expandedRowRender(item)}
                    </td>
                );
                tbodyRows.push(
                    <tr
                        className={classnames({
                            [`expand-row`]: true,
                            [`expand-row--show`]: expanded
                        })}
                        key={`tbRow-expand-${index}`}
                    >
                        {cells}
                    </tr>
                );
            }
        });

        return (
            <table
                className={`${prefixCls}-fixed`}
                style={{ width: colGroupInfo.totalWidth }}
            >
                <colgroup>{colGroupInfo.colGroup}</colgroup>
                <tbody className={`${prefixCls}-tbody`}>{tbodyRows}</tbody>
            </table>
        );
    }

    render() {
        const { pagination, bordered, children, height } = this.props;
        const {
            loading,
            theadRowsHeight,
            tbodyRowsHeight,
            tableWidth,
            tableContainerWidth,
            scrollLeft
        } = this.state;
        let classString = classnames({
            [prefixCls]: true,
            [`${prefixCls}-bordered`]: bordered
        });
        let scrollY = false;
        let scrollX = tableWidth > tableContainerWidth;
        let mainHeaderStyle = {};
        let positionClass;
        let curWidth = scrollLeft + tableContainerWidth;
        let top = 0;

        theadRowsHeight.forEach(item => {
            top += item;
        });

        if (height) {
            let bodyHeight = 0;
            tbodyRowsHeight.forEach(item => {
                bodyHeight += item;
            });
            scrollY = height < bodyHeight;
        }

        if (!scrollX) {
            mainHeaderStyle.overflowX = "hidden";
            mainHeaderStyle.marginBottom = "0";
        }

        if (scrollY) {
            curWidth -= 21;
        } else {
            mainHeaderStyle.overflowY = "hidden";
        }

        if (scrollLeft > 0 && curWidth < tableWidth) {
            positionClass = `${prefixCls}-position-middle`;
        } else if (scrollLeft > 0 && curWidth == tableWidth) {
            positionClass = `${prefixCls}-position-right`;
        } else {
            positionClass = `${prefixCls}-position-left`;
        }

        if (scrollX) {
            classString = classnames(classString, positionClass);
        } else {
            classString = classnames(classString, {
                [`${prefixCls}-position-left`]: true,
                [`${prefixCls}-position-right`]: true
            });
        }

        let columns = this.getColumns(this.theadRows);
        let colGropInfo = this.getColGroupInfo(columns);
        let header = this.renderThead(this.theadRows, colGropInfo);
        let body = this.renderTbody(columns, colGropInfo);

        let main = (
            <React.Fragment>
                <HeaderContaienr
                    style={mainHeaderStyle}
                    elRef={el => (this.elMainHeader = el)}
                >
                    {header}
                </HeaderContaienr>
                <BodyContainer
                    elRef={el => (this.elMainBody = el)}
                    style={{
                        maxHeight: height,
                        overflowY: scrollY ? "scroll" : "hidden",
                        overflowX: scrollX ? "scroll" : "hidden"
                    }}
                >
                    {body}
                </BodyContainer>
            </React.Fragment>
        );

        let left = (
            <div
                className={`${prefixCls}-fixed-left`}
                // style={{ width: colGropInfo.totalWidth, height: "100%" }}
            >
                <HeaderContaienr>{header}</HeaderContaienr>
                <BodyContainer scroll={scrollY} style={{ top }}>
                    <div
                        ref="elFixedLeftBody"
                        className={`${prefixCls}-body-inner`}
                        style={{
                            maxHeight: height
                        }}
                    >
                        {body}
                    </div>
                </BodyContainer>
            </div>
        );

        // let main = (
        //     <React.Fragment>
        //         <HeaderContaienr
        //             style={mainHeaderStyle}
        //             elRef={el => (this.elMainHeader = el)}
        //         >
        //             {this.renderTable(this.theadRows, TABLE_TYPE.header, true)}
        //         </HeaderContaienr>
        //         <BodyContainer
        //             elRef={el => (this.elMainBody = el)}
        //             style={{
        //                 maxHeight: height,
        //                 overflowY: scrollY ? "scroll" : "hidden",
        //                 overflowX: scrollX ? "scroll" : "hidden"
        //             }}
        //         >
        //             {this.renderTable(this.theadRows, TABLE_TYPE.body, true)}
        //         </BodyContainer>
        //     </React.Fragment>
        // );

        // let left = (
        //     <div className={`${prefixCls}-fixed-left`}>
        //         <HeaderContaienr>
        //             {this.renderTable(this.fixedLeft, TABLE_TYPE.header)}
        //         </HeaderContaienr>
        //         <BodyContainer scroll={scrollY}>
        //             <div
        //                 ref="elFixedLeftBody"
        //                 className={`${prefixCls}-body-inner`}
        //                 style={{
        //                     maxHeight: height
        //                 }}
        //             >
        //                 {this.renderTable(this.fixedLeft, TABLE_TYPE.body)}
        //             </div>
        //         </BodyContainer>
        //     </div>
        // );

        // let right = (
        //     <div className={`${prefixCls}-fixed-right`}>
        //         <HeaderContaienr>
        //             {this.renderTable(
        //                 this.fixedRight,
        //                 TABLE_TYPE.header,
        //                 false
        //             )}
        //         </HeaderContaienr>
        //         <BodyContainer scroll={scrollY}>
        //             <div
        //                 ref="elFixedRightBody"
        //                 className={`${prefixCls}-body-inner`}
        //                 style={{
        //                     maxHeight: height
        //                 }}
        //             >
        //                 {this.renderTable(
        //                     this.fixedRight,
        //                     TABLE_TYPE.body,
        //                     false
        //                 )}
        //             </div>
        //         </BodyContainer>
        //     </div>
        // );

        return (
            <Loading show={loading}>
                <div className={classString} ref="table">
                    <div className={`${prefixCls}-content`}>
                        <div
                            className={`${prefixCls}-scroll`}
                            ref="elMainScroll"
                        >
                            {main}
                        </div>

                        {this.fixedLeft &&
                        this.fixedLeft.length > 0 &&
                        this.fixedLeft[0].length
                            ? left
                            : null}

                        {/* {this.fixedRight &&
                        this.fixedRight.length > 0 &&
                        this.fixedRight[0].length > 0
                            ? right
                            : null} */}
                    </div>
                    {pagination ? <Pagination {...pagination} /> : null}
                </div>
            </Loading>
        );
    }

    handleCheckAll = e => {
        const { target } = e;
        const { onCheck, data, disabledCheckIds } = this.props;
        const { checkedIds } = this.state;
        let checked = target.checked;
        let newCheckedIds = [...checkedIds];
        data.forEach(item => {
            let index = newCheckedIds.indexOf(item.id);
            let disabled =
                disabledCheckIds && disabledCheckIds.indexOf(item.id) > -1;
            if (!disabled) {
                if (checked) {
                    if (index == -1) {
                        newCheckedIds.push(item.id);
                    }
                } else {
                    if (index > -1) {
                        newCheckedIds.splice(index, 1);
                    }
                }
            }
        });
        if (!("checkedIds" in this.props)) {
            this.setState({
                checkedIds: newCheckedIds
            });
        }
        if (onCheck) {
            onCheck(newCheckedIds);
        }
    };

    handleCheck = e => {
        const { target } = e;
        const { onCheck } = this.props;
        const { checkedIds } = this.state;
        let checked = target.checked;
        let value = target.value;
        let index = checkedIds.indexOf(value);
        let newCheckedIds = [...checkedIds];
        if (index > -1) {
            newCheckedIds.splice(index, 1);
        } else {
            newCheckedIds.push(value);
        }
        if (!("checkedIds" in this.props)) {
            this.setState({
                checkedIds: newCheckedIds
            });
        }
        if (onCheck) {
            onCheck(newCheckedIds);
        }
    };

    handleExpand = (id, expanded) => {
        const { onExpand } = this.props;
        const { expandedRowIds } = this.state;
        let newExpandedRowIds = [...expandedRowIds];
        let index = newExpandedRowIds.indexOf(id);
        if (index > -1) {
            newExpandedRowIds.splice(index, 1);
        } else {
            newExpandedRowIds.push(id);
        }
        if (!("expandedRowIds" in this.props)) {
            this.setState(
                {
                    expandedRowIds: newExpandedRowIds
                },
                () => {
                    // this.setHeight();
                }
            );
        }

        if (onExpand) {
            onExpand(newExpandedRowIds);
        }
    };

    handleScroll = e => {
        const { target } = e;
        const delay = 300;
        let scrollLeft = target.scrollLeft;
        let scrollTop = target.scrollTop;

        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (target === this.elMainBody) {
            this.scrollBind(
                [this.refs.elFixedLeftBody, this.refs.elFixedRightBody],
                false
            );
            this.elMainHeader.scrollLeft = scrollLeft;
            if (this.refs.elFixedLeftBody) {
                this.refs.elFixedLeftBody.scrollTop = scrollTop;
            }
            if (this.refs.elFixedRightBody) {
                this.refs.elFixedRightBody.scrollTop = scrollTop;
            }
            this.timer = setTimeout(() => {
                this.scrollBind([
                    this.refs.elFixedLeftBody,
                    this.refs.elFixedRightBody
                ]);
            }, delay);
            if (this.state.scrollLeft !== scrollLeft) {
                this.setState({
                    scrollLeft: scrollLeft
                });
            }
        } else if (target === this.refs.elFixedLeftBody) {
            this.scrollBind(
                [this.elMainBody, this.refs.elFixedRightBody],
                false
            );
            this.elMainBody.scrollTop = scrollTop;
            if (this.refs.elFixedRightBody) {
                this.refs.elFixedRightBody.scrollTop = scrollTop;
            }
            this.timer = setTimeout(() => {
                this.scrollBind([this.elMainBody, this.refs.elFixedRightBody]);
            }, delay);
        } else if (target === this.refs.elFixedRightBody) {
            this.scrollBind(
                [this.elMainBody, this.refs.elFixedLeftBody],
                false
            );
            this.elMainBody.scrollTop = scrollTop;
            if (this.refs.elFixedLeftBody) {
                this.refs.elFixedLeftBody.scrollTop = scrollTop;
            }
            this.timer = setTimeout(() => {
                this.scrollBind([this.elMainBody, this.refs.elFixedLeftBody]);
            }, delay);
        }
    };

    scrollBind = (els, bind = true) => {
        if (els && els.length > 0) {
            els.forEach(el => {
                if (el) {
                    if (bind) {
                        el.addEventListener("scroll", this.handleScroll);
                    } else {
                        el.removeEventListener("scroll", this.handleScroll);
                    }
                }
            });
        }
    };
}

export default Table;
