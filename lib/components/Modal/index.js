"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _Modal = _interopRequireDefault(require("./Modal"));

var _confirm = _interopRequireDefault(require("./confirm"));

_Modal.default.info = function (props) {
  var config = (0, _objectSpread2.default)({
    type: 'info',
    iconType: 'info-circle',
    okCancel: false
  }, props);
  return (0, _confirm.default)(config);
};

_Modal.default.success = function (props) {
  var config = (0, _objectSpread2.default)({
    type: 'success',
    iconType: 'check-circle',
    okCancel: false
  }, props);
  return (0, _confirm.default)(config);
};

_Modal.default.warning = function (props) {
  var config = (0, _objectSpread2.default)({
    type: 'warning',
    iconType: 'exclamation-circle',
    okCancel: false
  }, props);
  return (0, _confirm.default)(config);
};

_Modal.default.error = function (props) {
  var config = (0, _objectSpread2.default)({
    type: 'danger',
    iconType: 'close-circle',
    okCancel: false
  }, props);
  return (0, _confirm.default)(config);
};

_Modal.default.confirm = function (props) {
  var config = (0, _objectSpread2.default)({
    type: 'warning',
    iconType: 'question-circle'
  }, props);
  return (0, _confirm.default)(config);
};

var _default = _Modal.default;
exports.default = _default;