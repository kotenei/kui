import React, { Component } from "react";
import { TimePicker } from "kui-react";

export default class Example extends Component {
    handleOK = value => {
        console.log(value);
    };
    render() {
        return (
            <TimePicker
                hourStep={2}
                minuteStep={5}
                secondStep={10}
                onOK={this.handleOK}
            />
        );
    }
}
