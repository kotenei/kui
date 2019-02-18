"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Icon = _interopRequireDefault(require("./Icon"));

var _SvgIcon = _interopRequireDefault(require("./SvgIcon"));

var _filled = _interopRequireDefault(require("./filled"));

var _outline = _interopRequireDefault(require("./outline"));

_Icon.default.SvgIcon = _SvgIcon.default;
_Icon.default.filled = _filled.default;
_Icon.default.outline = _outline.default;
var _default = _Icon.default;
exports.default = _default;