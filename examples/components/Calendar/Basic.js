import React, { Component } from "react";
import { Calendar } from "kui-react";
import { format as formatter, addDays } from "date-fns";

export default class Basic extends Component {
    render() {
        let now = new Date();
        let data = [];
        now = addDays(now, -(Math.random() * 30 + 1));
        for (let i = 1; i <= 8; i++) {
            let num1 = Math.floor(Math.random() * 10 + 1),
                num2 = Math.floor(Math.random() * 10 + 1) + num1;
            data.push({
                id: i,
                title: `event${i}`,
                start: formatter(addDays(now, num1), "YYYY-MM-DD"),
                end: formatter(addDays(now, num2), "YYYY-MM-DD")
            });
        }
        return (
            <React.Fragment>
                <Calendar data={data} />
            </React.Fragment>
        );
    }
}
