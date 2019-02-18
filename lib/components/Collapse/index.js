"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Collapse = _interopRequireDefault(require("./Collapse"));

var _CollapsePanel = _interopRequireDefault(require("./CollapsePanel"));

_Collapse.default.Panel = _CollapsePanel.default;
var _default = _Collapse.default;
exports.default = _default;