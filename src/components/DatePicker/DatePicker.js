import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { addYears, addMonths, setMonth } from "date-fns";
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
            view: props.view,
            tmpView: props.view,
            inputValue: "",
            date: props.defaultVallue || props.value || new Date(),
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
    handlePrevYearClick = e => {
        const { tmpDate } = this.state;
        this.setState({
            tmpDate: addYears(tmpDate, -1)
        });
    };
    /**
     * 点击下一年
     */
    handleNextYearClick = e => {
        const { tmpDate } = this.state;
        this.setState({
            tmpDate: addYears(tmpDate, 1)
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
        let tmpView = this.state.tmpView;
        if (tmpView == 0) {
            return;
        }
        if (tmpView <= 2) {
            tmpView--;
        } else {
            tmpView = 1;
        }
        tmpView = tmpView <= 0 ? 0 : tmpView;
        this.setState({
            tmpView
        });
    };
    /**
     * 月选择视力
     */
    handleMonthClick = e => {
        this.setState({
            tmpView: 2
        });
    };
    /**
     * 年选择
     */
    handleYearSelect = e => {};
    /**
     * 月选择
     */
    handleMonthSelect = month => {
        const { date } = this.state;
        const { view } = this.props;
        let newDate = setMonth(date, month);
        this.setState({
            date: newDate,
            tmpDate: newDate
        });
        if (view >= 3) {
            this.setState({
                tmpView: 3
            });
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
            tmpDate: this.state.date,
            tmpView: this.state.view
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
        const { view, tmpView } = this.state;
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
                                date={tmpDate}
                                view={tmpView}
                                onPrevYearClick={this.handlePrevYearClick}
                                onNextYearClick={this.handleNextYearClick}
                                onPrevMonthClick={this.handlePrevMonthClick}
                                onNextMonthClick={this.handleNextMonthClick}
                                onYearClick={this.handleYearClick}
                                onMonthClick={this.handleMonthClick}
                            />
                            <Body prefixCls={prefixCls}>
                                {tmpView <= 1 ? (
                                    <YearView
                                        prefixCls={prefixCls}
                                        view={tmpView}
                                        date={tmpDate}
                                    />
                                ) : null}
                                {tmpView == 2 ? (
                                    <MonthView
                                        prefixCls={prefixCls}
                                        data={tmpDate}
                                        onMonthSelect={this.handleMonthSelect}
                                    />
                                ) : null}
                                {tmpView == 3 ? (
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
