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

var _classnames2 = _interopRequireDefault(require("classnames"));

var TimelineItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TimelineItem, _Component);

  function TimelineItem() {
    (0, _classCallCheck2.default)(this, TimelineItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TimelineItem).apply(this, arguments));
  }

  (0, _createClass2.default)(TimelineItem, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          children = _this$props.children,
          color = _this$props.color,
          dot = _this$props.dot;
      var prefix = 'k-timeline';
      var dotClassName = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefix, "-item-head"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefix, "-item-head-").concat(color), true), (0, _defineProperty2.default)(_classnames, "".concat(prefix, "-item-head-custom"), dot), _classnames));
      return _react.default.createElement("li", {
        className: "".concat(prefix, "-item")
      }, _react.default.createElement("div", {
        className: "".concat(prefix, "-item-tail")
      }), _react.default.createElement("div", {
        className: dotClassName
      }, dot), _react.default.createElement("div", {
        className: "".concat(prefix, "-item-content")
      }, children));
    }
  }]);
  return TimelineItem;
}(_react.Component);

TimelineItem.propTypes = {
  dot: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
  color: _propTypes.default.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
};
TimelineItem.defaultProps = {
  color: 'primary'
};
var _default = TimelineItem;
exports.default = _default;