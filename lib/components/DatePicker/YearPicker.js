"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

var _object = _interopRequireDefault(require("object.omit"));

var _object2 = _interopRequireDefault(require("object.pick"));

var _default = function _default(props) {
  var pickerProps = (0, _object2.default)(props, ["defaultValue", "value", "disabled", "format", "placeholder", "onPrev", "onNext", "onChange", 'onFocus', 'onBlur', "onClear"]);
  return _react.default.createElement(_DatePicker.default, (0, _extends2.default)({
    format: "YYYY"
  }, pickerProps, {
    view: 0
  }));
};

exports.default = _default;