"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Form = _interopRequireDefault(require("./Form"));

var _FormItem = _interopRequireDefault(require("./FormItem"));

var _FormField = _interopRequireDefault(require("./FormField"));

var _createForm = require("./createForm");

_Form.default.Item = _FormItem.default;
_Form.default.Field = _FormField.default;
_Form.default.createForm = _createForm.createForm;
var _default = _Form.default;
exports.default = _default;