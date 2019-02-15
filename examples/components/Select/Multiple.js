import React, { Component } from "react";
import { Select } from "kui-react";

const Option = Select.Option;
const options = [
    <Option key="1" title="选项一" value="选项一">
        选项一
    </Option>,
    <Option key="2" title="选项二" value="选项二">
        选项二
    </Option>,
    <Option key="3" title="选项三" value="选项三">
        选项三
    </Option>
];

export default class Multiple extends Component {
    render() {
        return (
            <Select multiple placeholder="请选择">
                {options}
            </Select>
        );
    }
}
