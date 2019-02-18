"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClassSet = exports.kSize = exports.kStyles = exports.kClass = exports.prefix = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _styleMaps = _interopRequireDefault(require("./styleMaps"));

var _domUtils = _interopRequireDefault(require("./domUtils"));

//处理样式前缀
var prefix = function prefix() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var variant = arguments.length > 1 ? arguments[1] : undefined;
  (0, _invariant.default)((props.kClass || "").trim(), "A `kClass` prop is required for this component");
  return props.kClass + (variant ? "-".concat(variant) : "");
};

exports.prefix = prefix;

var kClass = function kClass(defaultClass, Component) {
  var propTypes = Component.propTypes || (Component.propTypes = {});
  var defaultProps = Component.defaultProps || (Component.defaultProps = {});
  propTypes.kClass = _propTypes.default.string;
  defaultProps.kClass = defaultClass;
  return Component;
};

exports.kClass = kClass;

var kStyles = function kStyles(styles, defaultStyle, Component) {
  if (typeof defaultStyle !== "string") {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  var existing = Component.STYLES || [];
  var propTypes = Component.propTypes || {};
  styles.forEach(function (style) {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  }); //设置样式属性，唯一

  var propType = _propTypes.default.oneOf(existing);

  Component.STYLES = propType._values = existing;
  Component.propTypes = (0, _objectSpread2.default)({}, propTypes, {
    kStyle: propType
  });

  if (defaultStyle !== undefined) {
    var defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.kStyle = defaultStyle;
  }

  return Component;
};

exports.kStyles = kStyles;

var kSize = function kSize(sizes, defaultSize, Component) {
  if (typeof defaultSize !== "string") {
    Component = defaultSize;
    defaultSize = undefined;
  }

  var existing = Component.SIZES || [];
  var propTypes = Component.propTypes || {};
  sizes.forEach(function (size) {
    if (existing.indexOf(size) === -1) {
      existing.push(size);
    }
  });
  var values = [];
  existing.forEach(function (size) {
    var mappedSize = _styleMaps.default.SIZES[size];

    if (mappedSize && mappedSize !== size) {
      values.push(mappedSize);
    }

    values.push(size);
  });

  var propType = _propTypes.default.oneOf(values);

  propType._values = values;
  Component.SIZES = existing;
  Component.propTypes = (0, _objectSpread2.default)({}, propTypes, {
    kSize: propType
  });

  if (defaultSize !== undefined) {
    var defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.kSize = defaultSize;
  }

  return Component;
};

exports.kSize = kSize;

var getClassSet = function getClassSet(props) {
  var classes = (0, _defineProperty2.default)({}, prefix(props), true);

  if (props.kStyle) {
    classes[prefix(props, props.kStyle)] = true;
  }

  if (props.kSize) {
    var _kSize = _styleMaps.default.SIZES[props.kSize] || props.kSize;

    classes[prefix(props, _kSize)] = true;
  }

  return classes;
};

exports.getClassSet = getClassSet;