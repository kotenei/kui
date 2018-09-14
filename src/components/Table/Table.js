import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import TableColumn from "./TableColumn";
import Loading from "../Loading";
import Pagination from "../Pagination";
import { deepClone, guid } from "../../utils";
import omit from "object.omit";
import Checkbox from "../Checkbox";
import Icon from "../Icon";

const prefixCls = "k-table";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading
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
        scroll: PropTypes.object,
        showHeader: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        onChange: PropTypes.func,
        onExpand: PropTypes.func
    };
    static defaultProps = {
        bordered: false,
        checkbox: false,
        defaultExpandedRowIds: [],
        fixedHeader: false,
        showHeader: true
    };
    init(props = this.props) {
        const { children, loading, data, checkbox } = props;
        let maxLevel = 1,
            nodes = [],
            rows = [],
            columns = [],
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
                    curNode.hasChild = false;
                    curNode.colSpan = 1;
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
        }
        nodes.forEach(node => {
            if (!node.hasChild) {
                node.rowSpan = maxLevel - node.level + 1;
            } else {
                node.rowSpan = 1;
            }
            rows[node.level - 1].push(node);
        });

        // if(checkbox){
        //     rows[rows.length-1].splice()
        // }

        this.columns = columns;
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
    componentWillMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }
    renderHeader() {
        return (
            <div className={`${prefixCls}-header`}>{this.renderTable()}</div>
        );
    }
    renderBody() {
        return <div className={`${prefixCls}-body`} />;
    }
    renderTable() {
        const { checkbox, expandedRowRender } = this.props;
        const { data } = this.state;
        let theadRows = [],
            tbodyRows = [];
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
            let cells = [];
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
            tbodyRows.push(<tr key={`tbRow-${rowIndex}`}>{cells}</tr>);
        });

        return (
            <table className={`${prefixCls}-fixed`}>
                <thead className={`${prefixCls}-thead`}>{theadRows}</thead>
                <tbody className={`${prefixCls}-tbody`}>{tbodyRows}</tbody>
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
                <div className={classString}>
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
