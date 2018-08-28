import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import Button from "../Button";
import { dates } from "../../utils/dateUtils";

class YearView extends Component {
    static propsTypes = {
        lang: PropTypes.string,
        prefixCls: PropTypes.string,
        date: PropTypes.object,
        view: PropTypes.number,
        onPrevNextClick: PropTypes.func,
        onTodayClick: PropTypes.func,
        onViewClick: PropTypes.func
    };
    static defaultProps = {
        lang: "zh-cn",
        prefixCls: "k-calendar",
        date: new Date(),
        view: 1
    };
    handlePrevNextClick = type => {
        const { onPrevNextClick } = this.props;
        if (onPrevNextClick) {
            onPrevNextClick(type);
        }
    };
    handleTodayClick = () => {
        const { onTodayClick } = this.props;
        if (onTodayClick) {
            onTodayClick();
        }
    };
    handleViewClick = view => {
        const { onViewClick } = this.props;
        if (onViewClick) {
            onViewClick(view);
        }
    };
    render() {
        const { prefixCls, lang, view, date } = this.props;
        return (
            <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-header-left`}>
                    <Button.Group>
                        <Button
                            raised
                            onClick={this.handlePrevNextClick.bind(
                                this,
                                "prev"
                            )}
                        >
                            <Icon type="left" />
                        </Button>
                        <Button
                            raised
                            onClick={this.handlePrevNextClick.bind(
                                this,
                                "next"
                            )}
                        >
                            <Icon type="right" />
                        </Button>
                    </Button.Group>
                    &nbsp;
                    <Button raised onClick={this.handleTodayClick}>
                        {dates[lang].today}
                    </Button>
                </div>
                <div className={`${prefixCls}-header-middle`}>
                    <span>
                        {date.getFullYear()}
                        {lang == "zh-cn" && view >= 0 ? "年" : ""}
                        {view >= 1 ? (
                            <span>
                                {date.getMonth() + 1}
                                {lang == "zh-cn" && view >= 1 ? "月" : ""}
                            </span>
                        ) : null}
                        {view >= 2 ? (
                            <span>
                                {date.getDate()}
                                {lang == "zh-cn" && view >= 2 ? "日" : ""}
                            </span>
                        ) : null}
                    </span>
                </div>
                <div className={`${prefixCls}-header-right`}>
                    <Button.Group>
                        <Button
                            raised
                            active={view == 0}
                            onClick={this.handleViewClick.bind(this, 0)}
                        >
                            {dates[lang].year}
                        </Button>
                        <Button
                            raised
                            active={view == 1}
                            onClick={this.handleViewClick.bind(this, 1)}
                        >
                            {dates[lang].month}
                        </Button>
                        {/* <Button
                            raised
                            active={view == 2}
                            onClick={this.handleViewClick.bind(this, 2)}
                        >
                            {dates[lang].day}
                        </Button>
                        <Button
                            raised
                            active={view == 3}
                            onClick={this.handleViewClick.bind(this, 3)}
                        >
                            {dates[lang].week}
                        </Button> */}
                    </Button.Group>
                </div>
            </div>
        );
    }
}

export default YearView;
