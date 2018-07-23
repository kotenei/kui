import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { format } from "date-fns";
import TimePickerSelect from "./TimePickerSelect";
import Input from "../Input";
import Icon from "../Icon";
import Button from "../Button";
import { Empty, getPosition, FirstChild } from "../../utils";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import domUtils from "../../utils/domUtils";

const prefixCls = "k-timepicker";
const reg = /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})(\s(pm|am))?$/i;
let seed = 1;
let instances = {};

class TimePicker extends Component {
    constructor(props) {
        super(props);
        this.id = `tooltip_${seed++}`;
        instances[this.id] = this;
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
        hourStep: PropTypes.number,
        minuteStep: PropTypes.number,
        secondStep: PropTypes.number,
        open: PropTypes.bool,
        placeholder: PropTypes.string,
        use12Hours: PropTypes.bool,
        value: PropTypes.string,
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
        use12Hours: false
    };
    //文本框点击弹出时间选择
    handleClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (!("open" in this.props)) {
            this.open();
        }
    };
    //时间项点击
    handleItemClick = (type, val, index) => {
        this.change(type, val, index);
    };
    //时间项滚动
    handleItemScroll = (type, val, index) => {
        this.change(type, val, index);
    };
    //点击取消
    handleCancel = () => {
        const { onCancel } = this.props;
        const { value } = this.setState;
        this.tmpValue = value || "00:00:00";
        if (onCancel) {
            onCancel();
        }
        if (!("open" in this.props)) {
            this.close();
        }
    };
    //点击确定
    handleOK = () => {
        const { onOK } = this.props;
        let value = this.tmpValue;
        if (!("open" in this.props)) {
            this.close();
        }
        if (!("value" in this.props)) {
            this.setState({
                value
            });
        }
        if (onOK) {
            onOK(value);
        }
    };
    //清空值
    handleClear = () => {
        const { use12Hours, disabled } = this.props;
        if (disabled || "value" in this.props) {
            return;
        }
        this.tmpValue = "00:00:00";
        if (use12Hours) {
            this.tmpValue += " am";
        }
        this.setState({
            value: ""
        });
    };
    change(type, val, index) {
        const { use12Hours } = this.props;
        let arrTime = [],
            timeSlot;
        if (this.tmpValue) {
            let match = this.tmpValue.match(reg);
            arrTime.push(match[1], match[3], match[4]);
            timeSlot = match[6];
        }
        switch (type) {
            case "hour":
                arrTime[0] = val;
                break;
            case "minute":
                arrTime[1] = val;
                break;
            case "second":
                arrTime[2] = val;
                break;
            case "timeSlot":
                timeSlot = val;
                break;
            default:
                break;
        }
        this.tmpValue = arrTime.join(":");
        if (use12Hours && timeSlot) {
            this.tmpValue += " " + timeSlot;
        }
    }
    //定位
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
    //是否时间格式
    isTime(str) {
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
    //小时列表项
    getHours() {
        const { use12Hours, hourStep } = this.props;
        let hours = use12Hours ? 12 : 23;
        let data = [];
        for (let i = 0; i <= hours; i += hourStep) {
            data.push(String(i).padStart(2, "0"));
        }
        return data;
    }
    //分钟列表项
    getMinutes() {
        const { minuteStep } = this.props;
        let data = [];
        let minutes = 59;
        for (let i = 0; i <= minutes; i += minuteStep) {
            data.push(String(i).padStart(2, "0"));
        }
        return data;
    }
    //秒列表项
    getSeconds() {
        const { secondStep } = this.props;
        let data = [];
        let seconds = 59;
        for (let i = 0; i <= seconds; i += secondStep) {
            data.push(String(i).padStart(2, "0"));
        }
        return data;
    }
    //打开
    open = () => {
        const { disabled } = this.props;
        if (disabled) {
            return;
        }
        this.setPosition();
        this.setState({
            open: true
        });
        this.closeOther();
    };
    //关闭
    close = () => {
        const { disabled } = this.props;
        this.setState({
            open: false
        });
    };
    closeOther() {
        for (var k in instances) {
            if (k == this.id) {
                continue;
            }
            instances[k].close();
        }
    }
    componentWillMount() {
        let value = this.props.value || this.props.defaultValue;
        this.tmpValue = "00:00:00";
        if (this.props.use12Hours) {
            this.tmpValue += " am";
        }
        if (value && this.isTime(value)) {
            this.tmpValue = value;
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
        this.close();
        if (this.props.open === true) {
            this.open();
        }
        document.addEventListener("click", this.close);
        window.addEventListener("resize", this.setPosition);
    }
    componentWillReceiveProps(nextProps) {
        if ("open" in nextProps) {
            if (nextProps.open) {
                this.open();
            } else {
                this.close();
            }
        }
        if ("value" in nextProps && this.isTime(nextProps.value)) {
            this.tmpValue = nextProps.value;
            this.setState({
                value: nextProps.value
            });
        }
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.close);
        window.removeEventListener("resize", this.setPosition);
    }
    renderPicker() {
        const { cancelText, okText, use12Hours } = this.props;
        const { left, top, value, open } = this.state;
        let arrTime = [],
            hour,
            minute,
            second,
            timeSlot;
        if (value) {
            let match = value.match(reg);
            hour = match[1];
            minute = match[3];
            second = match[4];
            timeSlot = match[6];
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
                            onScroll={this.handleItemScroll}
                        />
                        <TimePickerSelect
                            prefixCls={prefixCls}
                            data={this.getMinutes()}
                            value={minute}
                            type="minute"
                            onItemClick={this.handleItemClick}
                            onScroll={this.handleItemScroll}
                        />
                        <TimePickerSelect
                            prefixCls={prefixCls}
                            data={this.getSeconds()}
                            value={second}
                            type="second"
                            onItemClick={this.handleItemClick}
                            onScroll={this.handleItemScroll}
                        />
                        {use12Hours ? (
                            <TimePickerSelect
                                prefixCls={prefixCls}
                                data={["am", "pm"]}
                                type="timeSlot"
                                value={timeSlot}
                                onItemClick={this.handleItemClick}
                                onScroll={this.handleItemScroll}
                            />
                        ) : null}
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
    renderSuffix() {
        const { suffix } = this.props;
        const { value, open } = this.state;
        if (value && open) {
            return (
                <Icon
                    type="close"
                    onClick={this.handleClear}
                    style={{ cursor: "pointer" }}
                />
            );
        }
        if (suffix) {
            return suffix;
        }
        return null;
    }
    render() {
        const { value } = this.state;
        const { kSize, disabled, placeholder } = this.props;
        return (
            <Empty>
                <Input
                    type="text"
                    ref="input"
                    kSize={kSize}
                    disabled={disabled}
                    value={value}
                    placeholder={placeholder}
                    onClick={this.handleClick}
                    suffix={this.renderSuffix()}
                    onChange={() => {}}
                />
                {this.renderPicker()}
            </Empty>
        );
    }
}

export default TimePicker;
