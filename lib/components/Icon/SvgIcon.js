"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var prefixCls = "k-icon-svg";

var SvgIcon =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SvgIcon, _Component);

  function SvgIcon() {
    (0, _classCallCheck2.default)(this, SvgIcon);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SvgIcon).apply(this, arguments));
  }

  (0, _createClass2.default)(SvgIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          children = _this$props.children,
          className = _this$props.className,
          fontSize = _this$props.fontSize,
          viewBox = _this$props.viewBox,
          title = _this$props.title,
          color = _this$props.color,
          style = _this$props.style;

      var _style = (0, _objectSpread2.default)({
        fontSize: fontSize
      }, style, {
        fill: "".concat(color ? color : null)
      });

      var classString = (0, _classnames.default)(prefixCls, className);
      return _react.default.createElement("svg", {
        className: classString,
        focusable: "false",
        viewBox: viewBox,
        fill: color,
        "aria-hidden": title ? "false" : "true",
        style: _style
      }, title ? _react.default.createElement("title", null, title) : null, children);
    }
  }]);
  return SvgIcon;
}(_react.Component);

SvgIcon.propTypes = {
  title: _propTypes.default.string,
  color: _propTypes.default.string,
  fontSize: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  viewBox: _propTypes.default.string
};
SvgIcon.defaultProps = {
  viewBox: "0 0 1024 1024"
};
var _default = SvgIcon;
exports.default = _default;