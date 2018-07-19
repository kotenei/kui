import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { format } from "date-fns";
import TimePickerSelect from "./TimePickerSelect";
import Input from "../Input";
import { Empty, getPosition } from "../../utils";
import { throws } from "assert";
import { error } from "util";

const prefixCls = "k-timepicker";

class TimePicker extends Component {
    state = {
        value: "",
        open: false,
        left: -999,
        top: -999
    };
    static propTypes = {
        defaultValue: PropTypes.string,
        disabled: PropTypes.bool,
        format: PropTypes.string,
        hourStep: PropTypes.number,
        minuteStep: PropTypes.number,
        secondStep: PropTypes.number,
        open: PropTypes.bool,
        placeholder: PropTypes.string,
        use12Hours: PropTypes.bool,
        value: PropTypes.string,
        onChange: PropTypes.func
    };
    static defaultProps = {
        format: "hh:mm:ss",
        hourStep: 1,
        minuteStep: 1,
        secondStep: 1,
        open: false,
        use12Hours: false
    };
    handleFocus = e => {};
    handleItemClick = (type, value, index) => {
        switch (type) {
            case "year":
                break;
            case "minute":
                break;
            case "second":
                break;
            default:
                break;
        }
    };
    setPosition() {
        let position = getPosition({
            trigger: this.refs.input,
            placement: "bottomLeft"
        });
        this.setState({
            left: position.left,
            top: position.top + 2
        });
    }
    isTime(str) {
        let reg = /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/;
        let match = str.match(reg);
        if (!match) {
            return false;
        }
        if (
            match[1] < 0 ||
            match[1] > 24 ||
            match[3] < 0 ||
            match[3] > 59 ||
            match[4] < 0 ||
            match[4] > 59
        ) {
            return false;
        }
        return true;
    }
    getHours() {
        const { use12Hours, hourStep } = this.props;
        let hours = use12Hours ? 12 : 23;
        let data = [];
        for (let i = 0; i <= hours; i += hourStep) {
            data.push(String(i).padStart(2, "0"));
        }
        return data;
    }
    getMinutes() {
        const { minuteStep } = this.props;
        let data = [];
        let minutes = 59;
        for (let i = 0; i <= minutes; i += minuteStep) {
            data.push(String(i).padStart(2, "0"));
        }
        return data;
    }
    getSeconds() {
        const { secondStep } = this.props;
        let data = [];
        let seconds = 59;
        for (let i = 0; i <= seconds; i += secondStep) {
            data.push(String(i).padStart(2, "0"));
        }
        return data;
    }
    componentWillMount() {
        let value = this.props.value || this.props.defaultValue;
        if (value && this.isTime(value)) {
            this.setState({
                value
            });
        }
    }
    componentDidMount() {
        if ("open" in this.props) {
            this.setPosition();
            this.setState({
                open: this.props.open
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if ("open" in nextProps) {
            this.setPosition();
            this.setState({
                open: nextProps.open
            });
        }
    }

    renderPicker() {
        const { left, top, value } = this.state;
        let arrTime = [],
            hour,
            minute,
            second;
        if (value) {
            arrTime = value.split(":");
            hour = arrTime[0];
            minute = arrTime[1];
            second = arrTime[2];
        }
        return ReactDOM.createPortal(
            <div className={prefixCls} style={{ left, top }}>
                <TimePickerSelect
                    prefixCls={prefixCls}
                    data={this.getHours()}
                    value={hour}
                    type="hour"
                    onItemClick={this.handleItemClick}
                />
                <TimePickerSelect
                    prefixCls={prefixCls}
                    data={this.getMinutes()}
                    value={minute}
                    type="minute"
                    onItemClick={this.handleItemClick}
                />
                <TimePickerSelect
                    prefixCls={prefixCls}
                    data={this.getSeconds()}
                    value={second}
                    type="second"
                    onItemClick={this.handleItemClick}
                />
            </div>,
            document.body
        );
    }
    render() {
        const { value } = this.state;
        const { kSize } = this.props;
        return (
            <Empty>
                <Input
                    type="text"
                    ref="input"
                    kSize={kSize}
                    defaultValue={value}
                    onFocus={this.handleFocus}
                />
                {this.renderPicker()}
            </Empty>
        );
    }
}

export default TimePicker;
