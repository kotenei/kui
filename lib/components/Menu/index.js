"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Menu = _interopRequireDefault(require("./Menu"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _MenuItemGroup = _interopRequireDefault(require("./MenuItemGroup"));

var _SubMenu = _interopRequireDefault(require("./SubMenu"));

var _Divider = _interopRequireDefault(require("../Divider"));

_Menu.default.Item = _MenuItem.default;
_Menu.default.SubMenu = _SubMenu.default;
_Menu.default.ItemGroup = _MenuItemGroup.default;

_Menu.default.Divider = function (props) {
  return _react.default.createElement(_Divider.default, (0, _extends2.default)({
    component: "li"
  }, props));
};

var _default = _Menu.default;
exports.default = _default;