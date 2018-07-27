import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Input from "../Input";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Empty, getPosition, FirstChild } from "../../utils";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import YearView from "./YearView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import domUtils from "../../utils/domUtils";

const prefixCls = "k-datepicker";
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
            view: 0,
            inputValue: "",
            tmpDate: props.defaultVallue || props.value || new Date()
        };
        this.id = `tooltip_${seed++}`;
        instances[this.id] = this;
    }
    static propTypes = {
        type: PropTypes.arrayOf(["year", "month", "week", "date", "dateTime"]),
        disabled: PropTypes.bool,
        defaultValue: PropTypes.object,
        format: PropTypes.string,
        open: PropTypes.bool,
        value: PropTypes.object,
        view: PropTypes.oneOf([0, 1, 2, 3]) //0-1:年，2:月，3:日
    };
    static defaultProps = {
        disabled: false,
        format: "YYYY-MM-DD",
        view: 3
    };
    /**
     * 文本框点击事件
     *
     */
    handleInputClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (!("open" in this.props)) {
            this.open();
        }
    };
    /**
     * 选择器点击事件
     */
    handlePickerClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };
    /**
     * 点击上一年
     */
    handleYearPrevClick = e => {
        // const { onYearPrevClick } = this.props;
        // if (onYearPrevClick) {
        //     onYearPrevClick();
        // }
    };
    /**
     * 点击下一年
     */
    handleYearNextClick = e => {
        // const { onYearNextClick } = this.props;
        // if (onYearNextClick) {
        //     onYearNextClick();
        // }
    };
    /**
     * 点击上个月
     */
    handleMonthPrevClick = e => {
        // const { onMonthPrevClick } = this.props;
        // if (onMonthPrevClick) {
        //     onMonthPrevClick();
        // }
    };
    /**
     * 点击下个月
     */
    handleMonthNextClick = e => {
        // const { onMonthNextClick } = this.props;
        // if (onMonthNextClick) {
        //     onMonthNextClick();
        // }
    };
    /**
     * 点击年份选择
     */
    handleYearClick = e => {};
    /**
     * 点击月份选择
     */
    handleMonthClick = e => {};
    //定位
    setPosition = () => {
        let position = getPosition({
            trigger: this.refs.input,
            placement: "bottomLeft",
            ...this.orgSize
        });
        position.top += 2;
        this.setState({
            position
        });
    };
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
    //关闭其它
    closeOther() {
        for (var k in instances) {
            if (k == this.id) {
                continue;
            }
            instances[k].close();
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
    componentWillUnmount() {
        document.removeEventListener("click", this.close);
        window.removeEventListener("resize", this.setPosition);
    }
    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps) {
            this.setState({
                tmpDate: nextProps.value
            });
        }
    }
    renderPicker() {
        const { open, position, tmpDate } = this.state;
        const { view } = this.props;
        return ReactDOM.createPortal(
            <TransitionGroup component={FirstChild}>
                {open ? (
                    <CSSTransition timeout={300} classNames="slide-down">
                        <div
                            className={prefixCls}
                            style={position}
                            onClick={this.handlePickerClick}
                        >
                            <Header
                                prefixCls={prefixCls}
                                onYearPrevClick={this.handleYearNextClick}
                                onYearNextClick={this.handleYearNextClick}
                                onMonthPrevClick={this.handleMonthPrevClick}
                                onMonthNextClick={this.handleMonthNextClick}
                                onYearClick={this.handleYearClick}
                                onMonthClick={this.handleMonthClick}
                            />
                            <Body prefixCls={prefixCls}>
                                {view <= 1 ? (
                                    <YearView
                                        prefixCls={prefixCls}
                                        view={view}
                                        date={tmpDate}
                                    />
                                ) : null}
                                {view == 2 ? (
                                    <MonthView
                                        prefixCls={prefixCls}
                                        data={tmpDate}
                                    />
                                ) : null}
                                {view == 3 ? (
                                    <DayView
                                        prefixCls={prefixCls}
                                        date={tmpDate}
                                    />
                                ) : null}
                            </Body>
                            <Footer prefixCls={prefixCls} />
                        </div>
                    </CSSTransition>
                ) : null}
            </TransitionGroup>,
            document.body
        );
    }
    render() {
        const { kSize, disabled, placeholder } = this.props;
        const { position, value } = this.state;
        return (
            <Empty>
                <Input
                    type="text"
                    ref="input"
                    kSize={kSize}
                    disabled={disabled}
                    placeholder={placeholder}
                    onClick={this.handleInputClick}
                />
                {this.renderPicker()}
            </Empty>
        );
    }
}

export default DatePicker;
