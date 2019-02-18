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

var _classnames3 = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var Step =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Step, _Component);

  function Step() {
    (0, _classCallCheck2.default)(this, Step);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Step).apply(this, arguments));
  }

  (0, _createClass2.default)(Step, [{
    key: "renderIcon",
    value: function renderIcon() {
      var _this$props = this.props,
          icon = _this$props.icon,
          status = _this$props.status,
          index = _this$props.index;

      if (icon) {
        if (typeof icon == "string") {
          return _react.default.createElement(_Icon.default, {
            type: icon
          });
        }

        return icon;
      }

      if (status == "finish") {
        return _react.default.createElement(_Icon.default, {
          type: "check"
        });
      }

      if (status == "error") {
        return _react.default.createElement(_Icon.default, {
          type: "close"
        });
      }

      return index + 1;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames, _classnames2;

      var _this$props2 = this.props,
          title = _this$props2.title,
          icon = _this$props2.icon,
          description = _this$props2.description,
          status = _this$props2.status,
          prefixCls = _this$props2.prefixCls,
          index = _this$props2.index,
          current = _this$props2.current,
          isNextError = _this$props2.isNextError;
      var prefix = "".concat(prefixCls, "-item");
      var classString = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefix), true), (0, _defineProperty2.default)(_classnames, "".concat(prefix, "-").concat(status), true), (0, _defineProperty2.default)(_classnames, "".concat(prefix, "-next-error"), isNextError), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, _react.default.createElement("div", {
        className: "".concat(prefix, "-tail")
      }), _react.default.createElement("div", {
        className: (0, _classnames3.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "".concat(prefix, "-icon"), true), (0, _defineProperty2.default)(_classnames2, "custom-icon", icon != null), _classnames2))
      }, _react.default.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, this.renderIcon())), _react.default.createElement("div", {
        className: "".concat(prefix, "-content")
      }, _react.default.createElement("div", {
        className: "".concat(prefix, "-title")
      }, title), _react.default.createElement("div", {
        className: "".concat(prefix, "-description")
      }, description)));
    }
  }]);
  return Step;
}(_react.Component);

Step.displayName = "Step";
Step.propTypes = {
  index: _propTypes.default.number,
  current: _propTypes.default.number,
  icon: _propTypes.default.node,
  title: _propTypes.default.node,
  description: _propTypes.default.node,
  status: _propTypes.default.oneOf(["wait", "process", "finish", "error"])
};
var _default = Step;
exports.default = _default;