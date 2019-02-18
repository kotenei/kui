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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _object = _interopRequireDefault(require("object.omit"));

var _Menu = _interopRequireDefault(require("../Menu"));

var MenuItem = _Menu.default.Item;

var SelectOption =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SelectOption, _Component);

  function SelectOption() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SelectOption);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SelectOption)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          value = _this$props.value,
          title = _this$props.title;

      if (onClick) {
        onClick({
          title: title,
          value: value,
          content: _this.props.children
        });
      }
    };

    return _this;
  }

  (0, _createClass2.default)(SelectOption, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          title = _this$props2.title,
          value = _this$props2.value,
          index = _this$props2.index;
      var menuProps = (0, _object.default)(this.props, ["children", "index", "selected", "value"]);
      return _react.default.createElement(MenuItem, (0, _extends2.default)({
        id: value
      }, menuProps), this.props.children);
    }
  }]);
  return SelectOption;
}(_react.Component);

SelectOption.propTypes = {
  selected: _propTypes.default.bool,
  title: _propTypes.default.string,
  value: _propTypes.default.string,
  onClick: _propTypes.default.func
};
SelectOption.defaultProps = {
  selected: false
};
var _default = SelectOption;
exports.default = _default;