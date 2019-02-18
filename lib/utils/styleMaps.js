"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PRIMARY = exports.DEFAULT = exports.Sizes = exports.State = void 0;

var _objectAssign = _interopRequireDefault(require("object-assign"));

var constant = function constant(obj) {
  return (0, _objectAssign.default)(Object.create({
    values: function values() {
      var _this = this;

      return Object.keys(this).map(function (k) {
        return _this[k];
      });
    }
  }), obj);
};

var styleMaps = {
  SIZES: {
    'large': 'lg',
    'medium': 'md',
    'small': 'sm',
    'xsmall': 'xs',
    'lg': 'lg',
    'md': 'md',
    'sm': 'sm',
    'xs': 'xs'
  },
  GRID_COLUMNS: 12
};
var State = constant({
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info'
});
exports.State = State;
var Sizes = constant({
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
  XSMALL: 'xsmall'
});
exports.Sizes = Sizes;
var DEFAULT = 'default';
exports.DEFAULT = DEFAULT;
var PRIMARY = 'primary';
exports.PRIMARY = PRIMARY;
var _default = styleMaps;
exports.default = _default;