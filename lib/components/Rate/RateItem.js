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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var RateItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RateItem, _Component);

  function RateItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RateItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RateItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleTrigger = function (value, trigger) {
      var _this$props = _this.props,
          allowHalf = _this$props.allowHalf,
          onHover = _this$props.onHover,
          onClick = _this$props.onClick;

      if (trigger == "hover") {
        if (onHover) {
          onHover(value);
        }
      } else {
        if (onClick) {
          onClick(value);
        }
      }
    };

    return _this;
  }

  (0, _createClass2.default)(RateItem, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          value = _this$props2.value,
          current = _this$props2.current,
          character = _this$props2.character,
          allowHalf = _this$props2.allowHalf;
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-star"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-star-half"), current == value - 0.5 && allowHalf), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-star-full"), current >= value && value.toString().indexOf(".") == -1), _classnames));
      return _react.default.createElement("li", {
        className: classString
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-star-first"),
        onMouseOver: this.handleTrigger.bind(this, allowHalf ? value - 0.5 : value, "hover"),
        onClick: this.handleTrigger.bind(this, allowHalf ? value - 0.5 : value)
      }, character), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-star-second"),
        onMouseOver: this.handleTrigger.bind(this, value, "hover"),
        onClick: this.handleTrigger.bind(this, value)
      }, character));
    }
  }]);
  return RateItem;
}(_react.Component);

RateItem.propTypes = {
  value: _propTypes.default.number,
  current: _propTypes.default.number,
  character: _propTypes.default.node,
  onClick: _propTypes.default.func,
  onHover: _propTypes.default.func
};
RateItem.defaultProps = {
  value: -1,
  current: -1
};
var _default = RateItem;
exports.default = _default;