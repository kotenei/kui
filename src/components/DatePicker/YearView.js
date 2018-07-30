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
        view: PropTypes.oneOf([0]),
        onYearSelect: PropTypes.func
    };
    static defaultProps = {
        date: new Date(),
        min,
        max: min + 400,
        view: 0
    };
    handleYearClick = e => {
        const { target } = e;
        const { onYearSelect } = this.props;
        let year = target.getAttribute("year");
        if (onYearSelect) {
            onYearSelect(year);
        }
    };
    componentWillMount() {}
    componentWillReceiveProps(nextProps) {}
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
                        <a
                            year={y}
                            className={y == year ? "active" : ""}
                            onClick={this.handleYearClick}
                        >
                            {y}
                        </a>
                    </td>
                );
                flag++;
                if ((j + 1) % 4 == 0) {
                    break;
                }
            }
            if (i == 2) {
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
