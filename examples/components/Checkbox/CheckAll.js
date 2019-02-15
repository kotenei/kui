import React, { Component } from "react";
import { Checkbox } from "main";

const CheckboxGroup = Checkbox.CheckboxGroup;
const options = ["one", "two", "three", "four"];

export default class CheckAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indeterminate: false,
            checkAll: false,
            checkedList: []
        };
    }
    handleCheckAll = e => {
        this.setState({
            checkAll: !this.state.checkAll,
            indeterminate: false,
            checkedList: e.target.checked ? options : []
        });
    };
    handleChange = checkedList => {
        this.setState({
            checkAll: checkedList.length == options.length,
            indeterminate:
                checkedList.length > 0 && checkedList.length != options.length,
            checkedList
        });
    };
    render() {
        const { checkAll, checkedList, indeterminate } = this.state;
        return (
            <React.Fragment>
                <Checkbox
                    checked={checkAll}
                    indeterminate={indeterminate}
                    onChange={this.handleCheckAll}
                >
                    全选
                </Checkbox>
                <CheckboxGroup
                    options={options}
                    value={checkedList}
                    onChange={this.handleChange}
                />
            </React.Fragment>
        );
    }
}
