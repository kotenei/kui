"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

var _YearPicker = _interopRequireDefault(require("./YearPicker"));

var _MonthPicker = _interopRequireDefault(require("./MonthPicker"));

var _WeekPicker = _interopRequireDefault(require("./WeekPicker"));

var _RangePicker = _interopRequireDefault(require("./RangePicker"));

_DatePicker.default.YearPicker = _YearPicker.default;
_DatePicker.default.MonthPicker = _MonthPicker.default;
_DatePicker.default.WeekPicker = _WeekPicker.default;
_DatePicker.default.RangePicker = _RangePicker.default;
var _default = _DatePicker.default;
exports.default = _default;