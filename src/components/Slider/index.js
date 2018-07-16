import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import SliderHandle from "./SlederHandle";
import domUtils from "../../utils/domUtils";
import { getMouseCoord } from "../../utils";
import { parse } from "url";

const prefixCls = "k-slider";

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            activeValue: -1
        };
        this.zIndex = 1;
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
        onDragStart: PropTypes.func,
        onChange: PropTypes.func,
        onDragStop: PropTypes.func
    };
    static defaultProps = {
        disabled: false,
        min: 1,
        max: 100,
        range: false,
        step: 1,
        vertical: false,
        defaultValue: 1,
        tipFormatter(item) {
            return item;
        }
    };
    handleMouseDown = e => {
        e.stopPropagation();
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        const { disabled, range } = this.props;
        if (disabled) return;
        let activeValue = this.getValue(e);
        console.log(activeValue)
        if (range) {
            let valueRange = this.getValueRange();
            for (let k in valueRange) {
                const v = valueRange[k];
                if (activeValue >= v[0] && activeValue <= v[1]) {
                    let value = [...this.state.value];
                    value[k] = activeValue;
                    this.setState({
                        value,
                        activeValue
                    });
                    break;
                }
            }
        } else {
            this.setState({
                value: activeValue,
                activeValue
            });
        }
        //禁止文档选择事件
        document.onselectstart = function() {
            return false;
        };
        return false;
    };
    handleMouseEnter = value => {
        this.isEnter = true;
        this.setState({
            activeValue: value
        });
    };
    handleMouseLeave = value => {
        this.isEnter = false;
        if (!this.isMoving) {
            this.setState({
                activeValue: -1
            });
        }
    };
    handleDragStart = e => {
        const { onDragStart, range } = this.props;
        let value = this.getValue(e);
        if (range) {
            this.tmpDragIndex = this.state.value.findIndex(item => {
                return item == value;
            });
        }
        this.isMoving = true;
        if (onDragStart) {
            onDragStart(value);
        }
    };
    handleChange = e => {
        const { onDragStart, disabled, range } = this.props;
        let activeValue = this.getValue(e);
        let value = activeValue;
        if (range) {
            let newValue = [...this.state.value];
            newValue[this.tmpDragIndex] = activeValue;
            value = newValue;
        }
        this.setState({
            value,
            activeValue
        });
        if (onDragStart) {
            onDragStart(value);
        }
    };
    handleDragStop = e => {
        const { onDragStop, range } = this.props;
        const { value } = this.state;
        let newValue = value;
        this.isMoving = false;
        if (!this.isEnter) {
            this.setState({
                activeValue: -1
            });
        }
        if (range) {
            newValue = value.sort((a, b) => {
                return a - b;
            });
            this.setState({
                value: newValue
            });
        }
        if (onDragStop) {
            onDragStop(newValue);
        }
    };
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
    getValue(mouseEvent) {
        let sliderInfo = this.getSliderInfo();
        let mouseCoord = getMouseCoord(mouseEvent);
        let percentage = this.getPercentage(mouseCoord, sliderInfo);
        let value = this.toValue(percentage);
        return value;
    }
    getValueRange(value = this.state.value) {
        const { min, max } = this.props;
        let range = {},
            prev,
            next,
            mid;
        for (let i = 0; i < value.length; i++) {
            const first = value[i];
            const second = i + 1 == value.length ? max : value[i + 1];
            mid = parseInt((second - first) / 2);
            next = first + mid;
            if (i == 0) {
                range[i] = [min, next];
            } else {
                range[i] = [range[i - 1][1] + 1, next];
            }
            if (i == value.length - 1) {
                range[i][1] = max;
            }
        }
        return range;
    }
    getPercentage(mouseCoord, sliderInfo) {
        const { vertical, min, max, step } = this.props;
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
        if (vertical) {
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
                            key={`slider-dot-${i}`}
                            className={`${prefixCls}-step-dot`}
                            style={dotStyle}
                        />
                    );
                    ret.marks.push(
                        <span
                            key={`slider-mark-${i}`}
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
    getSliderHandle = (value, key) => {
        const { tipFormatter, vertical, disabled } = this.props;
        const { activeValue } = this.state;
        let title = tipFormatter(value),
            percentage = this.toPercentage(value),
            style = vertical
                ? { bottom: `${percentage}%` }
                : { left: `${percentage}%` };

        return (
            <SliderHandle
                key={`slider-handle-${key}`}
                ref={`slider-handle-${value}`}
                prefixCls={prefixCls}
                vertical={vertical}
                disabled={disabled}
                title={title}
                style={style}
                value={value}
                showTooltip={value == activeValue}
                onDragStart={this.handleDragStart}
                onChange={this.handleChange}
                onDragStop={this.handleDragStop}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            />
        );
    };
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
                    console.log(this.toPercentage(item),item)
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
    getSort(value) {
        const { min, max, range } = this.props;
    }
    componentWillMount() {
        this.init();
    }
    componentDidMount() {}
    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps) {
            this.init(nextProps);
        }
    }
    renderHandles() {
        const { vertical, tipFormatter, range } = this.props;
        const { value, activeValue } = this.state;
        let title, style, percentage;
        if (range) {
            return value.map((val, index) => {
                return this.getSliderHandle(val, index);
            });
        } else {
            return this.getSliderHandle(value);
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
