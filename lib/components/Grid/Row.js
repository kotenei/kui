"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var prefixCls = "k-row";

var Row =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Row, _Component);

  function Row() {
    (0, _classCallCheck2.default)(this, Row);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Row).apply(this, arguments));
  }

  (0, _createClass2.default)(Row, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          align = _this$props.align,
          gutter = _this$props.gutter,
          justify = _this$props.justify,
          style = _this$props.style,
          className = _this$props.className,
          children = _this$props.children,
          others = (0, _objectWithoutProperties2.default)(_this$props, ["align", "gutter", "justify", "style", "className", "children"]);
      var gutterStyle = gutter ? {
        marginLeft: -gutter / 2,
        marginRight: -gutter / 2
      } : null;

      var _style = (0, _objectSpread2.default)({}, gutterStyle, style);

      var classes = (0, _classnames2.default)(prefixCls, className, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "--").concat(justify), !!justify), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "--").concat(align), !!align), _classnames));

      var cols = _react.default.Children.map(children, function (child) {
        if (child && child.type && child.type.displayName == "Col") {
          if (child.props && gutter > 0) {
            return _react.default.cloneElement(child, {
              style: (0, _objectSpread2.default)({
                paddingLeft: gutter / 2,
                paddingRight: gutter / 2
              }, child.props.style)
            });
          }

          return child;
        }

        return null;
      });

      return _react.default.createElement("div", (0, _extends2.default)({
        className: classes
      }, others, {
        style: _style
      }), cols);
    }
  }]);
  return Row;
}(_react.Component);

Row.propTypes = {
  align: _propTypes.default.oneOf(["top", "middle", "bottom"]),
  gutter: _propTypes.default.number,
  justify: _propTypes.default.oneOf(["start", "end", "center", "space-around", "space-between"])
};
Row.defaultProps = {
  align: "top",
  gutter: 0,
  justify: "start"
};
var _default = Row;
exports.default = _default;