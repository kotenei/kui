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
import { dates } from "../../utils/dateUtils";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import YearView from "./YearView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import TimePicker from "../TimePicker";

const prefixCls = "k-datepicker";
const CHANGE_TYPE = {
    year: "year",
    month: "month",
    day: "day",
    week: "week",
    time: "time",
    today: "today",
    confirm: "confirm"
};

class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curView: props.view,
            orgView: props.view,
            date: props.defaultValue || props.value,
            tmpDate: props.defaultValue || props.value || new Date(),
            rangeDates: props.rangeDates
        };
    }
    static propTypes = {
        disabled: PropTypes.bool,
        defaultValue: PropTypes.object,
        footerExtra: PropTypes.node,
        format: PropTypes.string,
        lang: PropTypes.string,
        minDate: PropTypes.object,
        maxDate: PropTypes.object,
        okText: PropTypes.string,
        range: PropTypes.bool,
        rangeDates: PropTypes.array,
        showPrevYear: PropTypes.bool,
        showPrevMonth: PropTypes.bool,
        showNextYear: PropTypes.bool,
        showNextMonth: PropTypes.bool,
        showToday: PropTypes.bool,
        showTime: PropTypes.bool,
        showWeek: PropTypes.bool,
        useRangeDatesIndex: PropTypes.number,
        value: PropTypes.object,
        view: PropTypes.oneOf([0, 1, 2]), //0:年，1:月，2:日
        onChange: PropTypes.func,
        onPrev: PropTypes.func,
        onNext: PropTypes.func
    };
    static defaultProps = {
        disabled: false,
        format: "YYYY-MM-DD",
        lang: "zh-cn",
        okText: "确定",
        rnage: false,
        showPrevYear: true,
        showPrevMonth: true,
        showNextYear: true,
        showNextMonth: true,
        showToday: false,
        showTime: false,
        showWeek: false,
        useRangeDatesIndex: 0,
        view: 2
    };
    /**
     * 点击上一年
     */
    handlePrevYearClick = e => {
        const { onPrev } = this.props;
        const { tmpDate, curView } = this.state;
        let newDate;
        if (curView == 0) {
            newDate = addYears(tmpDate, -10);
        } else {
            newDate = addYears(tmpDate, -1);
        }
        this.setState({
            tmpDate: newDate
        });
        if (onPrev) {
            onPrev("year", newDate);
        }
    };
    /**
     * 点击下一年
     */
    handleNextYearClick = e => {
        const { onNext } = this.props;
        const { tmpDate, curView } = this.state;
        let newDate;
        if (curView == 0) {
            newDate = addYears(tmpDate, 10);
        } else {
            newDate = addYears(tmpDate, 1);
        }
        this.setState({
            tmpDate: newDate
        });
        if (onNext) {
            onNext("year", newDate);
        }
    };
    /**
     * 点击上个月
     */
    handlePrevMonthClick = e => {
        const { onPrev } = this.props;
        const { tmpDate } = this.state;
        let newDate = addMonths(tmpDate, -1);
        this.setState({
            tmpDate: newDate
        });
        if (onPrev) {
            onPrev("month", newDate);
        }
    };
    /**
     * 点击下个月
     */
    handleNextMonthClick = e => {
        const { onNext } = this.props;
        const { tmpDate } = this.state;
        let newDate = addMonths(tmpDate, 1);
        this.setState({
            tmpDate: newDate
        });
        if (onNext) {
            onNext("month", newDate);
        }
    };
    /**
     * 年视图
     */
    handleYearClick = e => {
        this.setState({
            curView: 0,
            orgView: this.state.curView
        });
    };
    /**
     * 月视图
     */
    handleMonthClick = e => {
        this.setState({
            curView: 1,
            orgView: this.state.curView
        });
    };
    /**
     * 年选择
     */
    handleYearSelect = year => {
        const { curView, tmpDate, orgView } = this.state;
        const { view, onChange } = this.props;
        let newDate = setYear(tmpDate, year);
        this.setState({
            tmpDate: newDate,
            curView: orgView
        });
        if (view == 0) {
            if (!("value" in this.props)) {
                this.setState({
                    date: newDate
                });
            }
        }
        if (onChange) {
            onChange({
                type: CHANGE_TYPE.year,
                date: newDate,
                canClose: view == 0
            });
        }
    };
    /**
     * 月选择
     */
    handleMonthSelect = month => {
        const { tmpDate } = this.state;
        const { view, onChange } = this.props;
        let newDate = setMonth(tmpDate, month);
        this.setState({
            tmpDate: newDate,
            curView: view
        });
        if (view == 1) {
            if (!("value" in this.props)) {
                this.setState({
                    date: newDate
                });
            }
        }
        if (onChange) {
            onChange({
                type: CHANGE_TYPE.month,
                date: newDate,
                canClose: view == 1
            });
        }
    };
    /**
     * 日选择
     */
    handleDaySelect = date => {
        const { view, onChange, showTime } = this.props;
        const { rangeDates } = this.state;
        let canSetDate = !rangeDates || (rangeDates && rangeDates.length == 0),
            newRangeDates;
        if (this.state.date) {
            let time = formatter(this.state.date, "HH:mm:ss");
            date = new Date(formatter(date, "YYYY-MM-DD") + " " + time);
        }
        this.setRangeDates(date);
        if (canSetDate) {
            this.setState({
                tmpDate: date
            });
        }
        if (view == 2) {
            if (!("value" in this.props) && canSetDate) {
                this.setState({
                    date
                });
            }
        }
        if (onChange) {
            onChange({
                type: CHANGE_TYPE.day,
                date,
                canClose:
                    view == 2 &&
                    ((!showTime && !rangeDates) ||
                        (rangeDates && rangeDates.length == 2))
            });
        }
    };
    /**
     * 周选择
     */
    handleWeekSelect = date => {
        const { view, minDate, maxDate, onChange } = this.props;
        let startDate = date[0],
            endDate = date[6],
            min = minDate ? formatter(minDate, "YYYYMMDD") : null,
            max = maxDate ? formatter(maxDate, "YYYYMMDD") : null,
            end = formatter(endDate, "YYYYMMDD");
        if ((min && end < min) || (max && end > max)) {
            return;
        }
        this.setState({
            tmpDate: startDate
        });
        if (!("value" in this.props)) {
            this.setState({
                date: startDate
            });
        }
        if (onChange) {
            onChange({
                type: CHANGE_TYPE.week,
                date,
                canClose: true
            });
        }
    };
    /**
     * 时间文件框点击
     */
    handleTimeClick = () => {
        const { date } = this.state;
        const { onChange } = this.props;
        if (!date) {
            let newDate = new Date();
            this.setState({
                tmpDate: newDate
            });
            if (!("value" in this.props)) {
                this.setState({
                    date: newDate
                });
            }
            if (onChange) {
                onChange({
                    type: CHANGE_TYPE.time,
                    date: newDate,
                    canClose: false
                });
            }
        }
    };
    /**
     * 时间选择
     */
    handleTimeOK = time => {
        const { date, tmpDate } = this.state;
        const { onChange } = this.props;
        let strDate = formatter(tmpDate, "YYYY-MM-DD") + " " + time;
        let newDate = new Date(strDate);
        this.setState({
            tmpDate: newDate
        });
        if (!("value" in this.props)) {
            this.setState({
                date: newDate
            });
        }
        if (onChange) {
            onChange({
                type: CHANGE_TYPE.time,
                date: newDate,
                canClose: false
            });
        }
    };
    /**
     * 今天选择
     */
    handleTodayClick = e => {
        const { value, onChange } = this.props;
        let date = new Date();
        this.setState({
            date: "value" in this.props ? value : date,
            tmpDate: date
        });
        if (onChange) {
            onChange({
                type: CHANGE_TYPE.today,
                date: date,
                canClose: true
            });
        }
    };
    /**
     * 点击确定
     */
    handleOKClick = e => {
        const { date } = this.state;
        const { value, onChange } = this.props;
        if (date) {
            if (onChange) {
                onChange({
                    date,
                    canClose: true
                });
            }
        } else {
            let newDate = new Date();
            this.setState({
                date: "value" in this.props ? value : newDate,
                tmpDate: newDate
            });
            if (onChange) {
                onChange({
                    type: CHANGE_TYPE.confirm,
                    date: newDate,
                    canClose: true
                });
            }
        }
    };
    setRangeDates = date => {
        const { range, rangeDates } = this.state;
        if (!range || "rangeDates" in this.props) return;
        let newRangeDates =
            rangeDates && rangeDates.length < 2 ? [...rangeDates] : [];

        if (newRangeDates.length == 0) {
            newRangeDates.push(date);
        } else {
            if (rangeDates[0].getTime() < date.getTime()) {
                newRangeDates.push(date);
            } else {
                newRangeDates.splice(0, 0, date);
            }
        }
        this.setState({
            rangeDates: newRangeDates
        });
        return newRangeDates;
    };
    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps) {
            this.setState({
                date: nextProps.value,
                tmpDate: nextProps.value
            });
        }
        if ("rangeDates" in nextProps) {
            this.setState({
                rangeDates: nextProps.rangeDates
            });
        }

        this.setState({
            curView: nextProps.view
        });
    }
    render() {
        const {
            footerExtra,
            hoverDate,
            minDate,
            maxDate,
            lang,
            okText,
            showToday,
            showTime,
            showWeek,
            showPrevMonth,
            showPrevYear,
            showNextMonth,
            showNextYear,
            useRangeDatesIndex,
            onDayHover
        } = this.props;
        const { tmpDate, curView, date, rangeDates } = this.state;
        let newMinDate = minDate,
            newMaxDate = maxDate,
            dateTime = date,
            dateTimeDisabled = false;
        if (minDate && maxDate && minDate.getTime() > maxDate.getTime()) {
            newMaxDate = minDate();
        }

        if (rangeDates) {
            dateTime = null;
            dateTimeDisabled = true;
            if (rangeDates.length == 2) {
                dateTime = rangeDates[useRangeDatesIndex];
                dateTimeDisabled = false;
            }
        }

        console.log(tmpDate)

        return (
            <div className={prefixCls} onClick={this.handlePickerClick}>
                {showTime ? (
                    <div className={`${prefixCls}-time-header`}>
                        <div>
                            <Input
                                kSize="sm"
                                value={
                                    dateTime
                                        ? formatter(dateTime, "YYYY-MM-DD")
                                        : ""
                                }
                                disabled={dateTimeDisabled}
                                onChange={() => {}}
                            />
                        </div>
                        <div>
                            <TimePicker
                                kSize="sm"
                                value={
                                    dateTime
                                        ? formatter(dateTime, "HH:mm:ss")
                                        : ""
                                }
                                disabled={dateTimeDisabled}
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
                    view={curView}
                    showPrevMonth={showPrevMonth}
                    showPrevYear={showPrevYear}
                    showNextMonth={showNextMonth}
                    showNextYear={showNextYear}
                    onPrevYearClick={this.handlePrevYearClick}
                    onNextYearClick={this.handleNextYearClick}
                    onPrevMonthClick={this.handlePrevMonthClick}
                    onNextMonthClick={this.handleNextMonthClick}
                    onYearClick={this.handleYearClick}
                    onMonthClick={this.handleMonthClick}
                />
                <Body prefixCls={prefixCls}>
                    {curView == 0 ? (
                        <YearView
                            prefixCls={prefixCls}
                            lang={lang}
                            view={curView}
                            date={tmpDate}
                            minDate={newMinDate}
                            maxDate={newMaxDate}
                            onYearSelect={this.handleYearSelect}
                        />
                    ) : null}
                    {curView == 1 ? (
                        <MonthView
                            prefixCls={prefixCls}
                            lang={lang}
                            date={tmpDate}
                            minDate={newMinDate}
                            maxDate={newMaxDate}
                            onMonthSelect={this.handleMonthSelect}
                        />
                    ) : null}
                    {curView >= 2 ? (
                        <DayView
                            prefixCls={prefixCls}
                            lang={lang}
                            date={tmpDate}
                            hoverDate={hoverDate}
                            minDate={newMinDate}
                            maxDate={newMaxDate}
                            selected={date}
                            rangeDates={rangeDates}
                            week={showWeek}
                            onDaySelect={this.handleDaySelect}
                            onDayHover={onDayHover}
                            onWeekSelect={this.handleWeekSelect}
                        />
                    ) : null}
                </Body>
                <Footer prefixCls={prefixCls}>
                    {curView == 2 && showToday ? (
                        <div style={{ textAlign: "center" }}>
                            <a
                                className={`${prefixCls}-today-btn`}
                                onClick={this.handleTodayClick}
                            >
                                {dates[lang].today}
                            </a>
                        </div>
                    ) : null}
                    {showTime && !rangeDates ? (
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
                    {footerExtra}
                </Footer>
            </div>
        );
    }
}

export default Picker;
