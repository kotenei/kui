import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { format } from "date-fns";
import TimePickerSelect from "./TimePickerSelect";
import Input from "../Input";
import Button from "../Button";
import { Empty, getPosition, FirstChild } from "../../utils";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import domUtils from "../../utils/domUtils";

const prefixCls = "k-timepicker";

class TimePicker extends Component {
    constructor(props) {
        super(props);
        this.tmpTime = [];
    }
    state = {
        value: "",
        open: true,
        left: -999,
        top: -999
    };
    static propTypes = {
        cancelText: PropTypes.string,
        okText: PropTypes.string,
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
        onChange: PropTypes.func,
        onCancel: PropTypes.func,
        onOK: PropTypes.func
    };
    static defaultProps = {
        cancelText: "取消",
        okText: "确定",
        format: "hh:mm:ss",
        hourStep: 1,
        minuteStep: 1,
        secondStep: 1,
        open: false,
        use12Hours: false
    };
    handleClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (!("show" in this.props)) {
            this.open();
        }
    };
    handleItemClick = (type, val, index) => {
        // const { value } = this.state;
        // if (value) {
        //     arrTime = value.split(":");
        // }
        // switch (type) {
        //     case "year":
        //         arrTime[0] = val;
        //         break;
        //     case "minute":
        //         arrTime[1] = val;
        //         break;
        //     case "second":
        //         arrTime[2] = val;
        //         break;
        //     default:
        //         break;
        // }
        // console.log(arrTime.toString());
    };
    handleCancel = () => {
        const { onCancel } = this.props;
        if (onCancel) {
            onCancel();
        }
        if (!("show" in this.props)) {
            this.close();
        }
    };
    handleOK = () => {
        const { onOK } = this.props;
        if (onOK) {
            onOK();
        }
        if (!("show" in this.props)) {
            this.close();
        }
    };
    setPosition = () => {
        let position = getPosition({
            trigger: this.refs.input,
            placement: "bottomLeft",
            ...this.orgSize
        });
        this.setState({
            left: position.left,
            top: position.top + 2
        });
    };
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
    open = () => {
        this.setPosition();
        this.setState({
            open: true
        });
    };
    close = () => {
        this.setState({
            open: false
        });
    };
    componentWillMount() {
        let value = this.props.value || this.props.defaultValue;
        if (value && this.isTime(value)) {
            this.setState({
                value
            });
        }
    }
    componentDidMount() {
        this.orgSize = {
            width: domUtils.width(this.refs.picker),
            height: domUtils.height(this.refs.picker)
        };
        if ("open" in this.props) {
            if (this.props.open) {
                this.show();
            } else {
                this.close();
            }
        }
        document.addEventListener("click", this.close);
        window.addEventListener("resize", this.setPosition);
    }
    componentWillReceiveProps(nextProps) {
        if ("open" in nextProps) {
            if (nextProps.open) {
                this.show();
            } else {
                this.close();
            }
        }
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.close);
        window.removeEventListener("resize", this.setPosition);
    }
    renderPicker() {
        const { cancelText, okText } = this.props;
        const { left, top, value, open } = this.state;
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

        let picker = open ? (
            <CSSTransition timeout={300} classNames="slide-down">
                <div
                    className={prefixCls}
                    style={{ left, top }}
                    ref="picker"
                    onClick={e => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                    }}
                >
                    <div className={`${prefixCls}-wrapper`}>
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
                    </div>
                    <div className={`${prefixCls}-bottom`}>
                        <Button
                            raised
                            kSize="sm"
                            style={{ marginRight: 10 }}
                            onClick={this.handleCancel}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            raised
                            kStyle="primary"
                            kSize="sm"
                            onClick={this.handleOK}
                        >
                            {okText}
                        </Button>
                    </div>
                </div>
            </CSSTransition>
        ) : null;

        return ReactDOM.createPortal(
            <TransitionGroup component={FirstChild}>{picker}</TransitionGroup>,
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
                    onClick={this.handleClick}
                />
                {this.renderPicker()}
            </Empty>
        );
    }
}

export default TimePicker;
