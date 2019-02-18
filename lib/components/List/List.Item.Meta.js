"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var prefixCls = "k-list-item-meta";

var ListItemMeta =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ListItemMeta, _Component);

  function ListItemMeta() {
    (0, _classCallCheck2.default)(this, ListItemMeta);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListItemMeta).apply(this, arguments));
  }

  (0, _createClass2.default)(ListItemMeta, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          avatar = _this$props.avatar,
          description = _this$props.description,
          title = _this$props.title,
          className = _this$props.className,
          others = (0, _objectWithoutProperties2.default)(_this$props, ["avatar", "description", "title", "className"]);
      var classString = (0, _classnames2.default)((0, _defineProperty2.default)({}, prefixCls, true), className);
      return _react.default.createElement("div", (0, _extends2.default)({
        className: classString
      }, others), _react.default.createElement("div", {
        className: "".concat(prefixCls, "__avatar")
      }, avatar), _react.default.createElement("div", {
        className: "".concat(prefixCls, "__content")
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "__title")
      }, title), _react.default.createElement("div", {
        className: "".concat(prefixCls, "__description")
      }, description)));
    }
  }]);
  return ListItemMeta;
}(_react.Component);

ListItemMeta.displayName = "ListItemMeta";
ListItemMeta.propTypes = {
  avatar: _propTypes.default.node,
  description: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
};
var _default = ListItemMeta;
exports.default = _default;