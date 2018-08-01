import React, { Component } from "react";
import PropTypes from "prop-types";
import Picker from "./Picker";
import Input from "../Input";
import { format as formatter } from "date-fns";

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue || props.value
        };
    }
    handleChange = date => {
        const { onChange, format } = this.props;
        if (!("value" in this.props)) {
            this.setState({
                value: date
            });
        }
        if (onChange) {
            onChange(formatter(date, format));
        }
    };
    render() {
        const { kSize, disabled, placeholder, format } = this.props;
        const { value } = this.state;
        return (
            <Picker {...this.props} value={value} onChange={this.handleChange}>
                <Input
                    type="text"
                    kSize={kSize}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={value ? formatter(value, format) : ""}
                    onChange={() => {}}
                />
            </Picker>
        );
    }
}

export default DatePicker;
