"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _Grid = _interopRequireDefault(require("../Grid"));

var prefixCls = "k-form-item";

var FormItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FormItem, _Component);

  function FormItem(props) {
    (0, _classCallCheck2.default)(this, FormItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FormItem).call(this, props));
  }

  (0, _createClass2.default)(FormItem, [{
    key: "render",
    value: function render() {
      var _classnames2;

      var _this$props = this.props,
          colon = _this$props.colon,
          label = _this$props.label,
          labelCol = _this$props.labelCol,
          wrapperCol = _this$props.wrapperCol,
          className = _this$props.className,
          children = _this$props.children,
          required = _this$props.required,
          style = _this$props.style;
      var classString = (0, _classnames3.default)((0, _defineProperty2.default)({}, prefixCls, true), className);
      return _react.default.createElement(_Grid.default.Row, {
        className: classString,
        style: style
      }, label ? _react.default.createElement(_Grid.default.Col, (0, _extends2.default)({
        className: (0, _classnames3.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "__label"), true), (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "__label--colon"), colon), (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "__label--required"), required), _classnames2))
      }, labelCol), label) : null, _react.default.createElement(_Grid.default.Col, (0, _extends2.default)({
        className: "".concat(prefixCls, "__wrapper")
      }, wrapperCol), children));
    }
  }]);
  return FormItem;
}(_react.Component);

FormItem.displayName = "FormItem";
FormItem.propTypes = {
  colon: _propTypes.default.bool,
  label: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
  labelCol: _propTypes.default.object,
  required: _propTypes.default.bool,
  wrapperCol: _propTypes.default.object
};
FormItem.defaultProps = {
  colon: true,
  required: false
};
var _default = FormItem;
exports.default = _default;