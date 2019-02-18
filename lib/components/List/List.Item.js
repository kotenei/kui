"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var prefixCls = "k-list-item";

var ListItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ListItem, _Component);

  function ListItem() {
    (0, _classCallCheck2.default)(this, ListItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListItem).apply(this, arguments));
  }

  (0, _createClass2.default)(ListItem, [{
    key: "renderActions",
    value: function renderActions() {
      var actions = this.props.actions;
      var items = [];

      if (actions && actions.length > 0) {
        actions.forEach(function (action, index) {
          items.push(_react.default.createElement("li", {
            className: "".concat(prefixCls, "-actions__item"),
            key: index
          }, action));

          if (index + 1 != actions.length) {
            var _classnames;

            items.push(_react.default.createElement("li", {
              className: (0, _classnames3.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-actions__item"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-actions__separator"), true), _classnames)),
              key: "".concat(index, "-separator")
            }, _react.default.createElement("span", null, "|")));
          }
        });
      }

      return items;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          actions = _this$props.actions,
          others = (0, _objectWithoutProperties2.default)(_this$props, ["children", "className", "actions"]);
      var classString = (0, _classnames3.default)((0, _defineProperty2.default)({}, prefixCls, true), className);
      return _react.default.createElement("li", (0, _extends2.default)({
        className: classString
      }, others), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-content")
      }, children), _react.default.createElement("ul", {
        className: "".concat(prefixCls, "-actions")
      }, this.renderActions()));
    }
  }]);
  return ListItem;
}(_react.Component);

ListItem.displayName = "ListItem";
ListItem.propTypes = {
  actions: _propTypes.default.array
};
var _default = ListItem;
exports.default = _default;