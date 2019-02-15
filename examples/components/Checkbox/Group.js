import React, { Component } from "react";
import { Checkbox } from "main";

const CheckboxGroup = Checkbox.CheckboxGroup;
const options = ["one", "two", "three", "four"];

export default class Group extends Component {
    render() {
        return (
            <React.Fragment>
                <CheckboxGroup options={options} defaultValue={['one']} />
            </React.Fragment>
        );
    }
}
