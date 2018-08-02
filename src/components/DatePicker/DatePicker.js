import React, { Component } from "react";
import PropTypes from "prop-types";
import Picker from "./Picker";
import Input from "../Input";
import { format as formatter } from "date-fns";
import { Empty, getPosition, FirstChild } from "../../utils";
import PopPanel from "../PopPanel";

let seed = 1;
let instances = {};

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                left: -999,
                top: -999
            },
            open: false,
            value: props.defaultValue || props.value
        };
        this.id = `datepicker_${seed++}`;
        instances[this.id] = this;
    }
    handleClick = e => {
        this.open();
    };
    handleChange = obj => {
        const { onChange, format } = this.props;
        const { date, canClose } = obj;
        if (!("value" in this.props)) {
            this.setState({
                value: Array.isArray(date) ? date[0] : date
            });
        }
        if (onChange) {
            onChange(date);
        }
        if (canClose) {
            this.close();
        }
    };
    open = () => {
        this.setState({
            open: true
        });
    };
    close = () => {
        this.setState({
            open: false
        });
    };
    componentDidMount() {
        document.addEventListener("click", this.close);
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.close);
    }
    render() {
        const { kSize, disabled, placeholder, format } = this.props;
        const { value, open } = this.state;
        let input = (
            <Input
                ref="input"
                type="text"
                kSize={kSize}
                disabled={disabled}
                placeholder={placeholder}
                value={value ? formatter(value, format) : ""}
                onChange={() => {}}
                onClick={this.handleClick}
            />
        );
        return (
            <PopPanel input={input} open={open}>
                <Picker
                    {...this.props}
                    value={value}
                    onChange={this.handleChange}
                />
            </PopPanel>
        );
    }
}

export default DatePicker;
