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

var Popover =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Popover, _Component);

  function Popover() {
    (0, _classCallCheck2.default)(this, Popover);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Popover).apply(this, arguments));
  }

  (0, _createClass2.default)(Popover, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          title = _this$props.title,
          children = _this$props.children,
          onClose = _this$props.onClose;
      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-popover")
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-popover-header")
      }, title, _react.default.createElement(_Icon.default, {
        type: "close",
        onClick: onClose
      })), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-popover-body")
      }, children));
    }
  }]);
  return Popover;
}(_react.Component);

Popover.propTypes = {
  prefixCls: _propTypes.default.string,
  title: _propTypes.default.node
};
Popover.defaultProps = {};
var _default = Popover;
exports.default = _default;