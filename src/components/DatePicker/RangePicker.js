import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import pick from "object.pick";
import omit from "object.omit";
import Picker from "./Picker";
import Input from "../Input";
import { format as formatter, addMonths, month } from "date-fns";
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
            value: props.defaultValue || props.value,
            tmpValue: props.defaultValue || props.value,
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
    handleChange = obj => {};
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
    setArrow() {
        const { value } = this.state;
        let startDate = new Date(),
            endDate = addMonths(startDate, 2),
            diff;
        if (value && value.length > 0) {
            startDate = value[0];
            endDate = value[1];
        }
        diff = getDiffMonth(startDate, endDate);
        if (diff <= 1) {
            this.setState({
                showPrevMonth: false,
                showPrevYear: false,
                showNextMonth: false,
                showNextYear: false
            });
        }
    }
    componentWillMount() {
        this.setArrow();
    }
    componentDidMount() {
        document.addEventListener("click", this.close);
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.close);
    }
    render() {
        const { separator, kSize } = this.props;
        const {
            open,
            value,
            showPrevMonth,
            showPrevYear,
            showNextMonth,
            showNextYear
        } = this.state;
        let startValue, endValue;
        if (!value || value.length == 0) {
        }

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
                        showNextMonth={showNextMonth}
                        showNextYear={showNextYear}
                    />
                </div>
                <div className={`${prefixCls}-range-right`}>
                    <Picker
                        {...pickerProps}
                        showPrevMonth={showPrevMonth}
                        showPrevYear={showPrevYear}
                    />
                </div>
            </PopPanel>
        );
    }
}

export default RangePicker;
