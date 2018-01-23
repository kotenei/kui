import React, { Component } from "react";
import Select from "../components/Select";

const Option = Select.Option;

class SelectView extends Component {
    render() {
        return (
            <div>
                <h1>Select 选择器</h1>
                <div className="k-example">
                    <Select mode="multiple" defaultValue={['选项一']}>
                        <Option title="选项一" value="选项一">选项一</Option>
                        <Option title="选项二" value="选项二">选项二</Option>
                        <Option title="选项三" value="选项三">选项三</Option>
                    </Select>
                </div>
            </div>
        );
    }
}

export default SelectView;
