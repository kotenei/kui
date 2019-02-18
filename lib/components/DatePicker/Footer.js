"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _default = function _default(props) {
  var hasChildren = false;

  _react.default.Children.map(props.children, function (child) {
    if (child) {
      hasChildren = true;
    }
  });

  return hasChildren ? _react.default.createElement("div", {
    className: "".concat(props.prefixCls, "-footer")
  }, props.children) : null;
};

exports.default = _default;