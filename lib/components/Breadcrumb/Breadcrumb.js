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

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var _classnames = _interopRequireDefault(require("classnames"));

var Breadcrumb =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Breadcrumb, _Component);

  function Breadcrumb() {
    (0, _classCallCheck2.default)(this, Breadcrumb);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Breadcrumb).apply(this, arguments));
  }

  (0, _createClass2.default)(Breadcrumb, [{
    key: "render",
    value: function render() {
      var classes = (0, _kUtils.getClassSet)(this.props);
      return _react.default.createElement("ul", {
        className: (0, _classnames.default)(classes)
      }, this.props.children);
    }
  }]);
  return Breadcrumb;
}(_react.Component);

var styles = _styleMaps.State.values().concat(_styleMaps.DEFAULT, _styleMaps.PRIMARY);

var _default = (0, _kUtils.kStyles)(styles, (0, _kUtils.kClass)('k-breadcrumb', Breadcrumb));

exports.default = _default;