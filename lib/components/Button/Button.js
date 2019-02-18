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

var _Icon = _interopRequireDefault(require("../Icon"));

var _classnames = _interopRequireDefault(require("classnames"));

var _object = _interopRequireDefault(require("object.omit"));

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var types = ["button", "reset", "submit"];

var Button =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Button, _Component);

  function Button() {
    (0, _classCallCheck2.default)(this, Button);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Button).apply(this, arguments));
  }

  (0, _createClass2.default)(Button, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          icon = _this$props.icon,
          raised = _this$props.raised,
          fab = _this$props.fab,
          active = _this$props.active,
          disabled = _this$props.disabled,
          type = _this$props.type,
          className = _this$props.className,
          children = _this$props.children;
      var classes = (0, _kUtils.getClassSet)(this.props);
      var otherProps = (0, _object.default)(this.props, ["kClass", "kStyle", "kSize", "raised", "fab", "disabled", "icon", "active"]);
      classes.disabled = disabled;
      classes = (0, _classnames.default)(classes, {
        "k-btn-raised": raised,
        "k-btn-fab": fab,
        active: active
      });
      return _react.default.createElement("button", (0, _extends2.default)({}, otherProps, {
        type: type,
        className: (0, _classnames.default)(classes, className)
      }), icon ? _react.default.createElement(_Icon.default, {
        type: icon
      }) : null, children);
    }
  }]);
  return Button;
}(_react.Component);

Button.propTypes = {
  icon: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  type: _propTypes.default.oneOf(types),
  raised: _propTypes.default.bool,
  fab: _propTypes.default.bool,
  active: _propTypes.default.bool
};
Button.defaultProps = {
  disabled: false,
  type: "button"
};

var styles = _styleMaps.State.values().concat(_styleMaps.DEFAULT, _styleMaps.PRIMARY);

var _default = (0, _kUtils.kStyles)(styles, _styleMaps.DEFAULT, (0, _kUtils.kSize)([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL, _styleMaps.Sizes.XSMALL], (0, _kUtils.kClass)("k-btn", Button)));

exports.default = _default;