import React, { Component } from "react";
import Select from "../components/Select";

const Option = Select.Option;

class SelectView extends Component {
    render() {
        return (
            <div>
                <h1>Select 选择器</h1>
                <div className="k-example">
                    <Select>
                        <Option value="选项一">选项一</Option>
                    </Select>
                </div>
            </div>
        );
    }
}

export default SelectView;
