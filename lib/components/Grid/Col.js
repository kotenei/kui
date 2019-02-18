"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var prefixCls = "k-col";

var Col =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Col, _Component);

  function Col() {
    (0, _classCallCheck2.default)(this, Col);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Col).apply(this, arguments));
  }

  (0, _createClass2.default)(Col, [{
    key: "render",
    value: function render() {
      var _this = this,
          _classnames;

      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          offset = _this$props.offset,
          span = _this$props.span,
          others = (0, _objectWithoutProperties2.default)(_this$props, ["className", "children", "offset", "span"]);
      var responsiveClasses = {};
      ["xs", "sm", "md", "lg", "xl", "xxl"].forEach(function (size) {
        var sizeSpan;

        if (typeof _this.props[size] === "number") {
          sizeSpan = _this.props[size];
        }

        delete others[size];
        responsiveClasses = (0, _objectSpread3.default)({}, responsiveClasses, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-").concat(size, "-").concat(sizeSpan), sizeSpan !== undefined));
      });
      var classes = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(span), span !== undefined), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-offset-").concat(offset), offset !== undefined), _classnames), className, responsiveClasses);
      return _react.default.createElement("div", (0, _extends2.default)({
        className: classes
      }, others), children);
    }
  }]);
  return Col;
}(_react.Component);

Col.displayName = "Col";
Col.propTypes = {
  offset: _propTypes.default.number,
  span: _propTypes.default.number,
  xs: _propTypes.default.number,
  sm: _propTypes.default.number,
  md: _propTypes.default.number,
  lg: _propTypes.default.number,
  xl: _propTypes.default.number,
  xxl: _propTypes.default.number
};
Col.defaultProps = {
  offset: 0
};
var _default = Col;
exports.default = _default;