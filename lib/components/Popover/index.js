"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _object = _interopRequireDefault(require("object.omit"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var prefixCls = 'k-popover';

var Popover =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Popover, _Component);

  function Popover(props) {
    (0, _classCallCheck2.default)(this, Popover);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Popover).call(this, props));
  }

  (0, _createClass2.default)(Popover, [{
    key: "renderPopover",
    value: function renderPopover() {
      var _this$props = this.props,
          title = _this$props.title,
          content = _this$props.content;
      return _react.default.createElement("div", null, title ? _react.default.createElement("div", {
        className: "".concat(prefixCls, "-title")
      }, title) : null, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-inner-content")
      }, content));
    }
  }, {
    key: "render",
    value: function render() {
      var popover = this.renderPopover();
      var otherProps = (0, _object.default)(this.props, ['children', 'title', 'content', 'kStyle']);
      return _react.default.createElement(_Tooltip.default, (0, _extends2.default)({
        ref: "tooltip",
        kClass: prefixCls,
        title: popover
      }, otherProps), this.props.children);
    }
  }]);
  return Popover;
}(_react.Component);

Popover.propTypes = {
  title: _propTypes.default.node,
  content: _propTypes.default.node.isRequired
};
var _default = Popover;
exports.default = _default;