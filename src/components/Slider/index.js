import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import SliderHandle from "./SlederHandle";
import domUtils from "../../utils/domUtils";

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
        reversed: PropTypes.bool,
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
        step: 11,
        vertical: false,
        reversed: true,
        tipFormatter(item) {
            return item;
        }
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
    getPercentage(coordinate, handleInfo) {
        const { vertical, min, max, step, reversed } = this.props;
        let common = (step * 100) / (max - min),
            distanceToSlide,
            percentage;
        if (vertical) {
            distanceToSlide = coordinate.curCoord.y - this.elmInfo.offsetTop;
            percentage = (distanceToSlide / this.elmInfo.eh) * 100;
        } else {
            distanceToSlide = coordinate.curCoord.x - this.elmInfo.offsetLeft;
            percentage = (distanceToSlide / this.elmInfo.ew) * 100;
        }
        percentage = Math.round(percentage / common) * common;
        if (reversed) {
            percentage = 100 - percentage;
        }
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
        const { value } = this.state;
        const { vertical, min, max } = this.props;
        let newNmin = 0,
            newMax = 0,
            num1 = 0,
            num2 = 0;
        if (Array.isArray(value)) {
            newMin = Math.min(...value);
            newMax = Math.max(...value);
        } else {
            newMax = value;
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
    setElmInfo() {
        if (!this.elm) {
            this.elm = ReactDOM.findDOMNode(this.refs.slider);
        }
        let position = domUtils.position(this.elm);
        let offset = domUtils.offset(this.elm);
        this.elmInfo = {
            left: parseInt(position.left),
            top: parseInt(position.top),
            offsetLeft: offset.left,
            offsetTop: offset.top,
            ew: domUtils.outerWidth(this.elm),
            eh: domUtils.outerHeight(this.elm)
        };
    }
    componentDidMount() {
        this.setElmInfo();
    }
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
