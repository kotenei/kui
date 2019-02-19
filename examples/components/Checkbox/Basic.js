import React, { Component } from "react";
import { Checkbox } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Checkbox mode="none">none</Checkbox>
                <Checkbox>normal</Checkbox>
                <Checkbox mode="toggle">toggle</Checkbox>
            </React.Fragment>
        );
    }
}
