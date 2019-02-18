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

var prefixCls = "k-layout";

var Layout =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Layout, _Component);

  function Layout() {
    (0, _classCallCheck2.default)(this, Layout);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Layout).apply(this, arguments));
  }

  (0, _createClass2.default)(Layout, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: prefixCls
      });
    }
  }]);
  return Layout;
}(_react.Component);

Layout.propTypes = {
  start: _propTypes.default.string
};
Layout.defaultProps = {};
var _default = Layout;
exports.default = _default;