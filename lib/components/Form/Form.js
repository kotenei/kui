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

var _object = _interopRequireDefault(require("object.omit"));

var prefixCls = "k-form";

var Form =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Form, _Component);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleSubmit = function (e) {
      var onSubmit = _this.props.onSubmit;

      if (onSubmit) {
        return onSubmit(e);
      }

      return true;
    };

    return _this;
  }

  (0, _createClass2.default)(Form, [{
    key: "renderChildren",
    value: function renderChildren() {
      var children = this.props.children;
      return _react.default.Children.map(children, function (child) {
        if (child && child.type && child.type.displayName == "FormItem") {
          return child;
        }

        return null;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          mode = _this$props.mode;
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "--").concat(mode), mode), _classnames), className);
      return _react.default.createElement("form", {
        className: classString,
        style: style,
        onSubmit: this.handleSubmit
      }, this.renderChildren());
    }
  }]);
  return Form;
}(_react.Component);

Form.propTypes = {
  mode: _propTypes.default.oneOf(["horizontal", "vertical", "inline"]),
  onSubmit: _propTypes.default.func
};
Form.defaultProps = {
  mode: "horizontal"
};
var _default = Form;
exports.default = _default;