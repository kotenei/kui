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

var Timeline =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Timeline, _Component);

  function Timeline() {
    (0, _classCallCheck2.default)(this, Timeline);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Timeline).apply(this, arguments));
  }

  (0, _createClass2.default)(Timeline, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("ul", {
        className: "k-timeline"
      }, this.props.children);
    }
  }]);
  return Timeline;
}(_react.Component);

Timeline.propTypes = {};
Timeline.defaultProps = {};
var _default = Timeline;
exports.default = _default;