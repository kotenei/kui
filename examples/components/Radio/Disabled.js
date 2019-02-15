import React, { Component } from "react";
import { Radio } from "kui-react";

export default class Disabled extends Component {
    render() {
        return (
            <React.Fragment>
                <Radio checked disabled>
                    Radio
                </Radio>
                <Radio disabled>Radio</Radio>
            </React.Fragment>
        );
    }
}
