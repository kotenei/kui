import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-icon-svg";

class SvgIcon extends Component {
    static propTypes = {
        type: PropTypes.string,
        title: PropTypes.string,
        nativeColor: PropTypes.string,
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onClick: PropTypes.func
    };
    static defaultProps = {
        viewBox: "0 0 1024 1024"
    };
    render() {
        const {
            theme,
            children,
            className,
            fontSize,
            viewBox,
            title,
            nativeColor,
            style
        } = this.props;
        const _style = {
            fontSize,
            ...style,
            fill: `${nativeColor ? nativeColor : null}`
        };
        const classString = classnames(prefixCls, className);

        return (
            <svg
                className={classString}
                focusable="false"
                viewBox={viewBox}
                fill={nativeColor}
                aria-hidden={title ? "false" : "true"}
                style={_style}
            >
                {title ? <title>{title}</title> : null}
                {children}
            </svg>
        );
    }
}

export default SvgIcon;
