"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _object = _interopRequireDefault(require("object.omit"));

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var _outline = require("./outline");

var _filled = require("./filled");

var _SvgIcon = _interopRequireDefault(require("./SvgIcon"));

var prefixCls = "k-icon";

var Icon =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Icon, _Component);

  function Icon() {
    (0, _classCallCheck2.default)(this, Icon);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Icon).apply(this, arguments));
  }

  (0, _createClass2.default)(Icon, [{
    key: "renderIcon",
    value: function renderIcon() {
      var _this$props = this.props,
          theme = _this$props.theme,
          type = _this$props.type,
          children = _this$props.children,
          color = _this$props.color;
      var presetIcon;

      if (theme && type) {
        switch (theme) {
          case "outline":
            presetIcon = _outline.icons[type];
            break;

          case "filled":
            presetIcon = _filled.icons[type];
            break;

          default:
            break;
        }
      }

      if (presetIcon) {
        return _react.default.createElement(_SvgIcon.default, {
          viewBox: presetIcon.viewBox,
          color: color
        }, presetIcon.path);
      }

      return children;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className,
          spin = _this$props2.spin,
          type = _this$props2.type,
          style = _this$props2.style,
          fontSize = _this$props2.fontSize,
          other = (0, _objectWithoutProperties2.default)(_this$props2, ["children", "className", "spin", "type", "style", "fontSize"]);
      var classString = (0, _kUtils.getClassSet)(this.props);
      classString = (0, _classnames.default)(classString, className, {
        "k-spin": !!spin || type == "loading"
      });
      var others = (0, _object.default)(other, ["kStyle", "kClass", "kSize", "className", "style", "fontSize"]);

      var _style = (0, _objectSpread2.default)({
        fontSize: fontSize
      }, style);

      return _react.default.createElement("i", (0, _extends2.default)({
        className: classString
      }, others, {
        style: _style
      }), this.renderIcon());
    }
  }]);
  return Icon;
}(_react.Component);

Icon.propTypes = {
  fontSize: _propTypes.default.number,
  theme: _propTypes.default.oneOf(["outline", "filled"]),
  type: _propTypes.default.string,
  color: _propTypes.default.string,
  spin: _propTypes.default.bool,
  onClick: _propTypes.default.func
};
Icon.defaultProps = {
  theme: "outline",
  viewBox: "0 0 1024 1024"
};

var styles = _styleMaps.State.values().concat(_styleMaps.PRIMARY);

var _default = (0, _kUtils.kStyles)(styles, (0, _kUtils.kClass)(prefixCls, Icon));

exports.default = _default;