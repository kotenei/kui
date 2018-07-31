import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
    addYears,
    addMonths,
    setMonth,
    format as formatter,
    setYear
} from "date-fns";
import Input from "../Input";
import Button from "../Button";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Empty, getPosition, FirstChild } from "../../utils";
import { dates } from "../../utils/dateUtils";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import YearView from "./YearView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import TimePicker from "../TimePicker";
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
            view: props.view,
            tmpView: props.view,
            date: props.defaultValue || props.value,
            tmpDate: props.defaultValue || props.value || new Date()
        };
        this.id = `tooltip_${seed++}`;
        instances[this.id] = this;
    }
    static propTypes = {
        type: PropTypes.arrayOf(["year", "month", "week", "date", "dateTime"]),
        disabled: PropTypes.bool,
        defaultValue: PropTypes.object,
        format: PropTypes.string,
        lang: PropTypes.string,
        minDate: PropTypes.object,
        maxDate: PropTypes.object,
        okText: PropTypes.string,
        open: PropTypes.bool,
        today: PropTypes.bool,
        value: PropTypes.object,
        view: PropTypes.oneOf([0, 1, 2, 3]) //0:年，1:月，2:日  3:时间
    };
    static defaultProps = {
        disabled: false,
        format: "YYYY-MM-DD",
        lang: "zh-cn",
        okText: "确定",
        today: false,
        view: 2
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
    handlePrevYearClick = e => {
        const { tmpDate, tmpView } = this.state;
        let newDate;
        if (tmpView == 0) {
            newDate = addYears(tmpDate, -10);
        } else {
            newDate = addYears(tmpDate, -1);
        }
        this.setState({
            tmpDate: newDate
        });
    };
    /**
     * 点击下一年
     */
    handleNextYearClick = e => {
        const { tmpDate, tmpView } = this.state;
        let newDate;
        if (tmpView == 0) {
            newDate = addYears(tmpDate, 10);
        } else {
            newDate = addYears(tmpDate, 1);
        }
        this.setState({
            tmpDate: newDate
        });
    };
    /**
     * 点击上个月
     */
    handlePrevMonthClick = e => {
        const { tmpDate } = this.state;
        this.setState({
            tmpDate: addMonths(tmpDate, -1)
        });
    };
    /**
     * 点击下个月
     */
    handleNextMonthClick = e => {
        const { tmpDate } = this.state;
        this.setState({
            tmpDate: addMonths(tmpDate, 1)
        });
    };
    /**
     * 年选择视图
     */
    handleYearClick = e => {
        this.setState({
            tmpView: 0
        });
    };
    /**
     * 月选择视力
     */
    handleMonthClick = e => {
        this.setState({
            tmpView: 1
        });
    };
    /**
     * 年选择
     */
    handleYearSelect = year => {
        const { tmpView, tmpDate } = this.state;
        const { view } = this.props;
        let newDate = setYear(tmpDate, year);
        this.setState({
            tmpDate: newDate,
            tmpView: view >= 1 ? 1 : view
        });
        if (view == 0 && !("value" in this.props)) {
            this.setState(
                {
                    date: newDate
                },
                () => {
                    this.close();
                }
            );
        }
    };
    /**
     * 月选择
     */
    handleMonthSelect = month => {
        const { tmpDate } = this.state;
        const { view } = this.props;
        let newDate = setMonth(tmpDate, month);
        this.setState({
            tmpDate: newDate,
            tmpView: view
        });
        if (view == 1 && !("value" in this.props)) {
            this.setState(
                {
                    date: newDate
                },
                () => {
                    this.close();
                }
            );
        }
    };
    /**
     * 日选择
     */
    handleDaySelect = date => {
        const { view } = this.props;
        if (this.state.date) {
            let time = formatter(this.state.date, "HH:mm:ss");
            date = new Date(formatter(date, "YYYY-MM-DD") + " " + time);
        }
        this.setState({
            tmpDate: date
        });
        if (view >= 2 && !("value" in this.props)) {
            this.setState(
                {
                    date
                },
                () => {
                    if (view == 2) {
                        this.close();
                    }
                }
            );
        }
    };
    /**
     * 时间文件框点击
     */
    handleTimeClick = () => {
        const { date } = this.state;
        if (!date) {
            let newDate = new Date();
            this.setState({
                tmpDate: newDate
            });
            if (!"value" in this.props) {
                this.setState({
                    date: newDate
                });
            }
        }
    };
    /**
     * 时间选择
     */
    handleTimeOK = time => {
        const { date, tmpDate } = this.state;
        let strDate = formatter(tmpDate, "YYYY-MM-DD") + " " + time;
        let newDate = new Date(strDate);
        this.setState({
            tmpDate: newDate
        });
        if (!"value" in this.props) {
            this.setState({
                date: newDate
            });
        }
    };
    /**
     * 今天选择
     */
    handleTodayClick = e => {
        const { value } = this.props;
        let date = new Date();
        this.setState(
            {
                date: "value" in this.props ? value : date,
                tmpDate: date
            },
            () => {
                this.close();
            }
        );
    };
    /**
     * 点击确定
     */
    handleOKClick = e => {
        const { date } = this.state;
        const { value } = this.props;
        if (date) {
            this.close();
        } else {
            let newDate = new Date();
            this.setState(
                {
                    date: "value" in this.props ? value : newDate,
                    tmpDate: newDate
                },
                () => {
                    this.close();
                }
            );
        }
    };
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
            open: false,
            tmpDate: this.state.date || new Date(),
            tmpView: this.props.view
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
        delete instances[this.id];
    }
    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps) {
            this.setState({
                date: nextProps.value,
                tmpDate: nextProps.value
            });
        }
        this.setState({
            tmpView: nextProps.view
        });
    }
    renderPicker() {
        const { minDate, maxDate, lang, view, okText } = this.props;
        const { open, position, tmpDate, tmpView, date } = this.state;
        return ReactDOM.createPortal(
            <TransitionGroup component={FirstChild}>
                {open ? (
                    <CSSTransition timeout={300} classNames="slide-down">
                        <div
                            className={prefixCls}
                            style={position}
                            onClick={this.handlePickerClick}
                        >
                            {view == 3 ? (
                                <div className={`${prefixCls}-time-header`}>
                                    <div>
                                        <Input
                                            kSize="sm"
                                            value={
                                                date
                                                    ? formatter(
                                                          date,
                                                          "YYYY-MM-DD"
                                                      )
                                                    : ""
                                            }
                                            onChange={() => {}}
                                        />
                                    </div>
                                    <div>
                                        <TimePicker
                                            kSize="sm"
                                            value={formatter(date, "HH:mm:ss")}
                                            showClearIcon={false}
                                            onClick={this.handleTimeClick}
                                            onOK={this.handleTimeOK}
                                        />
                                    </div>
                                </div>
                            ) : null}
                            <Header
                                prefixCls={prefixCls}
                                date={tmpDate}
                                lang={lang}
                                view={tmpView}
                                onPrevYearClick={this.handlePrevYearClick}
                                onNextYearClick={this.handleNextYearClick}
                                onPrevMonthClick={this.handlePrevMonthClick}
                                onNextMonthClick={this.handleNextMonthClick}
                                onYearClick={this.handleYearClick}
                                onMonthClick={this.handleMonthClick}
                            />
                            <Body prefixCls={prefixCls}>
                                {tmpView == 0 ? (
                                    <YearView
                                        prefixCls={prefixCls}
                                        lang={lang}
                                        view={tmpView}
                                        date={tmpDate}
                                        onYearSelect={this.handleYearSelect}
                                    />
                                ) : null}
                                {tmpView == 1 ? (
                                    <MonthView
                                        prefixCls={prefixCls}
                                        lang={lang}
                                        date={tmpDate}
                                        onMonthSelect={this.handleMonthSelect}
                                    />
                                ) : null}
                                {tmpView >= 2 ? (
                                    <DayView
                                        prefixCls={prefixCls}
                                        lang={lang}
                                        date={tmpDate}
                                        selected={date}
                                        onDaySelect={this.handleDaySelect}
                                    />
                                ) : null}
                            </Body>
                            <Footer prefixCls={prefixCls}>
                                {tmpView == 2 ? (
                                    <div style={{ textAlign: "center" }}>
                                        <a
                                            className={`${prefixCls}-today-btn`}
                                            onClick={this.handleTodayClick}
                                        >
                                            {dates[lang].today}
                                        </a>
                                    </div>
                                ) : null}
                                {tmpView == 3 ? (
                                    <div style={{ textAlign: "right" }}>
                                        <a
                                            className={`${prefixCls}-now-btn`}
                                            onClick={this.handleTodayClick}
                                        >
                                            {dates[lang].now}
                                        </a>
                                        <Button
                                            raised
                                            kSize="sm"
                                            kStyle={"primary"}
                                            onClick={this.handleOKClick}
                                        >
                                            {okText}
                                        </Button>
                                    </div>
                                ) : null}
                            </Footer>
                        </div>
                    </CSSTransition>
                ) : null}
            </TransitionGroup>,
            document.body
        );
    }
    render() {
        const { kSize, disabled, placeholder, format } = this.props;
        const { position, value, date } = this.state;
        return (
            <Empty>
                <Input
                    type="text"
                    ref="input"
                    kSize={kSize}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={date ? formatter(date, format) : " "}
                    onClick={this.handleInputClick}
                    onChange={() => {}}
                />
                {this.renderPicker()}
            </Empty>
        );
    }
}

export default DatePicker;
