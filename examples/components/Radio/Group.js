import React, { Component } from "react";
import { Radio } from "kui-react";

const RadioGroup = Radio.RadioGroup;
const options = ["Apple", "Pear", "Orange"];

export default class Example extends Component {
    render() {
        return <RadioGroup options={options} />;
    }
}
