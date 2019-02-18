"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var TextArea =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TextArea, _Component);

  function TextArea(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TextArea);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TextArea).call(this, props));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(TextArea, [{
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _this$props = this.props,
          onPressEnter = _this$props.onPressEnter,
          onKeyDown = _this$props.onKeyDown;

      if (e.keyCode == 13 && onPressEnter) {
        onPressEnter(e);
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var classString = (0, _classnames.default)('k-form-control', props.className);
      var style = (0, _objectSpread2.default)({
        height: 100
      }, props.style);
      return _react.default.createElement("textarea", (0, _extends2.default)({}, props, {
        style: style,
        className: classString,
        onKeyDown: this.handleKeyDown
      }));
    }
  }]);
  return TextArea;
}(_react.Component);

TextArea.propTypes = {
  defaultValue: _propTypes.default.string,
  value: _propTypes.default.string,
  onPressEnter: _propTypes.default.func
};
TextArea.defaultProps = {};
var _default = TextArea;
exports.default = _default;