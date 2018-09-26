import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import classnames from "classnames";

class ProgressLine extends Component {
    renderIcon() {
        const { status, percent } = this.props;
        if (status) {
            if (status == "success") {
                if (percent >= 100) {
                    return <Icon type="checkcircle" />;
                }
                return `${percent}%`;
            }
            if (status == "error") {
                return <Icon type="closecircle" />;
            }
        }
        return null;
    }
    renderText() {
        const { prefixCls, textInside, status, percent, showText } = this.props;
        if (textInside || !showText) {
            return null;
        }
        return (
            <span className={`${prefixCls}-text`}>
                {status ? this.renderIcon() : `${percent}%`}
            </span>
        );
    }
    render() {
        const {
            prefixCls,
            textInside,
            strokeWidth,
            percent,
            showText,
            color
        } = this.props;
        return (
            <div>
                <div
                    className={classnames({
                        [`${prefixCls}-bar`]: true,
                        [`${prefixCls}-bar--hideText`]: !showText
                    })}
                >
                    <div
                        className={`${prefixCls}-bar-outer`}
                        style={{ height: strokeWidth }}
                    >
                        <div
                            className={`${prefixCls}-bar-inner`}
                            style={{ width: `${percent}%`, background: color }}
                        >
                            {textInside && showText ? (
                                <span className={`${prefixCls}-bar-inner-text`}>
                                    {percent}%
                                </span>
                            ) : null}
                        </div>
                    </div>
                </div>
                {this.renderText()}
            </div>
        );
    }
}

export default ProgressLine;
