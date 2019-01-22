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
                    return <Icon type="check-circle" theme="filled" color="#4caf50"/>;
                }
                return `${percent}%`;
            }
            if (status == "error") {
                return <Icon type="close-circle" theme="filled" color="#f44336"/>;
            }
        }
        return null;
    }
    renderText() {
        const {
            prefixCls,
            textInside,
            status,
            percent,
            showText,
            indeterminate
        } = this.props;
        if (textInside || !showText || indeterminate) {
            return null;
        }
        return (
            <span className={`${prefixCls}-text`}>
                {status ? this.renderIcon() : `${percent}%`}
            </span>
        );
    }
    renderInner() {
        const {
            prefixCls,
            textInside,
            percent,
            indeterminate,
            color,
            showText
        } = this.props;
        if (indeterminate) {
            return null;
        }
        let innerText = textInside &&
            showText && (
                <span className={`${prefixCls}-bar-inner-text`}>
                    {percent}%
                </span>
            );
        return (
            <div
                className={`${prefixCls}-bar-inner`}
                style={{ width: `${percent}%`, background: color }}
            >
                {innerText}
            </div>
        );
    }
    renderIndeterminate() {
        const { indeterminate, prefixCls, color } = this.props;
        if (!indeterminate) {
            return;
        }
        let firstClass = classnames({
            [`${prefixCls}-bar-inner`]: true,
            [`${prefixCls}-bar-inner--indeterminate1`]: true
        });
        let secondClass = classnames({
            [`${prefixCls}-bar-inner`]: true,
            [`${prefixCls}-bar-inner--indeterminate2`]: true
        });
        return (
            <React.Fragment>
                <div className={firstClass} style={{ background: color }} />
                <div className={secondClass} style={{ background: color }} />
            </React.Fragment>
        );
    }
    render() {
        const { prefixCls, strokeWidth, showText, indeterminate } = this.props;
        return (
            <React.Fragment>
                <div
                    className={classnames({
                        [`${prefixCls}-bar`]: true,
                        [`${prefixCls}-bar--hideText`]:
                            !showText || indeterminate
                    })}
                >
                    <div
                        className={`${prefixCls}-bar-outer`}
                        style={{ height: strokeWidth }}
                    >
                        {this.renderInner()}
                        {this.renderIndeterminate()}
                    </div>
                </div>
                {this.renderText()}
            </React.Fragment>
        );
    }
}

export default ProgressLine;
