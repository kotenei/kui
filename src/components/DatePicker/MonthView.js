import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { dates } from "../../utils/dateUtils";
import { format } from "date-fns";

class MonthView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: dates[props.lang].monthsShort
        };
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        lang: PropTypes.string,
        date: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        minDate: PropTypes.object,
        maxDate: PropTypes.object,
        range:PropTypes.bool,
        onMonthSelect: PropTypes.func
    };
    static defaultProps = {
        prefixCls: "k-datepicker",
        lang: "zh-cn",
        date: new Date()
    };
    handleMonthClick = e => {
        const { target } = e;
        const { onMonthSelect } = this.props;
        let month = target.getAttribute("data-month");
        if (onMonthSelect) {
            onMonthSelect(month);
        }
    };
    renderRows() {
        const { date, minDate, maxDate } = this.props;
        const { months } = this.state;
        let rows = [],
            year = date.getFullYear(),
            month = date.getMonth(),
            flag = 0,
            min = minDate ? format(minDate, "YYYYMM") : null,
            max = maxDate ? format(maxDate, "YYYYMM") : null,
            disabled;

        for (let i = 0; i < 3; i++) {
            let cells = [];
            for (let j = flag, num; j < months.length; j++) {
                disabled = false;
                num = year + (j + 1).toString().padStart(2, "0");
                if ((min && num < min) || (max && num > max)) {
                    disabled = true;
                }
                cells.push(
                    <td key={`cell_${j}`}>
                        <a
                            data-month={j}
                            className={classnames({
                                active: month == j,
                                disabled
                            })}
                            onClick={!disabled ? this.handleMonthClick : null}
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
