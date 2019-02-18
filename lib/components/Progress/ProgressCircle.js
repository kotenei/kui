"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("../Icon"));

var ProgressCircle =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ProgressCircle, _Component);

  function ProgressCircle() {
    (0, _classCallCheck2.default)(this, ProgressCircle);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ProgressCircle).apply(this, arguments));
  }

  (0, _createClass2.default)(ProgressCircle, [{
    key: "relativeStrokeWidth",
    value: function relativeStrokeWidth() {
      var _this$props = this.props,
          strokeWidth = _this$props.strokeWidth,
          width = _this$props.width;
      return (strokeWidth / width * 100).toFixed(1);
    }
  }, {
    key: "trackPath",
    value: function trackPath() {
      var strokeWidth = this.relativeStrokeWidth();
      var radius = parseInt(50 - parseFloat(strokeWidth) / 2, 10);
      return "M 50 50 m 0 -".concat(radius, " a ").concat(radius, " ").concat(radius, " 0 1 1 0 ").concat(radius * 2, " a ").concat(radius, " ").concat(radius, " 0 1 1 0 -").concat(radius * 2);
    }
  }, {
    key: "perimeter",
    value: function perimeter() {
      var strokeWidth = this.relativeStrokeWidth();
      var radius = 50 - parseFloat(strokeWidth) / 2;
      return 2 * Math.PI * radius;
    }
  }, {
    key: "circlePathStyle",
    value: function circlePathStyle() {
      var percent = this.props.percent;
      var perimeter = this.perimeter();
      return {
        strokeDasharray: "".concat(perimeter, "px,").concat(perimeter, "px"),
        strokeDashoffset: (1 - percent / 100) * perimeter + "px",
        transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"
      };
    }
  }, {
    key: "stroke",
    value: function stroke() {
      var _this$props2 = this.props,
          color = _this$props2.color,
          status = _this$props2.status;
      var ret;

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
  }, {
    key: "getFontSize",
    value: function getFontSize() {
      return this.props.width * 0.16 + 6;
    }
  }, {
    key: "renderIcon",
    value: function renderIcon() {
      var _this$props3 = this.props,
          status = _this$props3.status,
          percent = _this$props3.percent;
      var fontSize = this.getFontSize();

      if (status) {
        if (status == "success") {
          if (percent >= 100) {
            return _react.default.createElement(_Icon.default, {
              type: "check",
              fontSize: fontSize,
              color: "#4caf50"
            });
          }

          return "".concat(percent, "%");
        }

        if (status == "error") {
          return _react.default.createElement(_Icon.default, {
            type: "close",
            fontSize: fontSize,
            color: "#f44336"
          });
        }
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          width = _this$props4.width,
          showText = _this$props4.showText,
          status = _this$props4.status,
          percent = _this$props4.percent;
      var d = this.trackPath();
      var circlePathStyle = this.circlePathStyle();
      var stroke = this.stroke();
      var strokeWidth = this.relativeStrokeWidth();
      var fontSize = this.getFontSize();
      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-circle"),
        style: {
          width: width,
          height: width,
          fontSize: fontSize
        }
      }, _react.default.createElement("svg", {
        viewBox: "0 0 100 100"
      }, _react.default.createElement("path", {
        className: "".concat(prefixCls, "-circle-track"),
        d: d,
        stroke: "#e5e9f2",
        fill: "none",
        strokeWidth: strokeWidth
      }), _react.default.createElement("path", {
        className: "".concat(prefixCls, "-circle-path"),
        d: d,
        strokeLinecap: "round",
        fill: "none",
        strokeWidth: strokeWidth,
        style: circlePathStyle,
        stroke: stroke
      })), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-text")
      }, status ? this.renderIcon() : "".concat(percent, "%")));
    }
  }]);
  return ProgressCircle;
}(_react.Component);

var _default = ProgressCircle;
exports.default = _default;