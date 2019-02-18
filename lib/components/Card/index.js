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

var Card =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Card, _Component);

  function Card(props) {
    (0, _classCallCheck2.default)(this, Card);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Card).call(this, props));
  }

  (0, _createClass2.default)(Card, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          title = _this$props.title,
          extra = _this$props.extra,
          bodyStyle = _this$props.bodyStyle,
          bordered = _this$props.bordered,
          width = _this$props.width,
          children = _this$props.children;
      var prefixCls = 'k-card';
      var cardClassString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-bordered"), bordered), _classnames));
      return _react.default.createElement("div", {
        className: cardClassString,
        style: {
          width: width
        }
      }, title ? _react.default.createElement("div", {
        className: "".concat(prefixCls, "-head")
      }, _react.default.createElement("h3", {
        className: "".concat(prefixCls, "-head-title")
      }, title)) : null, extra ? _react.default.createElement("div", {
        className: "".concat(prefixCls, "-extra")
      }, extra) : null, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-body"),
        style: bodyStyle
      }, children));
    }
  }]);
  return Card;
}(_react.Component);

Card.propTypes = {
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  extra: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  bodyStyle: _propTypes.default.object,
  bordered: _propTypes.default.bool,
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};
Card.defaultProps = {
  bordered: true,
  width: 300
};
var _default = Card;
exports.default = _default;