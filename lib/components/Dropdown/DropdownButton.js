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

var _Dropdown = _interopRequireDefault(require("./Dropdown"));

var _Button = _interopRequireDefault(require("../Button"));

var _Icon = _interopRequireDefault(require("../Icon"));

var ButtonGroup = _Button.default.Group;

var DropdownButton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DropdownButton, _Component);

  function DropdownButton() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DropdownButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DropdownButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function (e) {
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(e);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(DropdownButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          menu = _this$props.menu,
          placement = _this$props.placement,
          disabled = _this$props.disabled;
      return _react.default.createElement(_Dropdown.default, {
        menu: menu,
        component: ButtonGroup,
        placement: placement,
        disabled: disabled
      }, _react.default.createElement(_Button.default, {
        raised: true,
        disabled: disabled,
        onClick: this.handleClick
      }, children), _react.default.createElement(_Button.default, {
        raised: true,
        trigger: "dropdown",
        className: "last-btn"
      }, _react.default.createElement(_Icon.default, {
        type: "down"
      })));
    }
  }]);
  return DropdownButton;
}(_react.Component);

DropdownButton.propTypes = {
  onClick: _propTypes.default.func,
  disabled: _propTypes.default.bool
};
DropdownButton.defaultProps = {
  disabled: false
};
var _default = DropdownButton;
exports.default = _default;