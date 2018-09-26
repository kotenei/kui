import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

class ProgressCircle extends Component {
    relativeStrokeWidth() {
        const { strokeWidth, width } = this.props;
        return ((strokeWidth / width) * 100).toFixed(1);
    }
    trackPath() {
        let strokeWidth = this.relativeStrokeWidth();
        let radius = parseInt(50 - parseFloat(strokeWidth) / 2, 10);
        return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius *
            2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
    }
    perimeter() {
        let strokeWidth = this.relativeStrokeWidth();
        let radius = 50 - parseFloat(strokeWidth) / 2;
        return 2 * Math.PI * radius;
    }
    circlePathStyle() {
        const { percent } = this.props;
        let perimeter = this.perimeter();
        return {
            strokeDasharray: `${perimeter}px,${perimeter}px`,
            strokeDashoffset: (1 - percent / 100) * perimeter + "px",
            transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"
        };
    }
    stroke() {
        const { color, status } = this.props;
        let ret;
        switch (status) {
            case "success":
                ret = "#4caf50";
                break;
            case "error":
                ret = "#f44336";
                break;
            default:
                ret = "#2196f3";
        }
        return color || ret;
    }
    getFontSize() {
        return this.props.width * 0.16 + 6;
    }
    renderIcon() {
        const { status, percent } = this.props;
        let fontSize = this.getFontSize();
        if (status) {
            if (status == "success") {
                if (percent >= 100) {
                    return <Icon type="check" fontSize={fontSize} />;
                }
                return `${percent}%`;
            }
            if (status == "error") {
                return <Icon type="close" fontSize={fontSize} />;
            }
        }
        return null;
    }
    render() {
        const { prefixCls, width, showText, status, percent } = this.props;
        let d = this.trackPath();
        let circlePathStyle = this.circlePathStyle();
        let stroke = this.stroke();
        let strokeWidth = this.relativeStrokeWidth();
        let fontSize = this.getFontSize();
        return (
            <div
                className={`${prefixCls}-circle`}
                style={{ width, height: width, fontSize }}
            >
                <svg viewBox="0 0 100 100">
                    <path
                        className={`${prefixCls}-circle-track`}
                        d={d}
                        stroke="#e5e9f2"
                        fill="none"
                        strokeWidth={strokeWidth}
                    />
                    <path
                        className={`${prefixCls}-circle-path`}
                        d={d}
                        strokeLinecap="round"
                        fill="none"
                        strokeWidth={strokeWidth}
                        style={circlePathStyle}
                        stroke={stroke}
                    />
                </svg>
                <div className={`${prefixCls}-text`}>
                    {status ? this.renderIcon() : `${percent}%`}
                </div>
            </div>
        );
    }
}

export default ProgressCircle;
