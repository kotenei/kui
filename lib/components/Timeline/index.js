"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Timeline = _interopRequireDefault(require("./Timeline"));

var _TimelineItem = _interopRequireDefault(require("./TimelineItem"));

_Timeline.default.Item = _TimelineItem.default;
var _default = _Timeline.default;
exports.default = _default;