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

var _classnames = _interopRequireDefault(require("classnames"));

var ButtonGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ButtonGroup, _Component);

  function ButtonGroup() {
    (0, _classCallCheck2.default)(this, ButtonGroup);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ButtonGroup).apply(this, arguments));
  }

  (0, _createClass2.default)(ButtonGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('k-btn-group', className),
        style: style
      }, this.props.children);
    }
  }]);
  return ButtonGroup;
}(_react.Component);

var _default = ButtonGroup;
exports.default = _default;