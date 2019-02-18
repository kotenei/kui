"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var ProgressLine =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ProgressLine, _Component);

  function ProgressLine() {
    (0, _classCallCheck2.default)(this, ProgressLine);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ProgressLine).apply(this, arguments));
  }

  (0, _createClass2.default)(ProgressLine, [{
    key: "renderIcon",
    value: function renderIcon() {
      var _this$props = this.props,
          status = _this$props.status,
          percent = _this$props.percent;

      if (status) {
        if (status == "success") {
          if (percent >= 100) {
            return _react.default.createElement(_Icon.default, {
              type: "check-circle",
              theme: "filled",
              color: "#4caf50"
            });
          }

          return "".concat(percent, "%");
        }

        if (status == "error") {
          return _react.default.createElement(_Icon.default, {
            type: "close-circle",
            theme: "filled",
            color: "#f44336"
          });
        }
      }

      return null;
    }
  }, {
    key: "renderText",
    value: function renderText() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          textInside = _this$props2.textInside,
          status = _this$props2.status,
          percent = _this$props2.percent,
          showText = _this$props2.showText,
          indeterminate = _this$props2.indeterminate;

      if (textInside || !showText || indeterminate) {
        return null;
      }

      return _react.default.createElement("span", {
        className: "".concat(prefixCls, "-text")
      }, status ? this.renderIcon() : "".concat(percent, "%"));
    }
  }, {
    key: "renderInner",
    value: function renderInner() {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          textInside = _this$props3.textInside,
          percent = _this$props3.percent,
          indeterminate = _this$props3.indeterminate,
          color = _this$props3.color,
          showText = _this$props3.showText;

      if (indeterminate) {
        return null;
      }

      var innerText = textInside && showText && _react.default.createElement("span", {
        className: "".concat(prefixCls, "-bar-inner-text")
      }, percent, "%");

      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-bar-inner"),
        style: {
          width: "".concat(percent, "%"),
          background: color
        }
      }, innerText);
    }
  }, {
    key: "renderIndeterminate",
    value: function renderIndeterminate() {
      var _classnames, _classnames2;

      var _this$props4 = this.props,
          indeterminate = _this$props4.indeterminate,
          prefixCls = _this$props4.prefixCls,
          color = _this$props4.color;

      if (!indeterminate) {
        return;
      }

      var firstClass = (0, _classnames4.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-bar-inner"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-bar-inner--indeterminate1"), true), _classnames));
      var secondClass = (0, _classnames4.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-bar-inner"), true), (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-bar-inner--indeterminate2"), true), _classnames2));
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        className: firstClass,
        style: {
          background: color
        }
      }), _react.default.createElement("div", {
        className: secondClass,
        style: {
          background: color
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames3;

      var _this$props5 = this.props,
          prefixCls = _this$props5.prefixCls,
          strokeWidth = _this$props5.strokeWidth,
          showText = _this$props5.showText,
          indeterminate = _this$props5.indeterminate;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        className: (0, _classnames4.default)((_classnames3 = {}, (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-bar"), true), (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-bar--hideText"), !showText || indeterminate), _classnames3))
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-bar-outer"),
        style: {
          height: strokeWidth
        }
      }, this.renderInner(), this.renderIndeterminate())), this.renderText());
    }
  }]);
  return ProgressLine;
}(_react.Component);

var _default = ProgressLine;
exports.default = _default;