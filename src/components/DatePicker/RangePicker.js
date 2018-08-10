import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import pick from "object.pick";
import omit from "object.omit";
import Picker from "./Picker";
import Input from "../Input";
import { format as formatter, addMonths, month, addYears } from "date-fns";
import PopPanel from "../PopPanel";
import { prefix } from "../../utils/kUtils";
import { getDiffMonth } from "../../utils/dateUtils";
import Icon from "../Icon";

const prefixCls = "k-rangePicker";

class RangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            hoverDate: null,
            value: props.defaultValue || props.value,
            tmpValue: props.defaultValue ||
                props.value || [new Date(), addMonths(new Date(), 1)],
            rangeDates: props.defaultValue || props.value || [],
            showPrevMonth: true,
            showPrevYear: true,
            showNextMonth: true,
            showNextYear: true
        };
    }
    static propTypes = {
        defaultValue: PropTypes.array,
        separator: PropTypes.string,
        value: PropTypes.array
    };
    static defaultProps = {
        separator: "-"
    };
    handleClick = e => {
        this.open();
    };
    handleDayHover = (type, date) => {
        const { rangeDates } = this.props;
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
    changeDate = (dateInfo, isStartPicker) => {
        let tmpValue = [...this.state.tmpValue],
            rangeDates;
        switch (dateInfo.type) {
            case "month":
            case "year":
                tmpValue[isStartPicker ? 0 : 1] = dateInfo.date;

                break;
            default:
                rangeDates = this.setRangeDates(dateInfo.date);
                tmpValue[0] = rangeDates[0];
                if (rangeDates[1]) {
                    tmpValue[1] = rangeDates[1];
                }
                break;
        }
        if (getDiffMonth(tmpValue[0], tmpValue[1]) <= 0) {
            tmpValue[1] = addMonths(tmpValue[0], 1);
        }

        this.setState(
            {
                tmpValue
            },
            () => {
                this.setArrow();
                if (rangeDates && rangeDates.length == 2) {
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
        this.setState({
            open: false
        });
    };
    componentWillMount() {
        this.setArrow();
    }
    componentDidMount() {
        //document.addEventListener("click", this.close);
    }
    componentWillUnmount() {
        //document.removeEventListener("click", this.close);
    }
    render() {
        const { separator, kSize } = this.props;
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

        let input = (
            <div
                className={classnames({
                    [prefixCls]: true,
                    "k-form-control": true,
                    [`k-form-control-${kSize}`]: kSize
                })}
                onClick={this.handleClick}
            >
                <input type="text" className={`${prefixCls}-input`} />
                <span className={`${prefixCls}-separator`}>{separator}</span>
                <input type="text" className={`${prefixCls}-input`} />
                <Icon className={`${prefixCls}-icon`} type="calendar" />
            </div>
        );
        let pickerProps = pick(this.props, ["format", "showTime", "view"]);
        return (
            <PopPanel input={input} open={open}>
                <div className={`${prefixCls}-range-left`}>
                    <Picker
                        {...pickerProps}
                        rangeDates={rangeDates}
                        value={tmpValue[0]}
                        maxDate={tmpValue[1]}
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
                        rangeDates={rangeDates}
                        value={tmpValue[1]}
                        minDate={tmpValue[0]}
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
            </PopPanel>
        );
    }
}

export default RangePicker;
