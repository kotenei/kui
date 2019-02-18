"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _CheckboxGroup = _interopRequireDefault(require("./CheckboxGroup"));

_Checkbox.default.CheckboxGroup = _CheckboxGroup.default;
var _default = _Checkbox.default;
exports.default = _default;