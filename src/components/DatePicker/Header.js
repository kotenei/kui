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
        onYearPrevClick: PropTypes.func,
        onYearNextClick: PropTypes.func,
        onMonthPrevClick: PropTypes.func,
        onMonthNextClick: PropTypes.func,
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
    handleYearPrevClick = e => {
        const { onYearPrevClick } = this.props;
        if (onYearPrevClick) {
            onYearPrevClick();
        }
    };
    handleYearNextClick = e => {
        const { onYearNextClick } = this.props;
        if (onYearNextClick) {
            onYearNextClick();
        }
    };
    handleMonthPrevClick = e => {
        const { onMonthPrevClick } = this.props;
        if (onMonthPrevClick) {
            onMonthPrevClick();
        }
    };
    handleMonthNextClick = e => {
        const { onMonthNextClick } = this.props;
        if (onMonthNextClick) {
            onMonthNextClick();
        }
    };
    handleYearClick = e => {};
    handleMonthClick = e => {};
    render() {
        const { prefixCls, date, lang } = this.props;
        return (
            <div className={`${prefixCls}-header`} onClick={this.handleClick}>
                <a onClick={this.handleYearPrevClick}>
                    <Icon
                        type="doubleleft"
                        className={`${prefixCls}-prev-button`}
                    />
                </a>
                <a onClick={this.handleMonthPrevClick}>
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
                <a onClick={this.handleMonthNextClick}>
                    <Icon type="right" className={`${prefixCls}-next-button`} />
                </a>
                <a onClick={this.handleYearNextClick}>
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
