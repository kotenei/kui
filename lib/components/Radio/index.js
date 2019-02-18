"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Radio = _interopRequireDefault(require("./Radio"));

var _RadioGroup = _interopRequireDefault(require("./RadioGroup"));

_Radio.default.RadioGroup = _RadioGroup.default;
var _default = _Radio.default;
exports.default = _default;