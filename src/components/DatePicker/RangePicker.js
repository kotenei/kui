import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import pick from "object.pick";
import omit from "object.omit";
import Picker from "./Picker";
import Input from "../Input";
import {
    format as formatter,
    addMonths,
    month,
    addYears,
    isFirstDayOfMonth
} from "date-fns";
import PopPanel from "../PopPanel";
import { prefix } from "../../utils/kUtils";
import { getDiffMonth, getFirstDay, getLastDay } from "../../utils/dateUtils";
import Icon from "../Icon";
import Button from "../Button";

const prefixCls = "k-rangePicker";

class RangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            hoverDate: null,
            value: null,
            tmpValue: [new Date(), addMonths(new Date(), 1)],
            rangeDates: [],
            showPrevMonth: true,
            showPrevYear: true,
            showNextMonth: true,
            showNextYear: true
        };
    }
    static propTypes = {
        defaultValue: PropTypes.array,
        endPlaceholder: PropTypes.string,
        format: PropTypes.string,
        okText: PropTypes.string,
        separator: PropTypes.string,
        startPlaceholder: PropTypes.string,
        value: PropTypes.array,
        onClear: PropTypes.func,
        onChange: PropTypes.func
    };
    static defaultProps = {
        endPlaceholder: "结束日期",
        format: "YYYY-MM-DD",
        okText: "确定",
        separator: "-",
        startPlaceholder: "开始日期"
    };
    handleInputClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.open();
    };
    handleDayHover = (type, date) => {
        const { rangeDates } = this.state;
        if (!rangeDates || rangeDates.length == 0) {
            return;
        }
        if (type == "enter") {
            this.setState({
                hoverDate: date
            });
        } else {
            this.setState({
                hoverDate: null
            });
        }
    };
    handleClear = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const { onClear, onChange } = this.props;
        if (!("value" in this.props)) {
            this.setState(
                {
                    value: null,
                    tmpValue: [new Date(), addMonths(new Date(), 1)],
                    rangeDates: []
                },
                () => {
                    this.close();
                }
            );
        } else {
            this.close();
        }
        if (onClear) {
            onClear();
        }
        if (onChange) {
            onChange();
        }
    };
    handleOKClick = e => {
        const { onChange } = this.props;
        const { rangeDates } = this.state;
        if (onChange) {
            onChange(rangeDates);
        }

        this.close();
    };
    changeDate = (dateInfo, isStartPicker) => {
        const { showTime, onChange } = this.props;
        let tmpValue = [...this.state.tmpValue],
            rangeDates;

        switch (dateInfo.type) {
            case "month":
            case "year":
                tmpValue[isStartPicker ? 0 : 1] = dateInfo.date;
                if (getDiffMonth(tmpValue[0], tmpValue[1]) <= 0) {
                    if (isStartPicker) {
                        tmpValue[1] = addMonths(tmpValue[0], 1);
                    } else {
                        tmpValue[0] = addMonths(tmpValue[1], -1);
                    }
                }
                break;
            case "time":
                if (this.state.rangeDates) {
                    rangeDates = [...this.state.rangeDates];
                    let startDate = rangeDates[0],
                        endDate = rangeDates[1];
                    if (isStartPicker) {
                        rangeDates[0] = new Date(
                            startDate.getFullYear(),
                            startDate.getMonth(),
                            startDate.getDate(),
                            dateInfo.date.getHours(),
                            dateInfo.date.getMinutes(),
                            dateInfo.date.getSeconds()
                        );
                    } else {
                        rangeDates[1] = new Date(
                            endDate.getFullYear(),
                            endDate.getMonth(),
                            endDate.getDate(),
                            dateInfo.date.getHours(),
                            dateInfo.date.getMinutes(),
                            dateInfo.date.getSeconds()
                        );
                    }
                    if (
                        rangeDates.length == 2 &&
                        rangeDates[0].getTime() > rangeDates[1].getTime()
                    ) {
                        if (isStartPicker) {
                            rangeDates[1] = rangeDates[0];
                        } else {
                            rangeDates[0] = rangeDates[1];
                        }
                    }
                    this.setState({
                        rangeDates
                    });
                }
                break;
            default:
                rangeDates = this.setRangeDates(dateInfo.date);
                break;
        }

        if (rangeDates && rangeDates.length == 2 && onChange) {
            onChange(rangeDates);
        }

        this.setState(
            {
                tmpValue
            },
            () => {
                this.setArrow();
                if (rangeDates && rangeDates.length == 2 && !showTime) {
                    this.close();
                }
            }
        );
    };
    setPrevNextDate(type, date, isStartPicker, num) {
        const { tmpValue } = this.state;
        let newTmpValue = [...tmpValue];
        if (isStartPicker) {
            if (type == "year") {
                newTmpValue[0] = addYears(tmpValue[0], num);
            } else {
                newTmpValue[0] = addMonths(tmpValue[0], num);
            }
        } else {
            if (type == "year") {
                newTmpValue[1] = addYears(tmpValue[1], num);
            } else {
                newTmpValue[1] = addMonths(tmpValue[1], num);
            }
        }
        this.setState(
            {
                tmpValue: newTmpValue
            },
            () => {
                this.setArrow();
            }
        );
    }
    /**
     * 设置箭头
     */
    setArrow() {
        const { value, tmpValue } = this.state;
        let startDate = tmpValue[0],
            endDate = tmpValue[1],
            diff = getDiffMonth(startDate, endDate);
        if (diff <= 1) {
            this.setState({
                showPrevMonth: false,
                showPrevYear: false,
                showNextMonth: false,
                showNextYear: false
            });
        } else {
            this.setState({
                showPrevMonth: true,
                showPrevYear: true,
                showNextMonth: true,
                showNextYear: true
            });
        }
    }
    setRangeDates = date => {
        const { rangeDates } = this.state;
        let newRangeDates = [...rangeDates];

        if (rangeDates.length == 0 || rangeDates.length == 2) {
            newRangeDates = [date];
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
    open = () => {
        this.setState({
            open: true
        });
    };
    close = () => {
        if (!this.mounted) {
            return;
        }
        const { rangeDates } = this.state;
        if ("value" in this.props) {
            this.init();
        } else {
            if (!rangeDates || rangeDates.length <= 1) {
                this.setState({
                    rangeDates: this.state.value || []
                });
            } else {
                let tmpValue = [...rangeDates];
                let diff = getDiffMonth(rangeDates[0], rangeDates[1]);
                if (diff <= 0) {
                    tmpValue[1] = addMonths(tmpValue[0], 1);
                }
                this.setState(
                    {
                        tmpValue,
                        value: rangeDates
                    },
                    () => {
                        this.setArrow();
                    }
                );
            }
        }

        this.setState({
            open: false,
            hoverDate: null
        });
    };
    init(value = this.props.value || this.props.defaultValue) {
        let tmpValue = [new Date(), addMonths(new Date(), 1)];
        if (value) {
            value = [...value];
            if (value.length === 2) {
                let startDate = value[0],
                    endDate = value[1],
                    diff = getDiffMonth(startDate, endDate);
                tmpValue = [startDate, endDate];
                if (diff <= 0) {
                    tmpValue[1] = addMonths(endDate, 1);
                }
            }
        }
        this.setState(
            {
                value,
                tmpValue,
                rangeDates: value || []
            },
            () => {
                this.setArrow();
            }
        );
    }
    componentWillMount() {
        this.init();
    }
    componentDidMount() {
        this.mounted = true;
        document.addEventListener("click", this.close);
    }
    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps) {
            this.init(nextProps.value);
        }
    }
    componentWillUnmount() {
        this.mounted = false;
        document.removeEventListener("click", this.close);
    }
    render() {
        const {
            separator,
            kSize,
            format,
            showTime,
            okText,
            startPlaceholder,
            endPlaceholder,
            onFocus,
            onBlur
        } = this.props;
        const {
            open,
            value,
            hoverDate,
            tmpValue,
            rangeDates,
            showPrevMonth,
            showPrevYear,
            showNextMonth,
            showNextYear
        } = this.state;
        let pickerProps = pick(this.props, [
            "format",
            "showTime",
            "minDate",
            "maxDate"
        ]);
        let tmpStartDate = tmpValue[0],
            tmpEndDate = tmpValue[1];

        let input = (
            <div
                className={classnames({
                    [prefixCls]: true,
                    "k-form-control": true,
                    [`k-form-control-${kSize}`]: kSize
                })}
                onClick={this.handleInputClick}
            >
                <input
                    type="text"
                    className={`${prefixCls}-input`}
                    placeholder={startPlaceholder}
                    value={value && value[0] ? formatter(value[0], format) : ""}
                    onChange={() => {}}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <span className={`${prefixCls}-separator`}>{separator}</span>
                <input
                    type="text"
                    className={`${prefixCls}-input`}
                    placeholder={endPlaceholder}
                    value={value && value[1] ? formatter(value[1], format) : ""}
                    onChange={() => {}}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {rangeDates && rangeDates.length == 2 ? (
                    <Icon
                        className={`${prefixCls}-icon`}
                        style={{ cursor: "pointer" }}
                        type="close"
                        onClick={this.handleClear}
                    />
                ) : (
                    <Icon className={`${prefixCls}-icon`} type="calendar" />
                )}
            </div>
        );

        return (
            <PopPanel input={input} open={open}>
                <div className={`${prefixCls}-range-left`}>
                    <Picker
                        {...pickerProps}
                        range
                        rangeDates={rangeDates}
                        useRangeDatesIndex={0}
                        value={tmpStartDate}
                        hoverDate={hoverDate}
                        showNextMonth={showNextMonth}
                        showNextYear={showNextYear}
                        onDayHover={this.handleDayHover}
                        onChange={dateInfo => {
                            this.changeDate(dateInfo, true);
                        }}
                        onPrev={(type, date) => {
                            this.setPrevNextDate(type, date, true, -1);
                        }}
                        onNext={(type, date) => {
                            this.setPrevNextDate(type, date, true, 1);
                        }}
                    />
                </div>
                <div className={`${prefixCls}-range-right`}>
                    <Picker
                        {...pickerProps}
                        range
                        rangeDates={rangeDates}
                        useRangeDatesIndex={1}
                        value={tmpEndDate}
                        hoverDate={hoverDate}
                        showPrevMonth={showPrevMonth}
                        showPrevYear={showPrevYear}
                        onDayHover={this.handleDayHover}
                        onChange={dateInfo => {
                            this.changeDate(dateInfo, false);
                        }}
                        onPrev={(type, date) => {
                            this.setPrevNextDate(type, date, false, -1);
                        }}
                        onNext={(type, date) => {
                            this.setPrevNextDate(type, date, false, 1);
                        }}
                    />
                </div>
                {showTime ? (
                    <div className={`${prefixCls}-range-footer`}>
                        <Button
                            raised
                            kSize="sm"
                            kStyle="primary"
                            onClick={this.handleOKClick}
                        >
                            {okText}
                        </Button>
                    </div>
                ) : null}
            </PopPanel>
        );
    }
}

export default RangePicker;
