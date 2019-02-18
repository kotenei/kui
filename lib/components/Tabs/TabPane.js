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

var prefixCls = 'k-tabs';

var TabPane =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TabPane, _Component);

  function TabPane() {
    (0, _classCallCheck2.default)(this, TabPane);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabPane).apply(this, arguments));
  }

  (0, _createClass2.default)(TabPane, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          isActive = _this$props.isActive,
          children = _this$props.children;
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-panel"), true), (0, _defineProperty2.default)(_classnames, 'active', isActive), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, this.props.children);
    }
  }]);
  return TabPane;
}(_react.Component);

TabPane.propTypes = {
  tab: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  isActive: _propTypes.default.bool
};
var _default = TabPane;
exports.default = _default;