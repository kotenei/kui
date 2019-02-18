"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.icons = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _brand = _interopRequireDefault(require("./brand"));

var _common = _interopRequireDefault(require("./common"));

var _data = _interopRequireDefault(require("./data"));

var _direction = _interopRequireDefault(require("./direction"));

var _edit = _interopRequireDefault(require("./edit"));

var _tips = _interopRequireDefault(require("./tips"));

var icons = (0, _objectSpread2.default)({}, _brand.default, _common.default, _data.default, _direction.default, _edit.default, _tips.default);
exports.icons = icons;
var _default = {
  brand: _brand.default,
  common: _common.default,
  data: _data.default,
  direction: _direction.default,
  edit: _edit.default,
  tips: _tips.default
};
exports.default = _default;