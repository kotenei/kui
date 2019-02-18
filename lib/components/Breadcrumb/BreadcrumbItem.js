"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _Icon = _interopRequireDefault(require("../Icon"));

var BreadcrumbItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BreadcrumbItem, _Component);

  function BreadcrumbItem() {
    (0, _classCallCheck2.default)(this, BreadcrumbItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BreadcrumbItem).apply(this, arguments));
  }

  (0, _createClass2.default)(BreadcrumbItem, [{
    key: "renderIcon",
    value: function renderIcon() {
      var icon = this.props.icon;

      if (!icon) {
        return null;
      }

      return _react.default.createElement(_Icon.default, {
        type: icon
      });
    }
  }, {
    key: "renderItem",
    value: function renderItem() {
      var _this$props = this.props,
          to = _this$props.to,
          children = _this$props.children;

      if (to) {
        return _react.default.createElement(_reactRouterDom.Link, {
          to: to
        }, this.renderIcon(), _react.default.createElement("span", null, children));
      } else {
        return _react.default.createElement("span", null, this.renderIcon(), _react.default.createElement("span", null, children));
      }
    }
  }, {
    key: "renderSeparator",
    value: function renderSeparator() {
      var separator = this.props.separator;
      return _react.default.createElement("span", {
        className: "separator"
      }, separator);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("li", null, this.renderItem(), this.renderSeparator());
    }
  }]);
  return BreadcrumbItem;
}(_react.Component);

BreadcrumbItem.propTypes = {
  icon: _propTypes.default.string,
  separator: _propTypes.default.string,
  to: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string])
};
BreadcrumbItem.defaultProps = {
  separator: "/"
};
var _default = BreadcrumbItem;
exports.default = _default;