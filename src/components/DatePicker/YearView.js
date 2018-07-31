import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

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
        minDate: PropTypes.object,
        maxDate: PropTypes.object,
        onYearSelect: PropTypes.func
    };
    static defaultProps = {
        date: new Date()
    };
    handleYearClick = e => {
        const { target } = e;
        const { onYearSelect } = this.props;
        let year = target.getAttribute("year");
        if (onYearSelect) {
            onYearSelect(year);
        }
    };
    renderContent() {
        const { date, minDate, maxDate } = this.props;
        let rows = [],
            year = date.getFullYear(),
            num = parseInt(year.toString().substr(3)),
            start = year - num,
            flag = 0,
            disabled,
            cells;

        for (let i = 0; i < 3; i++) {
            cells = [];
            for (let j = flag, y; j < 10; j++) {
                y = start + j;
                disabled = false;
                if (
                    (minDate && y < minDate.getFullYear()) ||
                    (maxDate && y > maxDate.getFullYear())
                ) {
                    disabled = true;
                }
                cells.push(
                    <td key={`cell-${j}`}>
                        <a
                            year={y}
                            className={classnames({
                                active: y == year,
                                disabled
                            })}
                            onClick={!disabled ? this.handleYearClick : null}
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
