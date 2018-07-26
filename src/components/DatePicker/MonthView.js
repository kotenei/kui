import React, { Component } from "react";
import PropTypes from "prop-types";
import { dates } from "../../utils/dateUtils";

class MonthView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: dates[props.lang].months
        };
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        lang: PropTypes.string,
        month: PropTypes.number,
        onMonthClick: PropTypes.func
    };
    static defaultProps = {
        prefixCls: "k-datepicker",
        lang: "zh-cn",
        month: new Date().getMonth()
    };
    handleMonthClick = e => {
        const { target } = e;
        const { onMonthClick } = this.props;
        let month = target.getAttribute("data-month");
        if (onMonthClick) {
            onMonthClick(month);
        }
    };
    renderRows() {
        const { month } = this.props;
        const { months } = this.state;
        let rows = [],
            flag = 0;

        for (let i = 0; i < 3; i++) {
            let cells = [];
            for (let j = flag; j < months.length; j++) {
                cells.push(
                    <td key={`cell_${j}`}>
                        <a
                            data-month={j}
                            className={`${month == j ? "active" : ""}`}
                            onClick={this.handleMonthClick}
                        >
                            {months[j]}
                        </a>
                    </td>
                );
                flag++;
                if ((j + 1) % 4 == 0) {
                    break;
                }
            }
            rows.push(<tr key={`row_${i}`}>{cells}</tr>);
        }

        return rows;
    }
    render() {
        const { prefixCls } = this.props;
        return (
            <table className={`${prefixCls}-month-table`}>
                <tbody>{this.renderRows()}</tbody>
            </table>
        );
    }
}

export default MonthView;
