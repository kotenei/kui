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

var _classnames = _interopRequireDefault(require("classnames"));

var Divider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Divider, _Component);

  function Divider() {
    (0, _classCallCheck2.default)(this, Divider);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Divider).apply(this, arguments));
  }

  (0, _createClass2.default)(Divider, [{
    key: "render",
    value: function render() {
      var Container = this.props.component;
      return _react.default.createElement(Container, {
        className: (0, _classnames.default)({
          'k-divider': true
        })
      });
    }
  }]);
  return Divider;
}(_react.Component);

Divider.propTypes = {
  component: _propTypes.default.string
};
Divider.defaultProps = {
  component: 'div'
};
var _default = Divider;
exports.default = _default;