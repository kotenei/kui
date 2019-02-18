"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ProgressLine = _interopRequireDefault(require("./ProgressLine"));

var _ProgressCircle = _interopRequireDefault(require("./ProgressCircle"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var Progress =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Progress, _Component);

  function Progress() {
    (0, _classCallCheck2.default)(this, Progress);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Progress).apply(this, arguments));
  }

  (0, _createClass2.default)(Progress, [{
    key: "renderContainer",
    value: function renderContainer(prefixCls) {
      var type = this.props.type;

      switch (type) {
        case "line":
          return _react.default.createElement(_ProgressLine.default, (0, _extends2.default)({}, this.props, {
            prefixCls: prefixCls
          }));

        case "circle":
          return _react.default.createElement(_ProgressCircle.default, (0, _extends2.default)({}, this.props, {
            prefixCls: prefixCls
          }));

        default:
          return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          type = _this$props.type,
          textInside = _this$props.textInside,
          className = _this$props.className;
      var prefixCls = "k-progress";
      var classString = (0, _kUtils.getClassSet)(this.props);
      classString = (0, _classnames2.default)(className, classString, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-line"), type == "line"), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-text-inside"), textInside), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-circle"), type == "circle"), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, this.renderContainer(prefixCls));
    }
  }]);
  return Progress;
}(_react.Component);

Progress.propTypes = {
  color: _propTypes.default.string,
  percent: _propTypes.default.number,
  type: _propTypes.default.oneOf(["line", "circle"]),
  status: _propTypes.default.oneOf(["success", "error"]),
  strokeWidth: _propTypes.default.number,
  textInside: _propTypes.default.bool,
  showText: _propTypes.default.bool,
  width: _propTypes.default.number,
  indeterminate: _propTypes.default.bool
};
Progress.defaultProps = {
  percent: 0,
  type: "line",
  strokeWidth: 6,
  textInside: false,
  showText: true,
  width: 100,
  indeterminate: false
};

var styles = _styleMaps.State.values().concat(_styleMaps.PRIMARY);

var _default = (0, _kUtils.kStyles)(styles, _styleMaps.PRIMARY, (0, _kUtils.kClass)("k-progress", Progress));

exports.default = _default;