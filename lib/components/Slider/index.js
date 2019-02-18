"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var _SlederHandle = _interopRequireDefault(require("./SlederHandle"));

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _utils = require("../../utils");

var _url = require("url");

var prefixCls = "k-slider";

var Slider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Slider, _Component);

  function Slider(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Slider);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Slider).call(this, props));

    _this.handleMouseDown = function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          range = _this$props.range;
      if (disabled) return;

      var activeValue = _this.getValue(e);

      if (range) {
        var valueRange = _this.getValueRange();

        for (var k in valueRange) {
          var v = valueRange[k];

          if (activeValue >= v[0] && activeValue <= v[1]) {
            var value = (0, _toConsumableArray2.default)(_this.state.value);
            value[k] = activeValue;

            _this.setState({
              value: value //activeValue

            });

            break;
          }
        }
      } else {
        _this.setState({
          value: activeValue //activeValue

        });
      } //禁止文档选择事件


      document.onselectstart = function () {
        return false;
      };

      return false;
    };

    _this.handleMouseEnter = function (value) {
      _this.isEnter = true;

      _this.setState({
        activeValue: value
      });
    };

    _this.handleMouseLeave = function (value) {
      _this.isEnter = false;

      if (!_this.isMoving) {
        _this.setState({
          activeValue: -1
        });
      }
    };

    _this.handleDragStart = function (e) {
      var _this$props2 = _this.props,
          onDragStart = _this$props2.onDragStart,
          range = _this$props2.range;

      var value = _this.getValue(e);

      if (range) {
        _this.tmpDragIndex = _this.state.value.findIndex(function (item) {
          return item == value;
        });
      }

      _this.isMoving = true;

      if (onDragStart) {
        onDragStart(value);
      }
    };

    _this.handleChange = function (e) {
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          disabled = _this$props3.disabled,
          range = _this$props3.range;

      var activeValue = _this.getValue(e);

      var value = activeValue;

      if (range) {
        var newValue = (0, _toConsumableArray2.default)(_this.state.value);
        newValue[_this.tmpDragIndex] = activeValue;
        value = newValue;
      }

      _this.setState({
        value: value,
        activeValue: activeValue
      });

      if (onChange) {
        var returnValue = range ? (0, _toConsumableArray2.default)(value).sort(function (a, b) {
          return a - b;
        }) : value;
        onChange(returnValue);
      }
    };

    _this.handleDragStop = function (e) {
      var _this$props4 = _this.props,
          onDragStop = _this$props4.onDragStop,
          range = _this$props4.range;
      var value = _this.state.value;
      var newValue = value;
      _this.isMoving = false;

      if (!_this.isEnter) {
        _this.setState({
          activeValue: -1
        });
      }

      if (range) {
        newValue = value.sort(function (a, b) {
          return a - b;
        });

        _this.setState({
          value: newValue
        });
      }

      if (onDragStop) {
        onDragStop(newValue);
      }
    };

    _this.getSliderHandle = function (value, key) {
      var _this$props5 = _this.props,
          tipFormatter = _this$props5.tipFormatter,
          vertical = _this$props5.vertical,
          disabled = _this$props5.disabled;
      var activeValue = _this.state.activeValue;

      var title = tipFormatter && typeof tipFormatter === "function" ? tipFormatter(value) : null,
          percentage = _this.toPercentage(value),
          style = vertical ? {
        bottom: "".concat(percentage, "%")
      } : {
        left: "".concat(percentage, "%")
      };

      return _react.default.createElement(_SlederHandle.default, {
        key: "slider-handle-".concat(key),
        ref: "slider-handle-".concat(value),
        prefixCls: prefixCls,
        vertical: vertical,
        disabled: disabled,
        title: title,
        style: style,
        value: value,
        showTooltip: value == activeValue,
        onDragStart: _this.handleDragStart,
        onChange: _this.handleChange,
        onDragStop: _this.handleDragStop,
        onMouseEnter: _this.handleMouseEnter,
        onMouseLeave: _this.handleMouseLeave
      });
    };

    _this.state = {
      value: 1,
      activeValue: -1
    };
    _this.zIndex = 1;
    return _this;
  }

  (0, _createClass2.default)(Slider, [{
    key: "toValue",
    value: function toValue(percentage) {
      var _this$props6 = this.props,
          min = _this$props6.min,
          max = _this$props6.max,
          step = _this$props6.step;
      var value = percentage / 100 * (max - min);
      value = min + Math.round(value / step) * step;

      if (value < min) {
        value = min;
      }

      if (value > max) {
        value = max;
      }

      return value;
    }
  }, {
    key: "toPercentage",
    value: function toPercentage(value) {
      var _this$props7 = this.props,
          min = _this$props7.min,
          max = _this$props7.max;
      return 100 * (value - min) / (max - min);
    }
  }, {
    key: "getValue",
    value: function getValue(mouseEvent) {
      var sliderInfo = this.getSliderInfo();
      var mouseCoord = (0, _utils.getMouseCoord)(mouseEvent);
      var percentage = this.getPercentage(mouseCoord, sliderInfo);
      var value = this.toValue(percentage);
      return value;
    }
  }, {
    key: "getValueRange",
    value: function getValueRange() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;
      var _this$props8 = this.props,
          min = _this$props8.min,
          max = _this$props8.max;
      var range = {},
          prev,
          next,
          mid;

      for (var i = 0; i < value.length; i++) {
        var first = value[i];
        var second = i + 1 == value.length ? max : value[i + 1];
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
  }, {
    key: "getPercentage",
    value: function getPercentage(mouseCoord, sliderInfo) {
      var _this$props9 = this.props,
          vertical = _this$props9.vertical,
          min = _this$props9.min,
          max = _this$props9.max,
          step = _this$props9.step;
      var num = step * 100 / (max - min),
          distanceToSlide,
          percentage;

      if (vertical) {
        distanceToSlide = mouseCoord.y - sliderInfo.offsetTop;
        percentage = distanceToSlide / sliderInfo.height * 100;
      } else {
        distanceToSlide = mouseCoord.x - sliderInfo.offsetLeft;
        percentage = distanceToSlide / sliderInfo.width * 100;
      }

      if (vertical) {
        percentage = 100 - percentage;
      }

      percentage = Math.max(0, Math.min(100, percentage));
      return percentage;
    }
  }, {
    key: "getMarks",
    value: function getMarks() {
      var _this$props10 = this.props,
          marks = _this$props10.marks,
          vertical = _this$props10.vertical,
          min = _this$props10.min,
          max = _this$props10.max,
          step = _this$props10.step;
      var value = this.state.value;
      var ret = {
        dots: [],
        marks: []
      };

      if (marks) {
        for (var i = min; i <= max; i++) {
          var percentage = this.toPercentage(i),
              dotStyle = vertical ? {
            bottom: "".concat(percentage, "%")
          } : {
            left: "".concat(percentage, "%")
          },
              mark = marks[i],
              active = false;

          var _max = Array.isArray(value) ? Math.max.apply(Math, (0, _toConsumableArray2.default)(value)) : value;

          if (mark) {
            var _classnames, _classnames2;

            active = _max >= i;
            var isObj = (0, _typeof2.default)(mark) === "object";
            var markStyle = isObj ? (0, _objectSpread2.default)({}, dotStyle, mark.style) : dotStyle;
            ret.dots.push(_react.default.createElement("span", {
              key: "slider-dot-".concat(i),
              className: (0, _classnames4.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-step-dot"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-step-dot-active"), active), _classnames)),
              style: dotStyle
            }));
            ret.marks.push(_react.default.createElement("span", {
              key: "slider-mark-".concat(i),
              className: (0, _classnames4.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-marks-mark"), true), (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-marks-mark-active"), active), _classnames2)),
              style: markStyle
            }, isObj ? mark.label : mark));
          }
        }
      }

      return ret;
    }
  }, {
    key: "getTrackStyle",
    value: function getTrackStyle() {
      var value = this.state.value;
      var vertical = this.props.vertical;
      var min, max, num1, num2;

      if (Array.isArray(value)) {
        min = Math.min.apply(Math, (0, _toConsumableArray2.default)(value));
        max = Math.max.apply(Math, (0, _toConsumableArray2.default)(value));
      } else {
        min = this.props.min;
        max = value;
      }

      num1 = this.toPercentage(min) + "%";
      num2 = this.toPercentage(max) - this.toPercentage(min) + "%";
      return vertical ? {
        bottom: num1,
        height: num2
      } : {
        left: num1,
        width: num2
      };
    }
  }, {
    key: "getSliderInfo",
    value: function getSliderInfo() {
      if (!this.elm) {
        this.elm = _reactDom.default.findDOMNode(this.refs.slider);
      }

      var position = _domUtils.default.position(this.elm);

      var offset = _domUtils.default.offset(this.elm);

      return {
        left: position.left,
        top: position.top,
        offsetLeft: offset.left,
        offsetTop: offset.top,
        width: _domUtils.default.outerWidth(this.elm),
        height: _domUtils.default.outerHeight(this.elm)
      };
    }
  }, {
    key: "init",
    value: function init() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var range = props.range,
          min = props.min,
          max = props.max,
          step = props.step;
      var val = props.value || props.defaultValue;
      var stepArr = [],
          stepRange;

      for (var i = min; i <= max; i += step) {
        stepArr.push(i);
      }

      if (stepArr[stepArr.length - 1] < max) {
        stepArr.push(max);
      }

      stepRange = this.getValueRange(stepArr);

      if (range && Array.isArray(val)) {
        var arrVal = [];
        val = val.sort(function (a, b) {
          return a - b;
        });
        val.forEach(function (item) {
          if (item <= min) {
            arrVal.push(min);
          } else if (item >= max) {
            arrVal.push(max);
          } else {
            for (var k in stepRange) {
              if (item >= stepRange[k][0] && item <= stepRange[k][1]) {
                arrVal.push(stepArr[k]);
                break;
              }
            }
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

        for (var k in stepRange) {
          if (val >= stepRange[k][0] && val <= stepRange[k][1]) {
            val = stepArr[k];
            break;
          }
        }

        val = range ? [val] : val;
      }

      this.setState({
        value: val
      });
    }
  }, {
    key: "getSort",
    value: function getSort(value) {
      var _this$props11 = this.props,
          min = _this$props11.min,
          max = _this$props11.max,
          range = _this$props11.range;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("value" in nextProps) {
        this.init(nextProps);
      }
    }
  }, {
    key: "renderHandles",
    value: function renderHandles() {
      var _this2 = this;

      var _this$props12 = this.props,
          vertical = _this$props12.vertical,
          tipFormatter = _this$props12.tipFormatter,
          range = _this$props12.range;
      var _this$state = this.state,
          value = _this$state.value,
          activeValue = _this$state.activeValue;
      var title, style, percentage;

      if (range) {
        return value.map(function (val, index) {
          return _this2.getSliderHandle(val, index);
        });
      } else {
        return this.getSliderHandle(value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames3;

      var _this$props13 = this.props,
          disabled = _this$props13.disabled,
          vertical = _this$props13.vertical;
      var value = this.state.value;
      var marks = this.getMarks(),
          trackStyle = this.getTrackStyle();
      return _react.default.createElement("div", {
        ref: "slider",
        className: (0, _classnames4.default)((_classnames3 = {}, (0, _defineProperty2.default)(_classnames3, prefixCls, true), (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-vertical"), vertical), (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-disabled"), disabled), _classnames3)),
        onMouseDown: this.handleMouseDown
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-rail")
      }), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-track"),
        style: trackStyle
      }), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-step")
      }, marks.dots), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-marks")
      }, marks.marks), this.renderHandles());
    }
  }]);
  return Slider;
}(_react.Component);

Slider.propTypes = {
  disabled: _propTypes.default.bool,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  marks: _propTypes.default.object,
  range: _propTypes.default.bool,
  step: _propTypes.default.number,
  vertical: _propTypes.default.bool,
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.array]),
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.array]),
  tipFormatter: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onDragStop: _propTypes.default.func
};
Slider.defaultProps = {
  disabled: false,
  min: 1,
  max: 100,
  range: false,
  step: 1,
  vertical: false,
  defaultValue: 1,
  tipFormatter: function tipFormatter(value) {
    return value;
  }
};
var _default = Slider;
exports.default = _default;