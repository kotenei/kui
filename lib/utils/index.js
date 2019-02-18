"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = exports.guid = exports.deepClone = exports.getMouseCoord = exports.getPosition = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _domUtils = _interopRequireDefault(require("./domUtils"));

var getPosition = function getPosition(props) {
  var parent = _reactDom.default.findDOMNode(props.trigger),
      ew = _domUtils.default.outerWidth(parent),
      eh = _domUtils.default.outerHeight(parent),
      tw = props.width || 0,
      th = props.height || 0,
      position = {
    left: 0,
    top: 0
  },
      pos = {
    left: 0,
    top: 0
  },
      offset = 4;

  do {
    position.left += parent.offsetLeft - parent.scrollLeft;
    position.top += parent.offsetTop - parent.scrollTop;
  } while ((parent = parent.offsetParent) && parent != document.body);

  switch (props.placement) {
    case "left":
      pos = {
        top: position.top + eh / 2 - th / 2,
        left: position.left - tw
      };
      break;

    case "leftTop":
      pos = {
        top: position.top,
        left: position.left - tw
      };
      break;

    case "leftBottom":
      pos = {
        top: position.top + eh - th,
        left: position.left - tw
      };
      break;

    case "top":
      pos = {
        top: position.top - th - offset,
        left: position.left + ew / 2 - tw / 2
      };
      break;

    case "topLeft":
      pos = {
        top: position.top - th - offset,
        left: position.left
      };
      break;

    case "topRight":
      pos = {
        top: position.top - th - offset,
        left: position.left + ew - tw
      };
      break;

    case "right":
      pos = {
        top: position.top + eh / 2 - th / 2,
        left: position.left + ew
      };
      break;

    case "rightTop":
      pos = {
        top: position.top,
        left: position.left + ew
      };
      break;

    case "rightBottom":
      pos = {
        top: position.top + eh - th,
        left: position.left + ew
      };
      break;

    case "bottom":
      pos = {
        top: position.top + eh + offset,
        left: position.left + ew / 2 - tw / 2
      };
      break;

    case "bottomLeft":
      pos = {
        top: position.top + eh + offset,
        left: position.left
      };
      break;

    case "bottomRight":
      pos = {
        top: position.top + eh + offset,
        left: position.left + ew - tw
      };
      break;
  }

  return pos;
};

exports.getPosition = getPosition;

var getMouseCoord = function getMouseCoord(e) {
  return {
    x: e.pageX || e.clientX + document.body.scrollLeft - document.body.clientLeft,
    y: e.pageY || e.clientY + document.body.scrollTop - document.body.clientTop
  };
};

exports.getMouseCoord = getMouseCoord;

var deepClone = function deepClone(obj) {
  if (!obj || (0, _typeof2.default)(obj) !== "object" || obj instanceof Date) {
    return obj;
  }

  var newObj = {};

  if (Array.isArray(obj)) {
    newObj = obj.map(function (item) {
      return deepClone(item);
    });
  } else {
    Object.keys(obj).forEach(function (key) {
      return newObj[key] = deepClone(obj[key]);
    });
  }

  return newObj;
};

exports.deepClone = deepClone;

var guid = function guid() {
  function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

exports.guid = guid;

var random = function random(min, max) {
  var Range = max - min;
  var Rand = Math.random();
  var num = min + Math.round(Rand * Range); //四舍五入

  return num;
};

exports.random = random;