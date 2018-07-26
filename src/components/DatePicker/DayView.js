import React, { Component } from "react";
import PropTypes from "prop-types";
import { getDaysInMonth, lastDayOfMonth, addMonths } from "date-fns";
import { dates } from "../../utils/dateUtils";

const now = new Date();

class DayView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysName: dates[props.lang].daysMin
        };
    }
    static propTypes = {
        date: PropTypes.object,
        month: PropTypes.number,
        day: PropTypes.number,
        lang: PropTypes.string
    };
    static defaultProps = {
        date: now,
        month: now.getMonth(),
        day: now.getDate(),
        lang: "zh-cn"
    };
    renderHead() {
        const { daysName } = this.state;
        let items = [];
        daysName.forEach(item => {
            items.push(<td key={item}>{item}</td>);
        });
        return items;
    }
    renderBody() {
        const { date } = this.props;
        let days = getDaysInMonth(date),
            dayOfWeek = date.getDay(),
            lastDayOfPrevMonth = lastDayOfMonth(addMonths(date, -1)),
            start;

        if (dayOfWeek == 0) {
            start = lastDayOfPrevMonth - 7;
        }
    }
    render() {
        const { month, day, date } = this.props;
        return (
            <table>
                <thead>
                    <tr>{this.renderHead()}</tr>
                </thead>
                <tbody>{this.renderBody()}</tbody>
            </table>
        );
    }
}

export default DayView;
