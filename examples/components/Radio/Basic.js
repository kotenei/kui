import React, { Component } from "react";
import { Radio } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Radio mode="none">none</Radio>
                <Radio>material</Radio>
            </React.Fragment>
        );
    }
}
