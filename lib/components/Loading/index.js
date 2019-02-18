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

var _Icon = _interopRequireDefault(require("../Icon"));

var Loading =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Loading, _Component);

  function Loading() {
    (0, _classCallCheck2.default)(this, Loading);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Loading).apply(this, arguments));
  }

  (0, _createClass2.default)(Loading, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          children = _this$props.children,
          tip = _this$props.tip,
          show = _this$props.show;
      var prefixCls = 'k-loading';
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, 'in', show), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, _react.default.createElement("div", {
        key: "container"
      }, children), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-container")
      }, _react.default.createElement("span", {
        style: {
          position: 'relative'
        }
      }, _react.default.createElement(_Icon.default, {
        type: "loading"
      })), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-text")
      }, tip)));
    }
  }]);
  return Loading;
}(_react.Component);

Loading.propTypes = {
  show: _propTypes.default.bool,
  tip: _propTypes.default.string
};
Loading.defaultProps = {
  show: false
};
var _default = Loading;
exports.default = _default;