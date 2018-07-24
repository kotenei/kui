import React, { Component } from "react";
import PropTypes from "prop-types";

class MonthView extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        month: PropTypes.array
    };
    static defaultProps = {
        prefixCls:'k-datepicker',
        month: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
        ]
    };
    renderRows() {
        const { month } = this.props;
        let rows = [],
            flag = 0;

        for (let i = 0; i < 4; i++) {
            let cells = [];
            for (let j = flag; j < month.length; j++) {
                cells.push(<td key={`cell_${j}`}>{month[j]}</td>);
                flag++;
                if ((j + 1) % 3 == 0) {
                    break;
                }
            }
            rows.push(<tr key={`row_${i}`}>{cells}</tr>);
        }

        return rows;
    }
    render() {
        const { prefixCls, month } = this.props;
        return (
            <table className={`${prefixCls}-table`}>
                <tbody>{this.renderRows()}</tbody>
            </table>
        );
    }
}

export default MonthView;
