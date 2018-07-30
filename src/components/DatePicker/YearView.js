import React, { Component } from "react";
import PropTypes from "prop-types";

const min = 1900;

class YearView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewData: {},
            curPage: -1
        };
    }
    static propTypes = {
        date: PropTypes.object,
        min: PropTypes.number,
        max: PropTypes.number,
        view: PropTypes.oneOf([0, 1])
    };
    static defaultProps = {
        date: new Date(),
        min,
        max: min + 400,
        view: 1
    };
    setViewData(props = this.props) {
        const { min, max, view, date } = props;
        let year = date.getFullYear(),
            pageSize = view == 0 ? 120 : 10,
            total = max - min,
            pages = parseInt(total / pageSize),
            viewData = {},
            step = view == 0 ? 10 : 1,
            start = min,
            curPage = -1,
            end;
        for (let i = 0; i < pages; i++) {
            viewData[i] = [];
            end = start + pageSize;
            for (let j = start; j < end; j += step) {
                if (view == 0) {
                    viewData[i].push(`${j}-${j + 9}`);
                    if (year >= j && year <= j + 9) {
                        curPage = i;
                    }
                } else {
                    viewData[i].push(j);
                    if (year == j) {
                        curPage = i;
                    }
                }
            }
            start = end;
        }
        this.setState({
            viewData,
            curPage
        });
    }
    componentWillMount() {
        this.setViewData();
    }
    componentWillReceiveProps(nextProps) {
        this.setViewData(nextProps);
    }
    renderContent() {
        const { view, date } = this.props;
        let rows = [],
            year = date.getFullYear(),
            num = parseInt(year.toString().substr(3)),
            start = year - num,
            flag = 0,
            cells;

        for (let i = 0; i < 3; i++) {
            cells = [];
            for (let j = flag, y; j < 10; j++) {
                y = start + j;
                cells.push(
                    <td key={`cell-${j}`}>
                        <a className={y == year ? "active" : ""}>{y}</a>
                    </td>
                );
                flag++;
                if ((j + 1) % 4 == 0) {
                    break;
                }
            }
            if (view == 1 && i == 2) {
                cells.push(<td key={`cell-empty1-${i}`} />);
                cells.push(<td key={`cell-empty2-${i}`} />);
            }

            rows.push(<tr key={`row-${i}`}>{cells}</tr>);
        }

        return rows;
    }
    render() {
        const { prefixCls } = this.props;
        return (
            <table className={`${prefixCls}-year-table`}>
                <tbody>{this.renderContent()}</tbody>
            </table>
        );
    }
}

export default YearView;
