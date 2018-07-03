import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import SliderHandle from "./SlederHandle";

const prefixCls = "k-slider";

class Slider extends Component {
    constructor(props) {
        super(props);
        let value = props.vlaue || props.defaultValue;
        if (!value) {
            if (props.range) {
                value = [0, 0];
            } else {
                value = 0;
            }
        }
        this.state = {
            value
        };
    }
    static propTypes = {
        disabled: PropTypes.bool,
        min: PropTypes.number,
        max: PropTypes.number,
        marks: PropTypes.object,
        range: PropTypes.bool,
        step: PropTypes.number,
        vertical: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
        defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
        tipFormatter: PropTypes.func,
        onChange: PropTypes.func
    };
    static defaultProps = {
        disabled: false,
        min: 0,
        max: 100,
        range: false,
        step: 1,
        vertical: false,
        tipFormatter(item) {
            return item;
        }
    };
    getMarks() {
        const { marks, range, min, max, step } = this.props;
        let ret = {
            dots: [],
            marks: []
        };
        if (marks) {
            for (let i = min; i <= max; i++) {
                let percent = this.getTrackWidth(i),
                    dotStyle = { left: `${percent}%` },
                    mark = marks[i];
                if (mark) {
                    let isObj = typeof mark === "object";
                    let markStyle = isObj
                        ? { ...dotStyle, ...mark.style }
                        : dotStyle;
                    ret.dots.push(
                        <span className={`${prefixCls}-dot`} style={dotStyle} />
                    );
                    ret.marks.push(
                        <span className={`${prefixCls}-mark`} style={markStyle}>
                            {isObj ? mark : mark.label}
                        </span>
                    );
                }
            }
        }
        return ret;
    }
    getTrackWidth(val) {
        const { min, max } = this.props;
        let diff = max - min,
            width = ((val - min) / diff) * 100;
        return width;
    }
    componentWillMount() {
        const { range, defaultValue, value } = this.props;
    }
    renderHandles() {
        const { vertical, tipFormatter } = this.props;
        const { value } = this.state;
        let title;
        if (Array.isArray(value)) {
            return value.map((val, index) => {
                title = tipFormatter(val);
                return (
                    <SliderHandle
                        key={index}
                        prefixCls={prefixCls}
                        vertical={vertical}
                        title={title}
                    />
                );
            });
        } else {
            title = tipFormatter(value);
            return (
                <SliderHandle
                    prefixCls={prefixCls}
                    vertical={vertical}
                    title={title}
                />
            );
        }
    }
    render() {
        const { disabled } = this.props;
        let marks = this.getMarks();
        return (
            <div
                className={classnames({
                    [prefixCls]: true,
                    [`${prefixCls}-disabled`]: disabled
                })}
            >
                <div className={`${prefixCls}-rail`} />
                <div className={`${prefixCls}-track`} />
                <div className={`${prefixCls}-step`}>{marks.dots}</div>
                <div className={`${prefixCls}-marks`}>{marks.marks}</div>
                {this.renderHandles()}
            </div>
        );
    }
}

export default Slider;
