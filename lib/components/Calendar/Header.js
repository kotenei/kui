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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Button = _interopRequireDefault(require("../Button"));

var _dateUtils = require("../../utils/dateUtils");

var YearView =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(YearView, _Component);

  function YearView() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, YearView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(YearView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handlePrevNextClick = function (type) {
      var onPrevNextClick = _this.props.onPrevNextClick;

      if (onPrevNextClick) {
        onPrevNextClick(type);
      }
    };

    _this.handleTodayClick = function () {
      var onTodayClick = _this.props.onTodayClick;

      if (onTodayClick) {
        onTodayClick();
      }
    };

    _this.handleViewClick = function (view) {
      var onViewClick = _this.props.onViewClick;

      if (onViewClick) {
        onViewClick(view);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(YearView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          lang = _this$props.lang,
          view = _this$props.view,
          date = _this$props.date;
      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-header")
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-header-left")
      }, _react.default.createElement(_Button.default.Group, null, _react.default.createElement(_Button.default, {
        raised: true,
        onClick: this.handlePrevNextClick.bind(this, "prev")
      }, _react.default.createElement(_Icon.default, {
        type: "left"
      })), _react.default.createElement(_Button.default, {
        raised: true,
        onClick: this.handlePrevNextClick.bind(this, "next")
      }, _react.default.createElement(_Icon.default, {
        type: "right"
      }))), "\xA0", _react.default.createElement(_Button.default, {
        raised: true,
        onClick: this.handleTodayClick
      }, _dateUtils.dates[lang].today)), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-header-middle")
      }, _react.default.createElement("span", null, date.getFullYear(), lang == "zh-cn" && view >= 0 ? "年" : "", view >= 1 ? _react.default.createElement("span", null, date.getMonth() + 1, lang == "zh-cn" && view >= 1 ? "月" : "") : null, view >= 2 ? _react.default.createElement("span", null, date.getDate(), lang == "zh-cn" && view >= 2 ? "日" : "") : null)), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-header-right")
      }, _react.default.createElement(_Button.default.Group, null, _react.default.createElement(_Button.default, {
        raised: true,
        active: view == 0,
        onClick: this.handleViewClick.bind(this, 0)
      }, _dateUtils.dates[lang].year), _react.default.createElement(_Button.default, {
        raised: true,
        active: view == 1,
        onClick: this.handleViewClick.bind(this, 1)
      }, _dateUtils.dates[lang].month))));
    }
  }]);
  return YearView;
}(_react.Component);

YearView.propsTypes = {
  lang: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  date: _propTypes.default.object,
  view: _propTypes.default.number,
  onPrevNextClick: _propTypes.default.func,
  onTodayClick: _propTypes.default.func,
  onViewClick: _propTypes.default.func
};
YearView.defaultProps = {
  lang: "zh-cn",
  prefixCls: "k-calendar",
  date: new Date(),
  view: 1
};
var _default = YearView;
exports.default = _default;