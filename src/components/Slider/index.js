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
        const { marks, vertical, min, max, step } = this.props;
        let ret = {
            dots: [],
            marks: []
        };
        if (marks) {
            for (let i = min; i <= max; i++) {
                let percent = this.getDistance(i),
                    dotStyle = !vertical
                        ? { left: `${percent}%` }
                        : { bottom: `${percent}%` },
                    mark = marks[i];
                if (mark) {
                    let isObj = typeof mark === "object";
                    let markStyle = isObj
                        ? { ...dotStyle, ...mark.style }
                        : dotStyle;

                    ret.dots.push(
                        <span
                            key={`dot_${i}`}
                            className={`${prefixCls}-step-dot`}
                            style={dotStyle}
                        />
                    );
                    ret.marks.push(
                        <span
                            key={`mark_${i}`}
                            className={`${prefixCls}-marks-mark`}
                            style={markStyle}
                        >
                            {isObj ? mark.label : mark}
                        </span>
                    );
                }
            }
        }
        return ret;
    }
    getDistance(val) {
        const { min, max } = this.props;
        let diff = max - min,
            width = ((val - min) / diff) * 100;
        return width;
    }
    getTrackStyle() {
        const { value, vertical } = this.state;
        let min = 0,
            max = 0,
            num1 = 0,
            num2 = 0;
        if (Array.isArray(value)) {
            min = Math.min(...value);
            max = Math.max(...value);
        } else {
            max = value;
        }

        num1 = this.getDistance(min) + "%";
        num2 = this.getDistance(max) - this.getDistance(min) + "%";

        return !vertical
            ? {
                  left: num1,
                  width: num2
              }
            : {
                  bottom: num1,
                  height: num2
              };
    }
    componentWillMount() {}
    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
    }
    renderHandles() {
        const { vertical, tipFormatter, range } = this.props;
        const { value } = this.state;
        let title, style, distance;
        if (range) {
            return value.map((val, index) => {
                title = tipFormatter(val);
                distance = this.getDistance(val);
                style = !vertical
                    ? { left: `${distance}%` }
                    : { bottom: `${distance}%` };
                return (
                    <SliderHandle
                        key={index}
                        prefixCls={prefixCls}
                        vertical={vertical}
                        title={title}
                        style={style}
                    />
                );
            });
        } else {
            title = tipFormatter(value);
            distance = this.getDistance(value);
            style = !vertical
                ? { left: `${distance}%` }
                : { bottom: `${distance}%` };
            return (
                <SliderHandle
                    prefixCls={prefixCls}
                    vertical={vertical}
                    title={title}
                    style={style}
                />
            );
        }
    }
    render() {
        const { disabled, vertical } = this.props;
        const { value } = this.state;
        let marks = this.getMarks(),
            trackStyle = this.getTrackStyle();

        return (
            <div
                className={classnames({
                    [prefixCls]: true,
                    [`${prefixCls}-vertical`]: vertical,
                    [`${prefixCls}-disabled`]: disabled
                })}
            >
                <div className={`${prefixCls}-rail`} />
                <div className={`${prefixCls}-track`} style={trackStyle} />
                <div className={`${prefixCls}-step`}>{marks.dots}</div>
                <div className={`${prefixCls}-marks`}>{marks.marks}</div>
                {this.renderHandles()}
            </div>
        );
    }
}

export default Slider;
