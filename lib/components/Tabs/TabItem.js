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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var TabItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TabItem, _Component);

  function TabItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TabItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TabItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          index = _this$props.index,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      if (onClick) {
        onClick(e, index);
      }
    };

    _this.handleClose = function (e) {
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
      var _this$props2 = _this.props,
          index = _this$props2.index,
          disabled = _this$props2.disabled,
          onClose = _this$props2.onClose;

      if (disabled) {
        return;
      }

      if (onClose) {
        onClose(e, index);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(TabItem, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          isActive = _this$props3.isActive,
          disabled = _this$props3.disabled,
          editable = _this$props3.editable;
      return _react.default.createElement("li", {
        className: (0, _classnames.default)({
          'tab-item': true,
          'active': isActive,
          'disabled': disabled
        }),
        onClick: this.handleClick
      }, children, !disabled && editable ? _react.default.createElement(_Icon.default, {
        type: "close",
        className: "icon-close",
        onClick: this.handleClose
      }) : null);
    }
  }]);
  return TabItem;
}(_react.Component);

TabItem.propTypes = {
  index: _propTypes.default.number,
  isActive: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  editable: _propTypes.default.bool
};
var _default = TabItem;
exports.default = _default;