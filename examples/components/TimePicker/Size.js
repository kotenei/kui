import React, { Component } from "react";
import { TimePicker } from "kui-react";

export default class Example extends Component {
    state = {
        value: "10:52:50"
    };
    handleOK = value => {
        console.log(value);
        this.setState({
            value
        });
    };
    render() {
        const { value } = this.state;
        return (
            <React.Fragment>
                <TimePicker kSize="lg" value={value} onOK={this.handleOK} />
                <br />
                <TimePicker value={value} onOK={this.handleOK} />
                <br />
                <TimePicker kSize="sm" value={value} onOK={this.handleOK} />
            </React.Fragment>
        );
    }
}
