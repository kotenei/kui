import React, { Component } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Icon from "../Icon";
import { prefix } from "../../utils/kUtils";
import { dates } from "../../utils/dateUtils";

class Header extends Component {
    static propTypes = {
        date: PropTypes.object,
        lang: PropTypes.string,
        onPrevYearClick: PropTypes.func,
        onNextYearClick: PropTypes.func,
        onPrevMonthClick: PropTypes.func,
        onNextMonthClick: PropTypes.func,
        onYearClick: PropTypes.func,
        onMonthClick: PropTypes.func
    };
    static defaultProps = {
        date: new Date(),
        lang: "zh-cn"
    };
    handleClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };
    handlePrevYearClick = e => {
        const { onPrevYearClick } = this.props;
        if (onPrevYearClick) {
            onPrevYearClick();
        }
    };
    handleNextYearClick = e => {
        const { onNextYearClick } = this.props;
        if (onNextYearClick) {
            onNextYearClick();
        }
    };
    handlePrevMonthClick = e => {
        const { onPrevMonthClick } = this.props;
        if (onPrevMonthClick) {
            onPrevMonthClick();
        }
    };
    handleNextMonthClick = e => {
        const { onNextMonthClick } = this.props;
        if (onNextMonthClick) {
            onNextMonthClick();
        }
    };
    handleYearClick = e => {
        const { onYearClick } = this.props;
        if (onYearClick) {
            onYearClick();
        }
    };
    handleMonthClick = e => {
        const { onMonthClick } = this.props;
        if (onMonthClick) {
            onMonthClick();
        }
    };
    render() {
        const { prefixCls, date, lang } = this.props;
        return (
            <div className={`${prefixCls}-header`} onClick={this.handleClick}>
                <a onClick={this.handlePrevYearClick}>
                    <Icon
                        type="doubleleft"
                        className={`${prefixCls}-prev-button`}
                    />
                </a>
                <a onClick={this.handlePrevMonthClick}>
                    <Icon type="left" className={`${prefixCls}-prev-button`} />
                </a>
                <span className={`${prefixCls}-header-select`}>
                    <span className={`${prefixCls}-header-select-year`}>
                        <a onClick={this.handleYearClick}>
                            {date.getFullYear()}
                            {lang == "zh-cn" ? "年" : ""}
                        </a>
                    </span>
                    <span className={`${prefixCls}-header-select-month`}>
                        <a onClick={this.handleMonthClick}>
                            {lang == "zh-cn"
                                ? `${date.getMonth() + 1}月`
                                : format(date, "MMMM")}
                        </a>
                    </span>
                </span>
                <a onClick={this.handleNextMonthClick}>
                    <Icon type="right" className={`${prefixCls}-next-button`} />
                </a>
                <a onClick={this.handleNextYearClick}>
                    <Icon
                        type="doubleright"
                        className={`${prefixCls}-next-button`}
                    />
                </a>
            </div>
        );
    }
}

export default Header;
