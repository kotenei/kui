import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import SliderHandle from "./SlederHandle";
import domUtils from "../../utils/domUtils";
import { getMouseCoord } from "../../utils";

const prefixCls = "k-slider";

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
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
        reversed: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
        defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
        tipFormatter: PropTypes.func,
        onChange: PropTypes.func
    };
    static defaultProps = {
        disabled: false,
        min: 1,
        max: 100,
        range: false,
        step: 1,
        vertical: false,
        reversed: false,
        defaultValue: 1,
        tipFormatter(item) {
            return item;
        }
    };
    handleMouseDown = e => {
        e.stopPropagation();
        e.preventDefault();
        let sliderInfo = this.getSliderInfo();
        let mouseCoord = getMouseCoord(e);
        let percentage = this.getPercentage(mouseCoord, sliderInfo);
        let value = this.toValue(percentage);
        this.setState({
            value
        });
        //禁止文档选择事件
        document.onselectstart = function() {
            return false;
        };
        return false;
    };

    handleChange = (e, coordinate, handleInfo) => {
        const { min, max, step, vertical } = this.props;
        let percentage;
        percentage = this.getPercentage(coordinate, handleInfo);

        if (percentage >= max) {
            percentage = max;
        }
        if (percentage <= min) {
            percentage = min;
        }

        this.setState({
            value: percentage
        });
    };
    mouseDown(e) {}
    mouseMove(e) {}
    mouseUp(e) {}
    toValue(percentage) {
        const { min, max, step } = this.props;
        let value = (percentage / 100) * (max - min);
        value = min + Math.round(value / step) * step;
        if (value < min) {
            value = min;
        }
        if (value > max) {
            value = max;
        }
        return value;
    }
    toPercentage(value) {
        const { min, max } = this.props;
        return (100 * (value - min)) / (max - min);
    }
    getPercentage(mouseCoord, sliderInfo) {
        const { vertical, min, max, step, reversed } = this.props;
        let num = (step * 100) / (max - min),
            distanceToSlide,
            percentage;
        if (vertical) {
            distanceToSlide = mouseCoord.y - sliderInfo.offsetTop;
            percentage = (distanceToSlide / sliderInfo.height) * 100;
        } else {
            distanceToSlide = mouseCoord.x - sliderInfo.offsetLeft;
            percentage = (distanceToSlide / sliderInfo.width) * 100;
        }
        if (reversed) {
            percentage = 100 - percentage;
        }
        percentage = Math.max(0, Math.min(100, percentage));

        return percentage;
    }
    getMarks() {
        const { marks, vertical, min, max, step } = this.props;
        let ret = {
            dots: [],
            marks: []
        };
        if (marks) {
            for (let i = min; i <= max; i++) {
                let percentage = this.toPercentage(i),
                    dotStyle = vertical
                        ? { bottom: `${percentage}%` }
                        : { left: `${percentage}%` },
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
    getTrackStyle() {
        const { value } = this.state;
        const { vertical } = this.props;
        let min, max, num1, num2;
        if (Array.isArray(value)) {
            min = Math.min(...value);
            max = Math.max(...value);
        } else {
            min = this.props.min;
            max = value;
        }
        num1 = this.toPercentage(min) + "%";
        num2 = this.toPercentage(max) - this.toPercentage(min) + "%";
        return vertical
            ? {
                  bottom: num1,
                  height: num2
              }
            : {
                  left: num1,
                  width: num2
              };
    }
    getSliderInfo() {
        if (!this.elm) {
            this.elm = ReactDOM.findDOMNode(this.refs.slider);
        }
        let position = domUtils.position(this.elm);
        let offset = domUtils.offset(this.elm);
        return {
            left: position.left,
            top: position.top,
            offsetLeft: offset.left,
            offsetTop: offset.top,
            width: domUtils.outerWidth(this.elm),
            height: domUtils.outerHeight(this.elm)
        };
    }
    init(props = this.props) {
        const { range, min, max } = props;
        let val = props.value || props.defaultValue;
        let tmpMin, tmpMax, tmpVal;
        if (range && Array.isArray(val)) {
            let arrVal = [];
            val = val.sort((a, b) => {
                return a - b;
            });
            val.forEach(item => {
                if (item <= min) {
                    arrVal.push(min);
                } else if (item >= max) {
                    arrVal.push(max);
                } else {
                    arrVal.push(item);
                }
            });
            val = arrVal;
        } else {
            if (val <= min) {
                val = min;
            }
            if (val >= max) {
                val = max;
            }
            val = range ? [val] : val;
        }

        this.setState({
            value: val
        });
    }
    componentWillMount() {
        this.init();
    }
    componentDidMount() {
        // this.setElmInfo();
        //this.init();
    }
    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps) {
            this.init(nextProps);
        }
    }
    renderHandles() {
        const { vertical, tipFormatter, range } = this.props;
        const { value } = this.state;
        let title, style, percentage;
        if (range) {
            return value.map((val, index) => {
                title = tipFormatter(val);
                percentage = this.toPercentage(val);
                style = vertical
                    ? { bottom: `${percentage}%` }
                    : { left: `${percentage}%` };
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
            percentage = this.toPercentage(value);
            style = vertical
                ? { bottom: `${percentage}%` }
                : { left: `${percentage}%` };
            return (
                <SliderHandle
                    prefixCls={prefixCls}
                    vertical={vertical}
                    title={title}
                    style={style}
                    onChange={this.handleChange}
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
                ref="slider"
                className={classnames({
                    [prefixCls]: true,
                    [`${prefixCls}-vertical`]: vertical,
                    [`${prefixCls}-disabled`]: disabled
                })}
                onMouseDown={this.handleMouseDown}
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
